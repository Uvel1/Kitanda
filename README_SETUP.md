# 🏪 Kitanda - Marketplace Angola

> Plataforma de compra e venda de produtos e serviços em Angola

[![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)](.)
[![Python](https://img.shields.io/badge/Python-3.11%2B-blue)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111.0-green)](https://fastapi.tiangolo.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15%2B-336791)](https://postgresql.org)

---

## 🎯 Visão Geral

**Kitanda** é uma aplicação de e-commerce que permite:

- 👥 **Compradores:** Explorar produtos, fazer pedidos, conversar com vendedores
- 🏪 **Vendedores:** Gerir loja, listar produtos/serviços, processar pedidos
- 💼 **Empresas:** Vender múltiplos produtos/serviços
- 🛡️ **Admin:** Gerir plataforma, usuários, denúncias

---

## 📊 Arquitetura

```
Frontend (HTML + JavaScript)       Backend (Python FastAPI)       Database (PostgreSQL)
http://127.0.0.1:5500    →→→    http://localhost:8000    →→→    localhost:5432
```

| Componente  | Tecnologia                 | Porta              |
| ----------- | -------------------------- | ------------------ |
| 🎨 Frontend | HTML5 + JavaScript Vanilla | 5500 (Live Server) |
| 🔙 Backend  | Python 3.11 + FastAPI      | 8000 (Uvicorn)     |
| 🗄️ Database | PostgreSQL 15+             | 5432               |

---

## 🚀 Quick Start (30 minutos)

### Pré-Requisitos

- ✅ Python 3.11+
- ✅ Git
- ✅ PostgreSQL 15+
- ✅ VS Code (recomendado)

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/Uvel1/Kitanda.git
cd Kitanda
```

### 2️⃣ Setup Automático (Recomendado)

```powershell
# Windows PowerShell (como Administrador)
.\setup_kitanda.ps1
```

**Ou manualmente:**

### 3️⃣ Setup Backend

```bash
cd back-end
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### 4️⃣ Configurar Base de Dados

```bash
# Criar arquivo .env
# Copie .env.example para .env e preencha:
DATABASE_URL=postgresql://postgres:sua_senha@localhost:5432/kitanda_db
SECRET_KEY=sua-chave-secreta
```

### 5️⃣ Executar Migrações

```bash
alembic upgrade head
python seed_render.py  # Dados de teste
```

### 6️⃣ Iniciar Servidores

**Terminal 1 - Backend:**

```bash
cd back-end
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload
```

→ http://localhost:8000/docs

**Terminal 2 - Frontend:**

```
front-end/public/index.html → Open with Live Server
```

→ http://127.0.0.1:5500

---

## 🧪 Testar

### Login com Contas de Teste

```
Email: comprador@teste.com
Senha: password123
```

Outras contas: Ver [DADOS_TESTE.md](DADOS_TESTE.md)

### Verificar Backend

```bash
curl http://localhost:8000/
# Retorna: {"message":"Welcome to Kitanda API"}
```

---

## 📚 Documentação

| Documento                                                 | Finalidade                            |
| --------------------------------------------------------- | ------------------------------------- |
| 📄 [INDICE_DOCUMENTACAO.md](INDICE_DOCUMENTACAO.md)       | **🎯 COMECE AQUI** - Guia de qual ler |
| 📄 [GUIA_CONFIGURACAO.md](GUIA_CONFIGURACAO.md)           | Setup passo-a-passo (iniciantes)      |
| 📄 [PLANO_EXECUCAO_NOVO_PC.md](PLANO_EXECUCAO_NOVO_PC.md) | Setup completo com 8 fases            |
| 📄 [GUIA_RAPIDO_AGENT.md](GUIA_RAPIDO_AGENT.md)           | Commands prontos (devs experientes)   |
| 📄 [MAPA_VISUAL_SETUP.md](MAPA_VISUAL_SETUP.md)           | Diagramas, troubleshooting, checklist |
| 🔧 [setup_kitanda.ps1](setup_kitanda.ps1)                 | Script automatizado (PowerShell)      |
| 📄 [DADOS_TESTE.md](DADOS_TESTE.md)                       | Contas e dados fictícios              |
| 📄 [GUIA_DEPLOY_RENDER.md](GUIA_DEPLOY_RENDER.md)         | Deploy em produção                    |

**→ [COMECE AQUI: Índice de Documentação](INDICE_DOCUMENTACAO.md)**

---

## 🐛 Troubleshooting Rápido

| Problema                     | Solução                                                                      |
| ---------------------------- | ---------------------------------------------------------------------------- |
| ❌ `ModuleNotFoundError`     | Verifique: `cd back-end`, venv ativo, `pip install -r requirements.txt`      |
| ❌ `Connection refused (BD)` | PostgreSQL não está a correr. Inicie via Services                            |
| ❌ CORS Error                | Backend em `http://localhost:8000`? Verificar `api.js`                       |
| ❌ Login falha               | Use `comprador@teste.com` / `password123` ou `python seed_render.py`         |
| ❌ Outros erros              | Ver: [MAPA_VISUAL_SETUP.md](MAPA_VISUAL_SETUP.md#-troubleshooting-detalhado) |

---

## 📁 Estrutura do Projeto

```
Kitanda/
├── 📁 back-end/              # API Python FastAPI
│   ├── app/
│   │   ├── main.py           ← Entrada
│   │   ├── api/v1/           ← Endpoints
│   │   ├── models/           ← BD models
│   │   ├── schemas/          ← Validação
│   │   └── core/
│   │       ├── config.py     ← Variáveis
│   │       └── database.py   ← Conexão PG
│   ├── alembic/              ← Migrações
│   ├── requirements.txt      ← Dependências
│   └── .env                  ← ⚠️ Não commitar
│
├── 📁 front-end/public/      # Interface web
│   ├── index.html            ← Página inicial
│   ├── js/
│   │   ├── api.js            ← Client HTTP
│   │   ├── login.js
│   │   ├── explorar.js
│   │   ├── carrinho.js
│   │   └── ...
│   └── css/
│       ├── landing_page.css
│       ├── login.css
│       └── ...
│
├── 📄 INDICE_DOCUMENTACAO.md ← 🎯 COMECE AQUI
├── 📄 GUIA_CONFIGURACAO.md
├── 📄 PLANO_EXECUCAO_NOVO_PC.md
├── 📄 GUIA_RAPIDO_AGENT.md
├── 📄 MAPA_VISUAL_SETUP.md
├── 📄 DADOS_TESTE.md
├── 📄 GUIA_DEPLOY_RENDER.md
└── 🔧 setup_kitanda.ps1
```

---

## 🔐 Segurança

### Desenvolvimento

- ✅ CORS permitido para todos (`allow_origins=["*"]`)
- ✅ Senha padrão: `password123`

### Produção

- ⚠️ **NUNCA** commitar `.env`
- ⚠️ Alterar `SECRET_KEY` para valor aleatório forte
- ⚠️ Usar DATABASE_URL de produção
- ⚠️ Configurar CORS com domínio específico
- ⚠️ Usar HTTPS

Ver: [GUIA_DEPLOY_RENDER.md](GUIA_DEPLOY_RENDER.md#-segurança)

---

## 🛠️ Stack Técnico

### Backend

- **Framework:** FastAPI 0.111.0
- **Servidor:** Uvicorn 0.29.0
- **ORM:** SQLAlchemy 2.0.30
- **Migrations:** Alembic 1.13.1
- **Auth:** JWT + Passlib
- **Email:** FastAPI-Mail
- **WebSocket:** WebSockets 12.0

### Frontend

- **HTML5**
- **CSS3**
- **JavaScript Vanilla** (sem frameworks)
- **HTTP Client:** Fetch API

### Database

- **PostgreSQL 15+**
- **Migrations:** Alembic

---

## 📞 Equipa

| Papel         | Responsável   |
| ------------- | ------------- |
| Backend       | Uveli Afonso  |
| Backend/Admin | Elimar Veiga  |
| Frontend      | (A completar) |

---

## 📝 Licença

Proprietário da Kitanda Angola.

---

## 🎓 Primeiros Passos

```
1. Clone repositório
   git clone https://github.com/Uvel1/Kitanda.git

2. Leia documentação
   → INDICE_DOCUMENTACAO.md (escolha seu guia)

3. Execute setup
   → setup_kitanda.ps1 (automático)
   ou
   → GUIA_RAPIDO_AGENT.md (manual)

4. Teste aplicação
   → Backend: http://localhost:8000/docs
   → Frontend: http://127.0.0.1:5500

5. Login de teste
   Email: comprador@teste.com
   Senha: password123

6. Pronto! Comece a explorar 🚀
```

---

## 🆘 Precisa de Ajuda?

1. **Ler documentação:** [INDICE_DOCUMENTACAO.md](INDICE_DOCUMENTACAO.md)
2. **Procurar erro:** [MAPA_VISUAL_SETUP.md - Troubleshooting](MAPA_VISUAL_SETUP.md#-troubleshooting-detalhado)
3. **Executar script:** `setup_kitanda.ps1`
4. **Contactar:** Ver equipa acima

---

**Última atualização:** 2026-07-09  
**Versão:** 1.0.0  
**Status:** ✅ Pronto para desenvolvimento

---

### 🚀 Próximas Ações

- [ ] Clone repositório
- [ ] Leia [INDICE_DOCUMENTACAO.md](INDICE_DOCUMENTACAO.md)
- [ ] Execute setup
- [ ] Teste login
- [ ] Comece desenvolvimento

Boa sorte! 🎉
