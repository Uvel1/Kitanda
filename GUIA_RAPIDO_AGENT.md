# ⚡ Guia Rápido para Agent/Dev - Kitanda Setup

**Propósito:** Instruções condensadas e prontas para copy-paste para configurar e executar Kitanda rapidamente.

---

## 🎯 Resumo Executivo

```
Frontend:  HTML + JavaScript vanilla → Porta 5500 (Live Server)
Backend:   Python FastAPI + PostgreSQL → Porta 8000
Database:  PostgreSQL com alembic migrations
Temps Est: 30-45 minutos
```

---

## 📋 Sequência de Comandos Rápida

### 1. Pré-requisitos (Primeira Vez Apenas)

```powershell
# Verificar Python
python --version

# Verificar Git
git --version

# Verificar PostgreSQL/psql
psql --version

# Se falhar: Instale de https://python.org, https://git-scm.com, https://postgresql.org
```

### 2. Clonar Repositório

```powershell
mkdir C:\Projetos
cd C:\Projetos
git clone https://github.com/Uvel1/Kitanda.git
cd Kitanda
```

### 3. Setup Backend (Terminal 1)

```powershell
# Ir para backend
cd back-end

# Criar ambiente virtual
python -m venv venv

# Ativar venv
.\venv\Scripts\activate

# Atualizar pip
python -m pip install --upgrade pip

# Instalar dependências
pip install -r requirements.txt

# Listar installed packages (verificação)
pip list
```

### 4. Configurar Base de Dados

```powershell
# VIA PGADMIN 4 (Interface Gráfica)
# 1. Abra pgAdmin 4
# 2. Databases → Create → New Database
# 3. Nome: kitanda_db
# 4. Save

# OU VIA TERMINAL (Linha de Comando)
psql -U postgres
CREATE DATABASE kitanda_db;
\q
```

### 5. Criar Arquivo .env

Na pasta `back-end/`, crie ou edite `.env`:

```env
DATABASE_URL=postgresql://postgres:Ilevuosnof@!@localhost:5432/kitanda_db
SECRET_KEY=sua-chave-secreta-super-aleatorios-32-caracteres
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASSWORD=sua-senha
EMAIL_FROM=seu-email@gmail.com
SMS_API_KEY=
SMS_SENDER_ID=Kitanda
```

### 6. Migrações Base de Dados

```powershell
# Confirme que está em: back-end/
cd C:\Projetos\Kitanda\back-end

# (venv) deve estar ativo

# Verificar estado
alembic current

# Aplicar todas as migrações
alembic upgrade head

# Verificar erro de conexão BD:
python check_db.py
```

### 7. Popular Base de Dados (Opcional)

```powershell
# Uma destas opções:

# Opção A: Dados para produção Render
python seed_render.py

# Opção B: Dados Angola
python seed_angola_21.py

# Opção C: Dados genéricos
python seed_data.py
```

---

## 🚀 Iniciar Servidores

### Terminal 1 - Backend (FastAPI)

```powershell
# Pasta: back-end
cd C:\Projetos\Kitanda\back-end
.\venv\Scripts\activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Esperado:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

**URLs:**
- API: `http://localhost:8000`
- Docs (Swagger): `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Terminal 2 - Frontend (Live Server)

No VS Code:
```
1. Abra: front-end/public/index.html
2. Botão direito → Open with Live Server
3. Navegador abre em: http://127.0.0.1:5500
```

Ou via terminal:
```powershell
# Se tiver npm instalado:
npx live-server front-end/public/
```

---

## ✅ Testes Rápidos

### 1. Backend Respondendo?
```bash
# Navegador:
http://localhost:8000/docs

# Via Terminal:
curl http://localhost:8000/
```

### 2. Frontend Carrega?
```bash
# Navegador:
http://127.0.0.1:5500
```

### 3. BD Conectada?
```powershell
# Terminal (no back-end com venv ativo):
python check_db.py
```

### 4. Login Funciona?
Aceda a `http://127.0.0.1:5500` e faça login com:
- Email: `comprador@teste.com`
- Senha: `password123`

---

## 🔧 Configurações Importantes

### Frontend → Backend

**Ficheiro:** `front-end/public/js/api.js`

```javascript
// Linha 3-5: Verificar base URL
const API_BASE_URL = 'http://localhost:8000/api/v1';

// Em PRODUÇÃO mude para:
const API_BASE_URL = 'https://seu-dominio.com/api/v1';
```

### Backend → Database

**Ficheiro:** `back-end/.env`

```env
# Base de dados
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE

# Exemplo local:
DATABASE_URL=postgresql://postgres:sua_password@localhost:5432/kitanda_db

# Exemplo Render (produção):
DATABASE_URL=postgresql://user:pass@dpg-xxx.render.com:5432/kitanda_xxxxx
```

### Backend → Email (Opcional)

**Ficheiro:** `back-end/.env`

```env
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASSWORD=sua-senha-de-app  # Não a senha normal do Gmail!
EMAIL_FROM=seu-email@gmail.com
```

---

## 🐛 Troubleshooting Rápido

| Erro | Solução |
|------|---------|
| `ModuleNotFoundError: No module named 'app'` | Confirme venv ativo, cwd é `back-end/`, `pip install -r requirements.txt` |
| `could not connect to server` | PostgreSQL não está rodando. Inicie via Services do Windows |
| `CORS error` | Backend não está em `http://localhost:8000`. Inicie em Terminal 1 |
| `Connection refused on port 5500` | Live Server não iniciado. Abra `index.html` e click "Open with Live Server" |
| `python: command not found` | Python não no PATH. Reinstale com "Add to PATH" ativado |
| `scripts disabled` PowerShell | Execute como admin: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser` |
| `database kitanda_db does not exist` | Criar BD: `psql -U postgres` → `CREATE DATABASE kitanda_db;` |
| `alembic migration failed` | Verificar `.env` DATABASE_URL, BD existe, PostgreSQL rodando |

---

## 📁 Ficheiros Críticos a Verificar

```
✓ back-end/.env                    (CREATE - variáveis ambiente)
✓ back-end/venv/                   (CREATE - ambiente virtual)
✓ back-end/requirements.txt        (EXISTING)
✓ back-end/app/main.py             (EXISTING - entrada FastAPI)
✓ back-end/app/core/config.py      (EXISTING - lê .env)
✓ back-end/alembic/versions/       (EXISTING - migrações)
✓ front-end/public/js/api.js       (VERIFY - localhost:8000)
✓ front-end/public/index.html      (EXISTING - entrada)
```

---

## 📊 Contas de Teste

Após `python seed_render.py`:

```
Email: comprador@teste.com
Senha: password123
Tipo:  Comprador

Email: vendedor@teste.com
Senha: password123
Tipo:  Vendedor

Email: empresa@teste.com
Senha: password123
Tipo:  Empresa/Loja

Email: admin@kitanda.com
Senha: password123
Tipo:  Admin
```

---

## ⏱️ Tempos Esperados

```
Instalar ferramentas (Python, Git, PG): 20-30 min (primeira vez)
Clone + setup venv:                       5-10 min
pip install -r requirements.txt:          3-5 min
Criar BD + migrações:                     2-3 min
Seed dados:                               1-2 min
Iniciar Backend:                          2 min
Iniciar Frontend:                         1 min
Teste Login:                              2 min
─────────────────────────────────────
TOTAL:                                    35-50 min (primeira vez)
```

---

## 🎬 Workflow Diário

Após primeira setup:

```powershell
# Terminal 1 - Backend
cd C:\Projetos\Kitanda\back-end
.\venv\Scripts\activate
uvicorn app.main:app --reload

# Terminal 2 - Frontend
# Abra front-end/public/index.html
# Click: Open with Live Server

# Navegador
http://127.0.0.1:5500
```

**Tempo:** ~2-3 minutos

---

## 🔐 Segurança - Antes de Deploy

```env
# NUNCA commite .env para Git!
git status  # Confirme .env em .gitignore

# Em produção:
- Mude SECRET_KEY para valor aleatório forte
- Use DATABASE_URL de produção (não localhost)
- Use senha SMTP real
- Desative allow_origins=["*"], use domínio específico
- Use HTTPS em produção
```

---

## 📞 Suporte

Ficheiros complementares:
- [PLANO_EXECUCAO_NOVO_PC.md](PLANO_EXECUCAO_NOVO_PC.md) - Guia completo
- [GUIA_CONFIGURACAO.md](GUIA_CONFIGURACAO.md) - Setup detalhado
- [DADOS_TESTE.md](DADOS_TESTE.md) - Dados de teste
- [GUIA_DEPLOY_RENDER.md](GUIA_DEPLOY_RENDER.md) - Deploy em produção

---

**Atualizado:** 2026-07-09  
**Status:** ✅ Pronto para usar
