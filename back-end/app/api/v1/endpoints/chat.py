from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from typing import List, Dict
import json
from datetime import datetime

from app.core.database import get_db
from app.models.models import MensagemChat, Utilizador
from app.api.v1.endpoints.deps import get_utilizador_atual
from app.core.security import decode_token

router = APIRouter(prefix="/chat", tags=["Chat"])

# ─────────────────────────── WEBSOCKET MANAGER ───────────────────────────

class ConnectionManager:
    def __init__(self):
        # Mapeia utilizador_id -> websocket
        self.active_connections: Dict[int, WebSocket] = {}

    async def connect(self, websocket: WebSocket, utilizador_id: int):
        await websocket.accept()
        self.active_connections[utilizador_id] = websocket

    def disconnect(self, utilizador_id: int):
        if utilizador_id in self.active_connections:
            del self.active_connections[utilizador_id]

    async def send_personal_message(self, message: str, utilizador_id: int):
        if utilizador_id in self.active_connections:
            websocket = self.active_connections[utilizador_id]
            await websocket.send_text(message)

manager = ConnectionManager()

# ─────────────────────────── ROTAS REST ───────────────────────────

@router.get("/historico/{outro_utilizador_id}")
def obter_historico(
    outro_utilizador_id: int,
    db: Session = Depends(get_db),
    atual: Utilizador = Depends(get_utilizador_atual)
):
    """
    Obtém o histórico de mensagens entre o utilizador atual e outro.
    """
    mensagens = db.query(MensagemChat).filter(
        or_(
            and_(MensagemChat.remetente_id == atual.id, MensagemChat.destinatario_id == outro_utilizador_id),
            and_(MensagemChat.remetente_id == outro_utilizador_id, MensagemChat.destinatario_id == atual.id)
        )
    ).order_by(MensagemChat.criado_em.asc()).all()

    # Marcar como lidas as que foram enviadas pelo outro
    for msg in mensagens:
        if msg.destinatario_id == atual.id and not msg.lida:
            msg.lida = True
    db.commit()

    return [
        {
            "id": m.id,
            "remetente_id": m.remetente_id,
            "destinatario_id": m.destinatario_id,
            "conteudo": m.conteudo,
            "lida": m.lida,
            "criado_em": m.criado_em.isoformat()
        } for m in mensagens
    ]

@router.get("/buscar-utilizadores")
def buscar_utilizadores(
    q: str = Query(..., min_length=2),
    db: Session = Depends(get_db),
    atual: Utilizador = Depends(get_utilizador_atual)
):
    """
    Busca utilizadores pelo nome ou email para iniciar chat.
    """
    termo = f"%{q}%"
    utilizadores = db.query(Utilizador).filter(
        Utilizador.id != atual.id,
        or_(
            Utilizador.nome_completo.ilike(termo),
            Utilizador.nome_utilizador.ilike(termo),
            Utilizador.email.ilike(termo)
        )
    ).limit(10).all()

    return [
        {
            "id": u.id,
            "nome": u.nome_completo,
            "tipo": u.tipo_utilizador
        } for u in utilizadores
    ]


# ─────────────────────────── ROTAS WEBSOCKET ───────────────────────────

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, token: str = Query(...), db: Session = Depends(get_db)):
    """
    Conexão WebSocket para chat em tempo real.
    """
    payload = decode_token(token)
    if not payload:
        await websocket.close(code=1008)
        return
        
    utilizador_id = int(payload.get("sub"))
    utilizador = db.query(Utilizador).filter(Utilizador.id == utilizador_id).first()
    if not utilizador:
        await websocket.close(code=1008)
        return

    await manager.connect(websocket, utilizador_id)
    try:
        while True:
            data = await websocket.receive_text()
            mensagem_data = json.loads(data)
            
            destinatario_id = mensagem_data.get("destinatario_id")
            conteudo = mensagem_data.get("conteudo")

            if destinatario_id and conteudo:
                # Salvar na base de dados
                nova_mensagem = MensagemChat(
                    remetente_id=utilizador_id,
                    destinatario_id=destinatario_id,
                    conteudo=conteudo,
                    lida=False
                )
                db.add(nova_mensagem)
                db.commit()
                db.refresh(nova_mensagem)

                # Estrutura da mensagem para enviar
                msg_formatada = json.dumps({
                    "id": nova_mensagem.id,
                    "remetente_id": utilizador_id,
                    "destinatario_id": destinatario_id,
                    "conteudo": conteudo,
                    "lida": False,
                    "criado_em": nova_mensagem.criado_em.isoformat()
                })

                # Enviar para o destinatário (se estiver online)
                await manager.send_personal_message(msg_formatada, destinatario_id)
                # Enviar também de volta para quem enviou para confirmação
                await manager.send_personal_message(msg_formatada, utilizador_id)
                
    except WebSocketDisconnect:
        manager.disconnect(utilizador_id)
    except Exception as e:
        manager.disconnect(utilizador_id)
