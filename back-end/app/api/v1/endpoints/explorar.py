from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from pydantic import BaseModel
import math

from app.core.database import get_db
from app.models.models import Produto, Servico, PerfilVendedor, Utilizador, Endereco

router = APIRouter(prefix="/explorar", tags=["Explorar"])

class ExplorarItemSchema(BaseModel):
    id: int
    tipo: str  # "produto" ou "servico"
    nome: str
    descricao: Optional[str] = None
    preco: float
    avaliacao_media: float
    vendedor_id: int
    imagem_url: Optional[str] = None
    
    # Específico de Serviço
    duracao_estimada: Optional[str] = None

    # Localização
    provincia: Optional[str] = None
    municipio: Optional[str] = None
    distancia_km: Optional[float] = None

def calcular_distancia(lat1, lon1, lat2, lon2):
    if None in (lat1, lon1, lat2, lon2):
        return None
    R = 6371.0 # Raio da terra em km
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return round(R * c, 2)

@router.get("/pesquisa", response_model=List[ExplorarItemSchema])
def pesquisar(
    q: Optional[str] = None,
    tipo: Optional[str] = None,  # "produto", "servico", ou vazio para ambos
    provincia: Optional[str] = None,
    municipio: Optional[str] = None,
    lat: Optional[float] = None,
    lon: Optional[float] = None,
    db: Session = Depends(get_db)
):
    resultados = []
    
    termo = f"%{q}%" if q else None

    # Pesquisa Produtos
    if not tipo or tipo == "produto":
        query_prod = db.query(Produto).options(
            joinedload(Produto.vendedor).joinedload(PerfilVendedor.utilizador).joinedload(Utilizador.endereco)
        ).filter(Produto.ativo == True)
        if termo:
            query_prod = query_prod.filter((Produto.nome.ilike(termo)) | (Produto.descricao.ilike(termo)))
            
        for p in query_prod.limit(50).all():
            img_url = p.imagens[0].url if p.imagens else None
            
            end = p.vendedor.utilizador.endereco if p.vendedor and p.vendedor.utilizador else None
            p_prov = end.provincia if end else None
            p_mun = end.municipio if end else None
            p_dist = calcular_distancia(lat, lon, end.latitude, end.longitude) if end and lat and lon else None

            resultados.append({
                "id": p.id,
                "tipo": "produto",
                "nome": p.nome,
                "descricao": p.descricao,
                "preco": float(p.preco),
                "avaliacao_media": p.avaliacao_media,
                "vendedor_id": p.vendedor_id,
                "imagem_url": img_url,
                "provincia": p_prov,
                "municipio": p_mun,
                "distancia_km": p_dist,
                "score": 0
            })

    # Pesquisa Serviços
    if not tipo or tipo == "servico":
        query_serv = db.query(Servico).options(
            joinedload(Servico.vendedor).joinedload(PerfilVendedor.utilizador).joinedload(Utilizador.endereco)
        ).filter(Servico.ativo == True)
        if termo:
            query_serv = query_serv.filter((Servico.nome.ilike(termo)) | (Servico.descricao.ilike(termo)))
            
        for s in query_serv.limit(50).all():
            img_url = s.imagens[0].url if s.imagens else None
            
            end = s.vendedor.utilizador.endereco if s.vendedor and s.vendedor.utilizador else None
            s_prov = end.provincia if end else None
            s_mun = end.municipio if end else None
            s_dist = calcular_distancia(lat, lon, end.latitude, end.longitude) if end and lat and lon else None

            resultados.append({
                "id": s.id,
                "tipo": "servico",
                "nome": s.nome,
                "descricao": s.descricao,
                "preco": float(s.preco_base),
                "avaliacao_media": s.avaliacao_media,
                "vendedor_id": s.vendedor_id,
                "imagem_url": img_url,
                "duracao_estimada": s.duracao_estimada,
                "provincia": s_prov,
                "municipio": s_mun,
                "distancia_km": s_dist,
                "score": 0
            })

    # Calcular score de relevância
    for r in resultados:
        score = r["avaliacao_media"] * 10
        if r["distancia_km"] is not None:
            score -= r["distancia_km"] * 0.1  # Penáliza distância
        elif provincia and municipio:
            if r["provincia"] == provincia and r["municipio"] == municipio:
                score += 50
            elif r["provincia"] == provincia:
                score += 20
        r["score"] = score

    # Ordenar por score
    resultados.sort(key=lambda x: x["score"], reverse=True)
    
    final = [ExplorarItemSchema(**r) for r in resultados]
    return final
