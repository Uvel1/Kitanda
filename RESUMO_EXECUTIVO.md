# ✅ RESUMO EXECUTIVO - Setup Kitanda Novo PC

**Documento:** Resumo de todos os guias  
**Data:** 2026-07-09  
**Tempo para Setup:** 30-60 minutos (primeira vez)

---

## 📌 Uma Frase Resumida

> **Kitanda é um marketplace Python/FastAPI + PostgreSQL + HTML/JS que leva 30-60 minutos para ativar num PC novo, com script automático disponível.**

---

## 🎯 O Que É Kitanda

Uma plataforma de e-commerce para Angola com:

- **Frontend:** Site HTML+JS que roda em `http://127.0.0.1:5500`
- **Backend:** API Python FastAPI que roda em `http://localhost:8000`
- **Database:** PostgreSQL em `localhost:5432`
- **Funcionalidades:** Produtos, vendedores, carrinho, chat, pedidos, painéis

---

## ⚡ 3 Formas de Setup

### Opção 1: Automática (Recomendado) - 15 min

```powershell
.\setup_kitanda.ps1
```

✅ Faz tudo automaticamente  
✅ Cria venv, instala dependências, cria BD, popula dados  
✅ Dá instruções finais

### Opção 2: Rápida Manual - 30 min

Seguir: [GUIA_RAPIDO_AGENT.md](GUIA_RAPIDO_AGENT.md)

### Opção 3: Completa Detalhada - 50 min

Seguir: [PLANO_EXECUCAO_NOVO_PC.md](PLANO_EXECUCAO_NOVO_PC.md)

---

## 📋 Pré-Requisitos (Uma Vez)

```
Instale uma vez:
☐ Python 3.11+ (https://python.org)
☐ Git (https://git-scm.com)
☐ PostgreSQL 15+ (https://postgresql.org)
☐ VS Code (https://code.visualstudio.com)

Tempo: 20-30 minutos
```

---

## 🚀 5 Passos Rápidos

```
1. git clone https://github.com/Uvel1/Kitanda.git
   └─ 3 minutos

2. Execute setup_kitanda.ps1
   └─ 10-15 minutos

3. Começar Backend (Terminal 1):
   cd back-end
   .\venv\Scripts\Activate.ps1
   uvicorn app.main:app --reload
   └─ 2 minutos

4. Começar Frontend (Terminal 2):
   Abrir front-end/public/index.html
   Click: Open with Live Server
   └─ 1 minuto

5. Testar:
   http://127.0.0.1:5500 (Frontend)
   Email: comprador@teste.com / password123
   └─ 2-3 minutos

TOTAL: 20-30 minutos (após pré-requisitos)
```

---

## 🎯 Próximos Passos Imediatos

```
👤 Se é INICIANTE:
   1. Leia: GUIA_CONFIGURACAO.md
   2. Depois: PLANO_EXECUCAO_NOVO_PC.md
   3. Dúvidas: MAPA_VISUAL_SETUP.md

⚡ Se é DEV EXPERIENTE:
   1. Execute: setup_kitanda.ps1
   2. Ou leia: GUIA_RAPIDO_AGENT.md
   3. Dúvidas: MAPA_VISUAL_SETUP.md

🤖 Se é AGENT/AUTOMAÇÃO:
   1. Execute: setup_kitanda.ps1
   2. Validar: Backend OK, Frontend OK
   3. Pronto para começar

🎓 Se quer ENTENDER TUDO:
   1. Leia: MAPA_VISUAL_SETUP.md
   2. Depois: PLANO_EXECUCAO_NOVO_PC.md
```

---

## ✅ Checklist Final (Validação)

Antes de considerar "pronto":

```
BACKEND:
☐ http://localhost:8000 responde
☐ http://localhost:8000/docs carrega (Swagger)
☐ Sem erro "Connection refused"

DATABASE:
☐ PostgreSQL a correr
☐ Base de dados "kitanda_db" existe
☐ Tabelas criadas (alembic upgrade head)

FRONTEND:
☐ http://127.0.0.1:5500 carrega
☐ Sem erro CORS no DevTools (F12)
☐ API_BASE_URL em api.js = "localhost:8000"

LOGIN:
☐ Email: comprador@teste.com / password123 funciona
☐ Vê página "Explorar" com produtos
☐ Pode adicionar ao carrinho
```

---

## 🐛 Se Algo Falhar

```
CENÁRIO 1: Backend não responde
→ Verificar: PostgreSQL a correr?
→ Verificar: .env DATABASE_URL correto?
→ Tentar: python check_db.py
→ Ler: MAPA_VISUAL_SETUP.md → Troubleshooting

CENÁRIO 2: CORS Error no Browser
→ Verificar: Backend em http://localhost:8000?
→ Verificar: api.js tem "localhost:8000"?
→ Ler: MAPA_VISUAL_SETUP.md → CORS error

CENÁRIO 3: Login falha (401)
→ Tentar: comprador@teste.com / password123
→ Se não funciona: python seed_render.py
→ Ler: MAPA_VISUAL_SETUP.md → Login error

CENÁRIO 4: Script PowerShell não executa
→ PowerShell como Administrador
→ Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
→ Tentar de novo
```

---

## 📚 Ficheiros de Documentação

| Ficheiro                                               | Tempo  | Caso de Uso                      |
| ------------------------------------------------------ | ------ | -------------------------------- |
| [README_SETUP.md](README_SETUP.md)                     | 5 min  | Visão geral rápida               |
| [INDICE_DOCUMENTACAO.md](INDICE_DOCUMENTACAO.md)       | 5 min  | Escolher qual ler ← COMECE AQUI  |
| [GUIA_CONFIGURACAO.md](GUIA_CONFIGURACAO.md)           | 30 min | Iniciantes (passo-a-passo)       |
| [PLANO_EXECUCAO_NOVO_PC.md](PLANO_EXECUCAO_NOVO_PC.md) | 50 min | Setup completo + troubleshooting |
| [GUIA_RAPIDO_AGENT.md](GUIA_RAPIDO_AGENT.md)           | 30 min | Dev experiente (copy-paste)      |
| [MAPA_VISUAL_SETUP.md](MAPA_VISUAL_SETUP.md)           | 30 min | Resolver erros específicos       |
| [DADOS_TESTE.md](DADOS_TESTE.md)                       | 5 min  | Contas de teste                  |
| [GUIA_DEPLOY_RENDER.md](GUIA_DEPLOY_RENDER.md)         | 30 min | Deploy produção                  |
| [setup_kitanda.ps1](setup_kitanda.ps1)                 | 20 min | Executar automaticamente         |

---

## 🎯 Tempo Estimado Total

### Primeira Vez (Setup + Teste)

```
Opção A: AUTOMÁTICA
├─ Pré-requisitos: 20-30 min (uma vez)
├─ Script automático: 10-15 min
├─ Validação: 5-10 min
└─ TOTAL: 35-55 minutos


Opção B: MANUAL (Desenvolvedor)
├─ Pré-requisitos: 20-30 min (uma vez)
├─ Clone + Backend: 15-20 min
├─ BD + Migrações: 5-10 min
├─ Frontend: 2-3 min
├─ Teste: 5 min
└─ TOTAL: 50-70 minutos


Opção C: COM APRENDIZADO (Iniciante)
├─ Leitura GUIA_CONFIGURACAO: 20-30 min
├─ Pré-requisitos: 20-30 min (uma vez)
├─ Seguir guia: 30-40 min
├─ Teste: 10 min
├─ Leitura MAPA_VISUAL_SETUP: 15-20 min
└─ TOTAL: 95-130 minutos
```

### Startups Subsequentes

```
Só ligar servidores: 2-3 minutos
├─ Terminal 1: cd back-end && .\venv\Scripts\Activate.ps1 && uvicorn ...
├─ Terminal 2: Open with Live Server
└─ Pronto para trabalhar
```

---

## 💡 Conceitos-Chave

### Frontend

```
O quê:         HTML + JavaScript puro
Onde:          front-end/public/
Como roda:     Live Server (VS Code) em porta 5500
URL:           http://127.0.0.1:5500
Acesso BD:     Apenas via API Backend
Comunicação:   Fetch API + XMLHttpRequest para http://localhost:8000/api/v1
```

### Backend

```
O quê:         Python FastAPI
Onde:          back-end/app/main.py
Como roda:     Uvicorn server em porta 8000
URL:           http://localhost:8000
Acesso BD:     SQLAlchemy ORM conecta PostgreSQL
Endpoints:     /api/v1/auth, /api/v1/produtos, etc.
Auth:          JWT tokens + Passlib bcrypt
```

### Database

```
O quê:         PostgreSQL
Onde:          localhost:5432
BD:            kitanda_db
Migrations:    Alembic (app.main.py)
Tables:        usuarios, produtos, pedidos, etc.
```

---

## 🔐 Credenciais Desenvolvimento

```
PostgreSQL (local):
├─ User: postgres
├─ Password: Ilevuosnof@! (ou definir durante setup)
├─ Host: localhost
├─ Port: 5432
├─ Database: kitanda_db

Contas Teste (inseridas via seed):
├─ comprador@teste.com / password123
├─ vendedor@teste.com / password123
├─ empresa@teste.com / password123
├─ admin@kitanda.com / password123

⚠️ NUNCA COMMITAR .env COM CREDENCIAIS REAIS
```

---

## 🎓 Próximas Ações

### Imediatas (Hoje)

1. ✅ Clonar repositório
2. ✅ Executar setup (automático ou manual)
3. ✅ Testar login
4. ✅ Explorar interface

### Curto Prazo (Esta Semana)

1. ⬜ Ler [PLANO_EXECUCAO_NOVO_PC.md](PLANO_EXECUCAO_NOVO_PC.md)
2. ⬜ Compreender arquitetura ([MAPA_VISUAL_SETUP.md](MAPA_VISUAL_SETUP.md))
3. ⬜ Fazer mudança pequena no código
4. ⬜ Testar frontend + backend integration

### Médio Prazo (Este Mês)

1. ⬜ Entender fluxo de autenticação
2. ⬜ Implementar nova feature
3. ⬜ Fazer deploy em staging
4. ⬜ Preparar para produção

---

## 📞 Suporte

### Se Ficar Preso

```
1. Procure seu erro em: MAPA_VISUAL_SETUP.md → Troubleshooting
2. Se não encontrou: PLANO_EXECUCAO_NOVO_PC.md → FASE 7
3. Se ainda preso: Limpe tudo, comece do zero (30 min com script)
4. Se erros desconhecidos: Contactar equipa dev (Uveli/Elimar)
```

### Contactos

```
Backend: Uveli Afonso
Admin: Elimar Veiga
```

---

## ✨ Boas Práticas

```
✅ Sempre ativar venv antes de trabalhar
✅ Nunca commitar .env com credenciais reais
✅ Testar em desenvolvimento antes de produção
✅ Ler GUIA_DEPLOY_RENDER.md antes de produção
✅ Usar dados de teste (DADOS_TESTE.md) para validação
✅ Verificar erros em DevTools (F12) quando Frontend falha
✅ Verificar logs do Uvicorn quando Backend falha

❌ Nunca deixar allow_origins=["*"] em produção
❌ Nunca usar SECRET_KEY fraca
❌ Nunca deixar credenciais BD no código
❌ Nunca fazer git commit do .env
```

---

## 🚀 Começar Agora

```
PASSO 1: Este resumo (5 min) ← Está aqui
         ↓
PASSO 2: Escolher guia (INDICE_DOCUMENTACAO.md) ← 5 min
         ↓
PASSO 3: Setup (30-50 min)
         ├─ Automático (setup_kitanda.ps1) ← Recomendado
         ├─ ou Manual (GUIA_RAPIDO_AGENT.md)
         ├─ ou Detalhado (PLANO_EXECUCAO_NOVO_PC.md)
         ↓
PASSO 4: Validar (5-10 min)
         ├─ Backend: http://localhost:8000/docs
         ├─ Frontend: http://127.0.0.1:5500
         └─ Login: comprador@teste.com / password123
         ↓
PASSO 5: Começar a desenvolver! 🎉
```

---

## 📊 Sumário Visual

```
┌────────────────────────────────────────────┐
│   KITANDA - NOVO PC - SUMÁRIO EXECUTIVO    │
├────────────────────────────────────────────┤
│                                            │
│ ⏱️  Tempo Total: 30-60 minutos              │
│ 🎯 Setup Automático: setup_kitanda.ps1     │
│ 📚 Documentação: INDICE_DOCUMENTACAO.md    │
│ ✅ Validação: Backend + Frontend + Login    │
│ 🚀 Resultado: App pronta para desenvolvimento│
│                                            │
└────────────────────────────────────────────┘
```

---

**Última Atualização:** 2026-07-09  
**Versão:** 1.0  
**Status:** ✅ Pronto

**Próximo:** [→ INDICE_DOCUMENTACAO.md](INDICE_DOCUMENTACAO.md) (Escolher seu guia)
