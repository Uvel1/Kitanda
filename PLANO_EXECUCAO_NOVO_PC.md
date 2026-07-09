# 📋 Plano Completo de Execução da Kitanda em Novo PC

**Propósito:** Instruções detalhadas para clonar e executar a aplicação Kitanda (Frontend + Backend) num novo computador Windows, começando do zero.

---

## 📌 Visão Geral da Arquitetura

```
KITANDA (Projeto Completo)
│
├── 🔙 BACKEND (Python + FastAPI)
│   ├── API REST na porta 8000
│   ├── Base de dados PostgreSQL
│   ├── Autenticação JWT
│   └── Serviços de Email e SMS
│
└── 🎨 FRONTEND (HTML + JavaScript Vanilla)
    ├── Páginas estáticas em public/
    ├── Conecta ao Backend via API (localhost:8000)
    └── Executado via Live Server (porta 5500)
```

---

## ⚙️ FASE 0: Pré-Requisitos do Sistema

### O.1 Verificar Requisitos Mínimos

- **SO:** Windows 10 ou superior
- **RAM:** Mínimo 4GB (recomendado 8GB)
- **Espaço em disco:** Mínimo 2GB livres
- **Conexão à Internet:** Necessária para clonar repositório e instalar dependências

### O.2 Instalar Ferramentas Essenciais

#### 🐍 Python 3.11+

1. Download: https://www.python.org/downloads/
2. **⚠️ CRÍTICO:** Marcar "Add python.exe to PATH" durante instalação
3. Verificar: Abra PowerShell e execute:
   ```powershell
   python --version
   ```
   Deve mostrar: `Python 3.11.x` ou superior

#### 📝 Git

1. Download: https://git-scm.com/download/win
2. Instale com configurações padrão
3. Verificar: Execute no PowerShell:
   ```powershell
   git --version
   ```

#### 🗄️ PostgreSQL 15+

1. Download: https://www.postgresql.org/download/windows/
2. Durante instalação:
   - **Defina password do superuser (postgres):** `Ilevuosnof@!` (ou a sua escolha)
   - **Porta:** 5432 (padrão)
   - Aceite Stack Builder = NÃO
3. Verificar: Abra pgAdmin 4 e confirme que se conecta

#### 📦 Node.js (Opcional, apenas para Live Server alternativa)

- Geralmente não necessário se usar a extensão Live Server do VS Code

#### 💻 VS Code

1. Download: https://code.visualstudio.com/
2. Instale versão Windows (64-bit recomendado)
3. Instale extensões após abrir:
   - `ms-python.python` (Microsoft Python)
   - `ritwickdey.liveserver` (Live Server)
   - `ms-vscode.remote-repositories` (opcional, para trabalhar com GitHub)

---

## 📂 FASE 1: Clonar o Repositório

### 1.1 Criar Pasta Base

```powershell
# Abra PowerShell e execute:
mkdir C:\Projetos
cd C:\Projetos
```

### 1.2 Clonar o Repositório

```powershell
git clone https://github.com/Uvel1/Kitanda.git
cd Kitanda
```

### 1.3 Verificar Estrutura

Confirme que vê esta estrutura:

```
Kitanda/
├── back-end/          ✓
├── front-end/         ✓
├── GUIA_CONFIGURACAO.md
├── DADOS_TESTE.md
└── schema.sql
```

---

## 🔧 FASE 2: Configurar Backend

### 2.1 Criar Ambiente Virtual Python

```powershell
cd C:\Projetos\Kitanda\back-end
python -m venv venv
```

Aguarde até aparecer a pasta `venv/`

### 2.2 Ativar Ambiente Virtual

```powershell
.\venv\Scripts\activate
```

✓ Se vir `(venv)` a verde no terminal, está correto!

### 2.3 Atualizar pip

```powershell
python -m pip install --upgrade pip
```

### 2.4 Instalar Dependências

```powershell
pip install -r requirements.txt
```

Isto vai descarregar:

- ✅ fastapi, uvicorn (servidor web)
- ✅ sqlalchemy, alembic (base de dados)
- ✅ psycopg2 (conector PostgreSQL)
- ✅ python-jose, passlib (autenticação)
- ✅ fastapi-mail, httpx (email e HTTP)
- ✅ websockets (chat em tempo real)

**Tempo estimado:** 2-5 minutos

---

## 🗄️ FASE 3: Configurar Base de Dados

### 3.1 Criar Base de Dados PostgreSQL

#### Via pgAdmin 4 (Interface Gráfica)

1. Abra **pgAdmin 4** no menu Iniciar
2. Clique em **Servers** > **PostgreSQL** (lado esquerdo)
3. Clique **Databases** com botão direito → **Create** → **Database...**
4. Nome: `kitanda_db`
5. Clique **Save**

#### Ou via Terminal (Linha de Comando)

```powershell
# Abra PowerShell como administrador
psql -U postgres

# Na prompt do PostgreSQL:
CREATE DATABASE kitanda_db;
\q  # para sair
```

### 3.2 Copiar ou Criar Arquivo .env

Na pasta `back-end/`, crie ou edite `.env`:

```env
# ✅ BASE DE DADOS
DATABASE_URL=postgresql://postgres:Ilevuosnof@!@localhost:5432/kitanda_db

# ✅ SEGURANÇA (USE VALORES REAIS EM PRODUÇÃO)
SECRET_KEY=sua-chave-super-secreta-minimo-32-caracteres-aleatorios
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# ✅ EMAIL (Opcional, para features de email)
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASSWORD=sua-senha-de-aplicacao
EMAIL_FROM=seu-email@gmail.com

# ✅ SMS (Opcional, para features de SMS)
SMS_API_KEY=sua-chave-api
SMS_SENDER_ID=Kitanda
```

**IMPORTANTE:** Substitua:

- `Ilevuosnof@!` pela sua password do PostgreSQL
- `sua-chave-super-secreta...` por uma chave aleatória forte

### 3.3 Executar Migrações de Base de Dados (Alembic)

```powershell
# Certifique-se que está em: C:\Projetos\Kitanda\back-end

# Verificar estado das migrações
alembic current

# Aplicar todas as migrações para criar tabelas
alembic upgrade head
```

Se tudo correr bem, verá:

```
INFO [alembic.runtime.migration] Running upgrade abc1234 -> def5678, ...
```

### 3.4 Popular Base de Dados com Dados de Teste (Opcional)

```powershell
# Opção A: Com dados de teste predefinidos
python seed_render.py

# Opção B: Com dados específicos para Angola
python seed_angola_21.py

# Opção C: Verificar a conexão com a BD
python check_db.py
```

---

## 🎨 FASE 4: Configurar Frontend

### 4.1 Verificar Configuração de API

Abra [front-end/public/js/api.js](front-end/public/js/api.js#L1)

Confirme que tem:

```javascript
const API_BASE_URL = "http://localhost:8000/api/v1";
```

**Notas:**

- Em desenvolvimento: use `localhost:8000`
- Em produção: use URL do servidor (ex: `https://seu-dominio.com/api/v1`)

### 4.2 Estrutura de Pastas

```
front-end/public/
├── index.html              (Página inicial)
├── js/
│   ├── api.js             (⚠️ Verificado acima)
│   ├── landing_page.js
│   ├── login.js
│   ├── cadastros.js
│   └── ... [+8 mais]
├── css/
│   ├── landing_page.css
│   ├── login.css
│   └── ... [+8 mais]
└── cadastro/, checkout/, etc. (Outras páginas)
```

---

## 🚀 FASE 5: Executar a Aplicação

### Passo 1️⃣: Ligar o Backend

Abra **dois terminais** no VS Code:

**Terminal 1 - Backend (FastAPI):**

```powershell
cd C:\Projetos\Kitanda\back-end
.\venv\Scripts\activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Deve ver:

```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

**✓ Backend está a correr em:** `http://localhost:8000`
**✓ Documentação interativa (Swagger):** `http://localhost:8000/docs`

### Passo 2️⃣: Ligar o Frontend

No VS Code:

1. Vá a: `front-end/public/index.html`
2. Clique com botão direito → **Open with Live Server**
3. O navegador abre automaticamente em `http://127.0.0.1:5500`

**✓ Frontend está a correr em:** `http://127.0.0.1:5500`

---

## ✅ FASE 6: Testar a Aplicação

### 6.1 Verificar Conectividade

**Backend funcionando:**

```bash
# Abra navegador e visite:
http://localhost:8000/docs
```

Se vir a página do Swagger com os endpoints, ✓ Backend OK

**Frontend funcionando:**

```bash
# Abra navegador e visite:
http://127.0.0.1:5500
```

Se vir a página de login, ✓ Frontend OK

### 6.2 Testar Login

Use uma destas contas de teste (ver [DADOS_TESTE.md](DADOS_TESTE.md)):

| Email                 | Senha         | Tipo      |
| --------------------- | ------------- | --------- |
| `comprador@teste.com` | `password123` | Comprador |
| `vendedor@teste.com`  | `password123` | Vendedor  |
| `empresa@teste.com`   | `password123` | Empresa   |
| `admin@kitanda.com`   | `password123` | Admin     |

### 6.3 Testar Fluxo Completo

1. **Login:** Faça login com um comprador
2. **Explorar:** Veja produtos na página "Explorar"
3. **Carrinho:** Adicione um produto ao carrinho
4. **Checkout:** Faça um pedido fictício
5. **Painel:** Aceda ao painel do vendedor para ver o pedido

---

## 🔍 FASE 7: Resolver Problemas Comuns

### ❌ Erro: "ModuleNotFoundError: No module named 'app'"

**Solução:**

```powershell
# Confirme que está na pasta back-end
cd C:\Projetos\Kitanda\back-end

# Confirme que venv está ativado (vê (venv) verde?)
.\venv\Scripts\activate

# Reinstale:
pip install -r requirements.txt
```

### ❌ Erro: "could not connect to server: Connection refused"

**Solução:**

1. Confirme que PostgreSQL está a correr (Services do Windows)
2. Confirme DATABASE_URL no `.env` está correto
3. Verifique que a base de dados `kitanda_db` existe:
   ```powershell
   psql -U postgres -d kitanda_db -c "SELECT 1;"
   ```

### ❌ Erro: "CORS error: Access to XMLHttpRequest has been blocked"

**Solução:**
Isto significa que o backend não está a responder. Verifique:

1. Backend está a correr em `http://localhost:8000`?
2. Em [back-end/app/main.py](back-end/app/main.py#L25), `allow_origins=["*"]` está ativo?
3. API_BASE_URL em [front-end/public/js/api.js](front-end/public/js/api.js#L3) é correto?

### ❌ Erro: "Segurança do PowerShell: cannot be loaded because running scripts is disabled"

**Solução:**
Execute como administrador:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Depois repita a ativação do venv.

### ❌ Erro: "python: command not found"

**Solução:**
Python não foi adicionado ao PATH. Reinstale Python e **marque "Add python.exe to PATH"**.

### ❌ Livreload não funciona no Frontend

**Solução:**

1. Feche a abas e reabra `http://127.0.0.1:5500`
2. Ou use a extensão Live Server do VS Code
3. Ou instale: `npm install -g live-server`

---

## 📊 FASE 8: Checklist de Conclusão

Antes de considerar "pronto", verifique:

- [ ] Python 3.11+ instalado e no PATH
- [ ] Git instalado e funcionando
- [ ] PostgreSQL 15+ instalado com password definida
- [ ] VS Code instalado com extensões Python e Live Server
- [ ] Repositório clonado em `C:\Projetos\Kitanda\`
- [ ] Ambiente virtual criado (`back-end/venv/`)
- [ ] Dependências instaladas via `pip install -r requirements.txt`
- [ ] Base de dados `kitanda_db` criada
- [ ] Arquivo `.env` configurado com:
  - [ ] DATABASE_URL correto
  - [ ] SECRET_KEY definida
- [ ] Migrações executadas: `alembic upgrade head`
- [ ] Dados de teste inseridos (opcional): `python seed_render.py`
- [ ] Backend a correr: `http://localhost:8000/docs` ✓
- [ ] Frontend a correr: `http://127.0.0.1:5500` ✓
- [ ] Login funciona com `comprador@teste.com / password123`
- [ ] Pode ver produtos em "Explorar"
- [ ] Pode adicionar produtos ao carrinho
- [ ] Pode fazer checkout

---

## 🆘 Suporte e Contatos

Se encontrar problemas não listados acima:

1. **Verificar documentação:**
   - [GUIA_CONFIGURACAO.md](GUIA_CONFIGURACAO.md)
   - [DADOS_TESTE.md](DADOS_TESTE.md)
   - [GUIA_DEPLOY_RENDER.md](GUIA_DEPLOY_RENDER.md)

2. **Verificar logs:**
   - Backend logs: Olhe para o terminal onde `uvicorn` está a correr
   - Frontend: Abra DevTools do navegador (F12) → Console

3. **Contactar desenvolvimento:**
   - Uveli Afonso (Backend)
   - Elimar Veiga (Backend/Admin)

---

## 📚 Estrutura de Ficheiros Importantes

```
Kitanda/
│
├── back-end/
│   ├── .env                          ← Configuração local (CREATE ESTE!)
│   ├── .env.example                  ← Template
│   ├── requirements.txt              ← Dependências Python
│   ├── alembic/                      ← Migrações BD
│   ├── app/
│   │   ├── main.py                   ← Entrada do FastAPI
│   │   ├── core/
│   │   │   ├── config.py            ← Variáveis de configuração
│   │   │   └── database.py          ← Conexão PostgreSQL
│   │   ├── models/
│   │   ├── schemas/
│   │   └── api/v1/endpoints/        ← Rotas da API
│   └── venv/                         ← Ambiente virtual (CREATE ESTE!)
│
├── front-end/
│   └── public/
│       ├── index.html                ← Página inicial
│       ├── js/
│       │   ├── api.js               ← ⚠️ Verifica localhost:8000
│       │   └── ...
│       └── css/
│           └── ...
│
├── GUIA_CONFIGURACAO.md              ← Guia básico
├── DADOS_TESTE.md                   ← Contas de teste
├── GUIA_DEPLOY_RENDER.md            ← Deploy em produção
└── PLANO_EXECUCAO_NOVO_PC.md        ← ESTE ARQUIVO
```

---

## ⏱️ Tempo Estimado Total

| Fase                 | Tempo         | Notas                |
| -------------------- | ------------- | -------------------- |
| Instalar ferramentas | 20-30 min     | Primeira vez         |
| Clonar repositório   | 2-5 min       | Depende da conexão   |
| Configurar backend   | 10-15 min     | Includes pip install |
| Configurar BD        | 5-10 min      | Criar BD + migrações |
| Configurar frontend  | 2-3 min       | Verificação apenas   |
| Iniciar aplicação    | 2-3 min       | Começar servidores   |
| Testar               | 5-10 min      | Validação completa   |
| **TOTAL**            | **45-75 min** | Primeira vez         |

---

**Versão:** 1.0  
**Data:** 2026-07-09  
**Autor:** Plano Automático Kitanda  
**Status:** ✅ Pronto para novo PC
