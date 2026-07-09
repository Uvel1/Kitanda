# ===============================================
# KITANDA - SETUP AUTOMATION SCRIPT
# Purpose: Automatic setup for new PC
# Author: Kitanda Dev Team
# Date: 2026-07-09
# ===============================================

# Cores para output
$colors = @{
    Success = 'Green'
    Error   = 'Red'
    Warning = 'Yellow'
    Info    = 'Cyan'
}

function Write-Status {
    param([string]$Message, [string]$Status = 'Info')
    Write-Host "[$Status] $Message" -ForegroundColor $colors[$Status]
}

function Test-Command {
    param([string]$Command)
    try {
        if (Get-Command $Command -ErrorAction Stop) { return $true }
    }
    catch { return $false }
}

# ===============================================
# FASE 1: VERIFICAR PRÉ-REQUISITOS
# ===============================================

Write-Status "============================================" "Info"
Write-Status "KITANDA - SETUP AUTOMATION" "Info"
Write-Status "============================================" "Info"
Write-Status ""

Write-Status "FASE 1: Verificando pré-requisitos..." "Info"

$prereqs_ok = $true

# Python
if (Test-Command python) {
    $pythonVersion = python --version 2>&1
    Write-Status "✓ Python encontrado: $pythonVersion" "Success"
}
else {
    Write-Status "✗ Python NÃO encontrado. Instale de: https://python.org/downloads" "Error"
    $prereqs_ok = $false
}

# Git
if (Test-Command git) {
    Write-Status "✓ Git encontrado" "Success"
}
else {
    Write-Status "✗ Git NÃO encontrado. Instale de: https://git-scm.com/download/win" "Error"
    $prereqs_ok = $false
}

# PostgreSQL
if (Test-Command psql) {
    Write-Status "✓ PostgreSQL encontrado" "Success"
}
else {
    Write-Status "✗ PostgreSQL NÃO encontrado. Instale de: https://postgresql.org/download/windows" "Error"
    $prereqs_ok = $false
}

if (-not $prereqs_ok) {
    Write-Status "Instale os pré-requisitos e execute este script novamente." "Error"
    exit 1
}

Write-Status "" "Info"

# ===============================================
# FASE 2: CLONAR REPOSITÓRIO
# ===============================================

Write-Status "FASE 2: Clonando repositório..." "Info"

$projectPath = "C:\Projetos"
$kitandaPath = "$projectPath\Kitanda"

if (-not (Test-Path $projectPath)) {
    New-Item -ItemType Directory -Path $projectPath -Force | Out-Null
    Write-Status "✓ Pasta criada: $projectPath" "Success"
}

if (Test-Path $kitandaPath) {
    Write-Status "⚠ Pasta Kitanda já existe em: $kitandaPath" "Warning"
    $response = Read-Host "Deseja manter (k), remover e clonar novo (r), ou cancelar (c)?"
    
    if ($response -eq 'r') {
        Remove-Item $kitandaPath -Recurse -Force
        Write-Status "Pasta removida" "Success"
    }
    elseif ($response -eq 'c') {
        exit 0
    }
    else {
        Write-Status "Continuando com pasta existente..." "Info"
    }
}

if (-not (Test-Path $kitandaPath)) {
    Set-Location $projectPath
    git clone https://github.com/Uvel1/Kitanda.git
    Write-Status "✓ Repositório clonado" "Success"
}
else {
    Write-Status "✓ Repositório já existe" "Success"
}

Set-Location $kitandaPath
Write-Status "✓ Localização atual: $(Get-Location)" "Success"

Write-Status "" "Info"

# ===============================================
# FASE 3: SETUP BACKEND
# ===============================================

Write-Status "FASE 3: Configurando Backend..." "Info"

$backendPath = "$kitandaPath\back-end"
$venvPath = "$backendPath\venv"

Set-Location $backendPath
Write-Status "Mudado para: $backendPath" "Info"

# Criar venv
if (-not (Test-Path $venvPath)) {
    Write-Status "Criando ambiente virtual..." "Info"
    python -m venv venv
    Write-Status "✓ Ambiente virtual criado" "Success"
}
else {
    Write-Status "✓ Ambiente virtual já existe" "Success"
}

# Ativar venv
Write-Status "Ativando ambiente virtual..." "Info"
& "$venvPath\Scripts\Activate.ps1"
Write-Status "✓ Ambiente virtual ativado" "Success"

# Atualizar pip
Write-Status "Atualizando pip..." "Info"
python -m pip install --upgrade pip --quiet
Write-Status "✓ Pip atualizado" "Success"

# Instalar dependências
Write-Status "Instalando dependências (isto pode levar 2-5 minutos)..." "Info"
pip install -r requirements.txt --quiet
Write-Status "✓ Dependências instaladas" "Success"

Write-Status "" "Info"

# ===============================================
# FASE 4: CONFIGURAR BASE DE DADOS
# ===============================================

Write-Status "FASE 4: Configurando Base de Dados..." "Info"

$envFile = "$backendPath\.env"

if (-not (Test-Path $envFile)) {
    Write-Status "Criando arquivo .env..." "Info"
    
    $dbPassword = Read-Host "Qual é a password do PostgreSQL? (padrão: Ilevuosnof@!)"
    if ([string]::IsNullOrEmpty($dbPassword)) { $dbPassword = "Ilevuosnof@!" }
    
    $secretKey = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % { [char]$_ })
    
    $envContent = @"
DATABASE_URL=postgresql://postgres:$dbPassword@localhost:5432/kitanda_db
SECRET_KEY=$secretKey
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
"@
    
    Set-Content -Path $envFile -Value $envContent -Encoding UTF8
    Write-Status "✓ Arquivo .env criado" "Success"
    Write-Status "  SECRET_KEY gerada automaticamente" "Info"
    Write-Status "  DATABASE_URL configurada com password fornecida" "Info"
}
else {
    Write-Status "✓ Arquivo .env já existe" "Success"
}

# Criar BD
Write-Status "Verificando se base de dados existe..." "Info"

$checkDb = @"
SELECT 1 FROM information_schema.schemata WHERE schema_name = 'kitanda_db';
"@

try {
    # Tenta verificar se BD existe
    $output = psql -U postgres -t -c "SELECT 1 FROM pg_database WHERE datname='kitanda_db';" 2>&1
    
    if ($output -match "1") {
        Write-Status "✓ Base de dados kitanda_db já existe" "Success"
    }
    else {
        Write-Status "Criando base de dados kitanda_db..." "Info"
        psql -U postgres -c "CREATE DATABASE kitanda_db;" 2>&1 | Out-Null
        Write-Status "✓ Base de dados criada" "Success"
    }
}
catch {
    Write-Status "⚠ Erro ao verificar/criar BD. Crie manualmente via pgAdmin ou execute:" "Warning"
    Write-Status "  psql -U postgres" "Warning"
    Write-Status "  CREATE DATABASE kitanda_db;" "Warning"
}

# Aplicar migrações
Write-Status "Aplicando migrações..." "Info"
try {
    alembic upgrade head 2>&1 | Out-Null
    Write-Status "✓ Migrações aplicadas com sucesso" "Success"
}
catch {
    Write-Status "⚠ Erro ao aplicar migrações. Tente manualmente:" "Warning"
    Write-Status "  alembic upgrade head" "Warning"
}

Write-Status "" "Info"

# ===============================================
# FASE 5: VERIFICAR FRONTEND
# ===============================================

Write-Status "FASE 5: Verificando Frontend..." "Info"

$frontendPath = "$kitandaPath\front-end\public\js\api.js"

if (Test-Path $frontendPath) {
    $apiContent = Get-Content $frontendPath -Raw
    if ($apiContent -match "localhost:8000") {
        Write-Status "✓ Frontend configurado para localhost:8000" "Success"
    }
    else {
        Write-Status "⚠ Verificar configuração de API em: $frontendPath" "Warning"
    }
}
else {
    Write-Status "✗ Arquivo api.js não encontrado em: $frontendPath" "Error"
}

Write-Status "" "Info"

# ===============================================
# FASE 6: OFERECER POPULAR BD
# ===============================================

Write-Status "FASE 6: Popular Base de Dados (Opcional)..." "Info"

$response = Read-Host "Deseja popular a BD com dados de teste? (s/n)"

if ($response -eq 's') {
    Write-Status "Populando base de dados..." "Info"
    
    if (Test-Path "$backendPath\seed_render.py") {
        python seed_render.py --quiet 2>&1 | Out-Null
        Write-Status "✓ Dados de teste inseridos (seed_render.py)" "Success"
    }
    else {
        Write-Status "⚠ Script seed não encontrado" "Warning"
    }
}
else {
    Write-Status "Base de dados não foi populada" "Info"
}

Write-Status "" "Info"

# ===============================================
# FASE 7: RESUMO FINAL
# ===============================================

Write-Status "============================================" "Info"
Write-Status "✓ SETUP COMPLETO!" "Success"
Write-Status "============================================" "Info"

Write-Status "" "Info"
Write-Status "Próximos passos:" "Info"
Write-Status "" "Info"
Write-Status "1️⃣  TERMINAL 1 - Backend:" "Info"
Write-Status "   cd $backendPath" "Info"
Write-Status "   .\venv\Scripts\Activate.ps1" "Info"
Write-Status "   uvicorn app.main:app --reload" "Info"
Write-Status "" "Info"
Write-Status "2️⃣  TERMINAL 2 - Frontend:" "Info"
Write-Status "   No VS Code: front-end/public/index.html" "Info"
Write-Status "   Click direito → Open with Live Server" "Info"
Write-Status "" "Info"
Write-Status "3️⃣  NAVEGADOR:" "Info"
Write-Status "   Frontend: http://127.0.0.1:5500" "Info"
Write-Status "   Backend (Swagger): http://localhost:8000/docs" "Info"
Write-Status "" "Info"
Write-Status "4️⃣  LOGIN COM:" "Info"
Write-Status "   Email: comprador@teste.com" "Info"
Write-Status "   Senha: password123" "Info"
Write-Status "" "Info"

Write-Status "Documentação:" "Info"
Write-Status "  - PLANO_EXECUCAO_NOVO_PC.md (Guia completo)" "Info"
Write-Status "  - GUIA_RAPIDO_AGENT.md (Referência rápida)" "Info"
Write-Status "  - DADOS_TESTE.md (Contas de teste)" "Info"
Write-Status "" "Info"

Write-Status "============================================" "Success"
Write-Status "Bom trabalho! 🚀" "Success"
Write-Status "============================================" "Success"

Write-Status "" "Info"
