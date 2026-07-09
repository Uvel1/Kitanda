# 🎯 Mapa Visual de Setup - Kitanda

## Fluxo Geral da Aplicação

```
┌─────────────────────────────────────────────────────────────────┐
│                         KITANDA APP                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │               🌐 FRONTEND (Cliente)                       │   │
│  │                 HTML + JavaScript                         │   │
│  │              http://127.0.0.1:5500                       │   │
│  │                   Live Server                            │   │
│  └────────────────────────┬─────────────────────────────────┘   │
│                           │                                       │
│                    HTTP Requests                                  │
│              (fetch, XMLHttpRequest)                             │
│                           │                                       │
│                           ▼                                       │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │          🔙 BACKEND (Servidor API)                        │   │
│  │          Python FastAPI + Uvicorn                         │   │
│  │           http://localhost:8000                           │   │
│  │         /api/v1/auth, /api/v1/produtos, etc             │   │
│  └────────────────────────┬─────────────────────────────────┘   │
│                           │                                       │
│                  SQL Queries                                      │
│           (SQLAlchemy ORM)                                        │
│                           │                                       │
│                           ▼                                       │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │        🗄️ DATABASE (Dados Persistentes)                  │   │
│  │           PostgreSQL 15+                                 │   │
│  │        localhost:5432 (kitanda_db)                       │   │
│  │   Tables: usuarios, produtos, pedidos, etc              │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Sequência de Inicialização (Startup)

```
PC Novo
  │
  ├─ [PRÉ-REQUISITOS]
  │  ├─ Python 3.11+ ✓
  │  ├─ Git ✓
  │  ├─ PostgreSQL 15+ ✓
  │  └─ VS Code ✓
  │
  ├─ [CLONE]
  │  └─ git clone https://github.com/Uvel1/Kitanda.git
  │
  ├─ [BACKEND SETUP]
  │  ├─ cd back-end
  │  ├─ python -m venv venv
  │  ├─ .\venv\Scripts\Activate.ps1
  │  ├─ pip install -r requirements.txt
  │  └─ .env configurado ✓
  │
  ├─ [DATABASE SETUP]
  │  ├─ CREATE DATABASE kitanda_db
  │  ├─ psql -U postgres (conectar)
  │  ├─ alembic upgrade head (criar tabelas)
  │  └─ python seed_render.py (dados teste)
  │
  ├─ [START BACKEND]
  │  ├─ Terminal 1: uvicorn app.main:app --reload
  │  └─ Rodando em: http://localhost:8000 ✓
  │
  ├─ [START FRONTEND]
  │  ├─ Terminal 2: Open with Live Server
  │  └─ Rodando em: http://127.0.0.1:5500 ✓
  │
  └─ [TESTE]
     ├─ Login: comprador@teste.com / password123
     ├─ Explorar: Vê produtos ✓
     ├─ Carrinho: Adiciona item ✓
     └─ Checkout: Completa pedido ✓
```

---

## Árvore de Ficheiros Importante

```
C:\Projetos\Kitanda/
│
├── 📄 PLANO_EXECUCAO_NOVO_PC.md        ← LEIA ISTO PRIMEIRO!
├── 📄 GUIA_RAPIDO_AGENT.md             ← Para setup rápido
├── 📄 GUIA_CONFIGURACAO.md             ← Guia básico
├── 📄 DADOS_TESTE.md                   ← Contas de teste
├── 📄 GUIA_DEPLOY_RENDER.md            ← Produção
├── 🔧 setup_kitanda.ps1                ← Script automático
│
├── 📁 back-end/
│   ├── .env                            ← CREATE (senha BD, keys)
│   ├── .env.example                    ← Template
│   ├── requirements.txt                ← Dependências Python
│   ├── venv/                           ← CREATE (ambiente Python)
│   ├── alembic/                        ← Migrações BD
│   │   ├── versions/
│   │   │   ├── a98e3f5c908a_initial_migration.py
│   │   │   ├── 323fce88fcab_add_notificacao...py
│   │   │   └── ... (mais migrações)
│   │   ├── env.py
│   │   └── script.py.mako
│   ├── app/
│   │   ├── main.py                    ← Entrada FastAPI
│   │   ├── core/
│   │   │   ├── config.py              ← Lê .env
│   │   │   ├── database.py            ← Conexão PG
│   │   │   ├── security.py            ← JWT auth
│   │   │   ├── email.py               ← SMTP
│   │   │   └── phone.py               ← SMS
│   │   ├── models/
│   │   │   └── models.py              ← Tabelas BD
│   │   ├── schemas/
│   │   │   └── schemas.py             ← Validação Pydantic
│   │   └── api/v1/endpoints/
│   │       ├── auth.py                ← Login/Registro
│   │       ├── produtos.py            ← Crud Produtos
│   │       ├── pedidos.py             ← Pedidos
│   │       ├── chat.py                ← Chat Websocket
│   │       └── ... (mais rotas)
│   ├── create_test_data.py
│   ├── seed_render.py                 ← Popular BD
│   ├── check_db.py                    ← Testar conexão
│   └── imagens/
│       ├── produtos/
│       └── vendedor/
│
└── 📁 front-end/public/
    ├── index.html                      ← Página inicial
    ├── login/index.html               ← Login
    ├── explorar/index.html            ← Listagem produtos
    ├── produto/index.html             ← Detalhe produto
    ├── carrinho/index.html            ← Carrinho
    ├── checkout/index.html            ← Checkout
    ├── paineis/                       ← Painéis usuário
    │   ├── painel_comprador.html
    │   ├── painel_vendedor.html
    │   └── painel_empresa.html
    ├── css/
    │   ├── landing_page.css
    │   ├── login.css
    │   ├── explorar.css
    │   ├── carrinho.css
    │   ├── checkout.css
    │   └── ... (mais CSS)
    └── js/
        ├── api.js                     ← ⚠️ Verificar localhost:8000
        ├── login.js
        ├── explorar.js
        ├── carrinho.js
        ├── checkout.js
        ├── painel_comprador.js
        ├── painel_vendedor.js
        ├── chat.js                    ← WebSocket
        └── ... (mais JS)
```

---

## 🔍 Checklist de Verificação

### ✅ Pré-Requisitos Instalados?

- [ ] `python --version` retorna 3.11+
- [ ] `git --version` funciona
- [ ] `psql --version` funciona
- [ ] VS Code instalado
- [ ] Extensões: Python, Live Server

### ✅ Repositório Clonado?

- [ ] Pasta `C:\Projetos\Kitanda` existe
- [ ] Contém pastas `back-end` e `front-end`
- [ ] Ficheiros `.md` presentes

### ✅ Backend Configurado?

- [ ] Pasta `back-end\venv` existe
- [ ] Arquivo `.env` existe e preenchido
- [ ] `pip list` mostra: fastapi, sqlalchemy, psycopg2, etc.

### ✅ Database Pronta?

- [ ] PostgreSQL a correr (Services do Windows)
- [ ] Base de dados `kitanda_db` criada
- [ ] `alembic current` retorna versão atual
- [ ] `python check_db.py` conecta com sucesso

### ✅ Frontend Verificado?

- [ ] `front-end/public/js/api.js` tem `API_BASE_URL = 'http://localhost:8000'`
- [ ] Ficheiro `index.html` acessível

### ✅ Servidores Rodando?

- [ ] Backend: `http://localhost:8000` retorna resposta
- [ ] Backend Docs: `http://localhost:8000/docs` carrega Swagger
- [ ] Frontend: `http://127.0.0.1:5500` carrega página
- [ ] Sem erros CORS no console (F12)

### ✅ Login Funciona?

- [ ] Email: `comprador@teste.com` / Senha: `password123` - ✓ Login bem-sucedido
- [ ] Redireciona para dashboard ou explorar

---

## 🚨 Troubleshooting Detalhado

### Erro: "ModuleNotFoundError: No module named 'app'"

**Sintomas:**

```
ModuleNotFoundError: No module named 'app'
  at line: from app.api.v1.endpoints import ...
```

**Causas Possíveis:**

1. ❌ Não está na pasta `back-end/`
2. ❌ `venv` não está ativado
3. ❌ Dependências não instaladas

**Solução:**

```powershell
# ✓ Confirme localização
cd C:\Projetos\Kitanda\back-end

# ✓ Ative venv (deve ver (venv) verde)
.\venv\Scripts\Activate.ps1

# ✓ Reinstale dependências
pip install -r requirements.txt --force-reinstall

# ✓ Tente de novo
uvicorn app.main:app --reload
```

---

### Erro: "could not connect to server: Connection refused"

**Sintomas:**

```
could not connect to server: Connection refused
  Is the server running on host "localhost" (127.0.0.1) port 5432?
```

**Causas Possíveis:**

1. ❌ PostgreSQL não está a correr
2. ❌ Password em `.env` está errada
3. ❌ Base de dados não existe
4. ❌ Porta 5432 bloqueada

**Solução:**

```powershell
# ✓ Verificar PostgreSQL a correr
# Abra Services do Windows (services.msc)
# Procure "postgresql-x64-15" e verifique se está "Running"

# ✓ Testar conexão manualmente
psql -U postgres

# ✓ Se conecta, verifique base de dados
\l  # Lista bases de dados

# ✓ Se kitanda_db não existe, crie:
CREATE DATABASE kitanda_db;

# ✓ Saia
\q

# ✓ Tente backend novamente
uvicorn app.main:app --reload
```

---

### Erro: "CORS error in browser console"

**Sintomas:**

```
Access to XMLHttpRequest at 'http://localhost:8000/...' from origin
'http://127.0.0.1:5500' has been blocked by CORS policy
```

**Causas Possíveis:**

1. ❌ Backend não está a correr
2. ❌ `API_BASE_URL` em `api.js` está errada
3. ❌ CORS não está habilitado em backend

**Solução:**

```javascript
// ✓ Verificar front-end/public/js/api.js linha 3-5
const API_BASE_URL = "http://localhost:8000/api/v1";
// Não 'https://', não 'http://localhost:3000', etc.
```

```python
# ✓ Verificar back-end/app/main.py linha 23-28
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em dev, tudo. Em prod, ["https://seu-dominio.com"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Verificação:**

```bash
# Terminal, ping backend:
curl http://localhost:8000/

# Deve retornar: {"message":"Welcome to Kitanda API"}
```

---

### Erro: "scripts are disabled on this system"

**Sintomas:**

```
cannot be loaded because running scripts is disabled on this system.
```

**Causas:**

- PowerShell tem política de segurança

**Solução:**

```powershell
# ✓ Execute como Administrador
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# ✓ Confirme com 'Y'
# ✓ Tente de novo:
.\venv\Scripts\Activate.ps1
```

---

### Erro: "alembic upgrade head" Fails

**Sintomas:**

```
sqlalchemy.exc.OperationalError: (psycopg2.OperationalError)
FATAL: password authentication failed for user "postgres"
```

**Causas:**

- DATABASE_URL em `.env` tem password errada

**Solução:**

```env
# ✓ Edite back-end/.env
# Substitua "Ilevuosnof@!" pela sua senha real do PostgreSQL
DATABASE_URL=postgresql://postgres:SUA_SENHA_REAL@localhost:5432/kitanda_db

# ✓ Teste conexão:
psql -U postgres -h localhost -d kitanda_db
```

Se não sabe a password:

```powershell
# ✓ Resete via pgAdmin 4:
# 1. Abra pgAdmin 4
# 2. Clique em "Servers" (esquerda)
# 3. Clique direito em "PostgreSQL" → Properties
# 4. Tab "Connection"
# 5. Verificar password ou alterar
```

---

### Erro: "Live Server não abre no navegador"

**Sintomas:**

- Clicar "Open with Live Server" não faz nada
- Ou abre mas diz "Cannot GET /"

**Causas:**

- Extensão não instalada
- Ficheiro html inválido
- Porta 5500 bloqueada

**Solução:**

```
✓ Passo 1: Verificar extensão
  - VS Code → Extensions (Ctrl+Shift+X)
  - Procure "Live Server"
  - Deve ter botão "Install" ou "Uninstall"
  - Se "Uninstall", está ok
  - Se "Install", clique instalar

✓ Passo 2: Abrir ficheiro certo
  - Navegue a: front-end/public/index.html
  - Clique direito → Open with Live Server
  - Deve abrir em http://127.0.0.1:5500

✓ Passo 3: Alternativa via Terminal
  - npm install -g live-server
  - cd C:\Projetos\Kitanda\front-end\public
  - live-server
```

---

### Erro: "Login falha - 401 Unauthorized"

**Sintomas:**

```
POST http://localhost:8000/api/v1/login
Status: 401 Unauthorized
```

**Causas:**

1. ❌ Email/senha errados
2. ❌ Dados de teste não foram inseridos
3. ❌ Backend não consegue conectar BD

**Solução:**

```powershell
# ✓ Verificar dados inseridos:
cd C:\Projetos\Kitanda\back-end
.\venv\Scripts\Activate.ps1

python -c "
from app.core.database import SessionLocal
from app.models.models import Usuario

db = SessionLocal()
usuarios = db.query(Usuario).all()
for u in usuarios:
    print(f'{u.email} - {u.nome}')
"

# ✓ Se lista vazia, inserir dados:
python seed_render.py

# ✓ Se erro de conexão BD, verificar:
python check_db.py
```

**Contas de Teste Padrão:**

```
Email: comprador@teste.com
Senha: password123

Email: vendedor@teste.com
Senha: password123

Email: empresa@teste.com
Senha: password123
```

---

## 📞 Quando Tudo Falhar

### Passo 1: Recolher Informações

```powershell
# Terminal 1: Erro do Backend
python --version
git --version
psql --version
pip list | Select-String fastapi

# Terminal 2: Ver logs do Backend
uvicorn app.main:app --reload

# Terminal 3: Frontend - Abrir DevTools
F12 → Console → Ver erros
```

### Passo 2: Verificar Básico

- [ ] PostgreSQL a correr? (Services)
- [ ] Backend retorna resposta? (`curl http://localhost:8000`)
- [ ] Frontend carrega? (Browser `http://127.0.0.1:5500`)
- [ ] Sem erros CORS? (DevTools → Network)

### Passo 3: Limpar e Recomeçar

```powershell
# Opção A: Limpar venv
cd C:\Projetos\Kitanda\back-end
Remove-Item venv -Recurse -Force
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Opção B: Limpar BD
# Via pgAdmin 4: Databases → kitanda_db → Delete
# Recriar:
psql -U postgres
CREATE DATABASE kitanda_db;
\q

# Opção C: Limpar tudo e clonar novo
cd C:\Projetos
Remove-Item Kitanda -Recurse -Force
git clone https://github.com/Uvel1/Kitanda.git
# Recomeçar setup
```

---

## 📚 Documentos Relacionados

```
📄 PLANO_EXECUCAO_NOVO_PC.md
   ↳ Guia completo e detalhado (100+ linhas)
   ↳ LEIA ESTE PRIMEIRO

📄 GUIA_RAPIDO_AGENT.md
   ↳ Referência rápida com comandos prontos
   ↳ Para dev/agent fazer setup em 30 min

🔧 setup_kitanda.ps1
   ↳ Script PowerShell automatizado
   ↳ Faz todo o setup com 1 comando

📄 GUIA_CONFIGURACAO.md
   ↳ Guia básico com screenshots (talvez)
   ↳ Para iniciantes

📄 DADOS_TESTE.md
   ↳ Contas de teste
   ↳ Dados fictícios pré-populados

📄 GUIA_DEPLOY_RENDER.md
   ↳ Deploy em produção
   ↳ Para quando terminar testes
```

---

## ⏱️ Tempos Realistas

| Ação                              | Tempo        | Notas                        |
| --------------------------------- | ------------ | ---------------------------- |
| Instalar Python+Git+PG            | 20-30min     | Primeira vez, download lento |
| Clone Kitanda                     | 2-5min       | Depende internet             |
| `pip install -r requirements.txt` | 3-5min       | Downlad pacotes              |
| Criar BD + migrações              | 2-3min       | Se PG está pronto            |
| Seed dados teste                  | 1-2min       | Opcional                     |
| Start Backend                     | 2min         | Compilação + startup         |
| Start Frontend                    | 1min         | Live Server quick            |
| Teste Login                       | 2-3min       | Validação completa           |
| **TOTAL PRIMEIRA VEZ**            | **35-50min** | Sem pedir ajuda              |
| **Startups subsequentes**         | **2-3min**   | Só ligar servidores          |

---

**Atualizado:** 2026-07-09  
**Versão:** 1.0  
**Status:** ✅ Pronto
