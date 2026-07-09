# 📑 ÍNDICE COMPLETO - Documentação de Setup Kitanda

> **Bem-vindo!** Este arquivo ajuda-o a escolher o documento certo para sua situação.

---

## 🎯 Escolha Sua Situação

### 👤 Sou novo no projeto e não tenho nada instalado

**Tempo estimado:** 50 minutos

```
┌─ LEIA PRIMEIRO ──────────────────────────────┐
│                                              │
│ 📄 GUIA_CONFIGURACAO.md                     │
│    Passo a passo para iniciantes             │
│    - Instalar Python, Git, PostgreSQL       │
│    - Setup básico                            │
│                                              │
└──────────────────────────────────────────────┘

       DEPOIS, CONTINUE COM:

┌─ LEIA SEGUNDO ───────────────────────────────┐
│                                              │
│ 📄 PLANO_EXECUCAO_NOVO_PC.md                 │
│    Guia completo e estruturado              │
│    - 8 fases detalhadas                     │
│    - Verificações em cada etapa             │
│    - Resolução de 10+ erros comuns          │
│                                              │
└──────────────────────────────────────────────┘

       SE FICAR COM DÚVIDAS:

📄 MAPA_VISUAL_SETUP.md
   - Diagramas e fluxos
   - Troubleshooting em profundidade
   - Checklist visual
```

---

### ⚡ Sou dev experiente, quero setup rápido

**Tempo estimado:** 30 minutos

```
OPÇÃO A - VIA SCRIPT AUTOMÁTICO:

🔧 setup_kitanda.ps1

Executar:
  PowerShell (como Administrador)
  .\setup_kitanda.ps1

Faz automaticamente:
  ✓ Verifica pré-requisitos
  ✓ Clone repositório
  ✓ Setup backend
  ✓ Cria BD
  ✓ Popula com dados
  ✓ Dá instruções finais

───────────────────────────────────────────

OPÇÃO B - MANUALMENTE MAS RÁPIDO:

📄 GUIA_RAPIDO_AGENT.md

Contém:
  ✓ Sequência de comandos prontos
  ✓ Copy-paste do terminal
  ✓ Tabelas de referência
  ✓ Troubleshooting rápido
```

---

### 🤖 Sou um Agent/Automação executando setup

**Tempo estimado:** 15-30 minutos (totalmente automático)

```
┌─ EXECUTE SCRIPT ─────────────────────────────┐
│                                              │
│ 🔧 setup_kitanda.ps1                        │
│                                              │
│    powershell -ExecutionPolicy Bypass       │
│    -File setup_kitanda.ps1                  │
│                                              │
└──────────────────────────────────────────────┘

       SE SCRIPT FALHAR:

📄 GUIA_RAPIDO_AGENT.md

  Contém sequência exata de comandos
  Para executar em terminal
  Linha por linha
```

---

### 🐛 Estou com um erro específico

**Vá direto para troubleshooting:**

```
1️⃣  Procure seu erro em:
    📄 MAPA_VISUAL_SETUP.md
       Seção: "🚨 Troubleshooting Detalhado"

2️⃣  Não encontrou?
    📄 PLANO_EXECUCAO_NOVO_PC.md
       Seção: "FASE 7: Resolver Problemas Comuns"

3️⃣  Ainda sem solução?
    - Tente: python check_db.py
    - Verifique: .env está correto?
    - Reinicie: PostgreSQL, Backend, Frontend
    - Nuclear: Delete venv, BD, recrie do zero
```

---

### 📚 Quero entender a arquitetura completa

```
📄 MAPA_VISUAL_SETUP.md

Leia:
  - "Fluxo Geral da Aplicação" (diagrama)
  - "Árvore de Ficheiros Importante" (estrutura)
  - "Sequência de Inicialização" (fluxo passo-a-passo)
```

---

### 🌐 Preciso fazer deploy em produção

```
📄 GUIA_DEPLOY_RENDER.md

Contém:
  ✓ Deploy no Render
  ✓ Variáveis de ambiente produção
  ✓ Migração de BD em produção
  ✓ HTTPS, domínio, etc.
```

---

### 🧪 Quero testar com dados fictícios

```
📄 DADOS_TESTE.md

Contas de teste pré-criadas:
  - comprador@teste.com / password123
  - vendedor@teste.com / password123
  - empresa@teste.com / password123
  - admin@kitanda.com / password123

Produtos, pedidos, etc., já inseridos.

Para popular BD:
  python seed_render.py
```

---

## 📚 Todos os Documentos

### 1. 🚀 **GUIA_CONFIGURACAO.md**

- **Para:** Iniciantes, setup do zero
- **Tempo:** 30-45 minutos
- **Conteúdo:**
  - Instalar Python, Git, PostgreSQL, VS Code
  - Criar venv
  - Instalar dependências
  - Configurar .env
  - Iniciar servidores

### 2. 📋 **PLANO_EXECUCAO_NOVO_PC.md**

- **Para:** Detalhamento completo, agentes, devs
- **Tempo:** 50 minutos (leitura + execução)
- **Conteúdo:**
  - 8 fases estruturadas
  - Explicações técnicas profundas
  - 10+ erros comuns e soluções
  - Checklist de conclusão
  - Tempos realistas por fase

### 3. ⚡ **GUIA_RAPIDO_AGENT.md**

- **Para:** Dev experiente, setup rápido
- **Tempo:** 30 minutos
- **Conteúdo:**
  - Comandos prontos para copiar
  - Sequência resumida
  - Tabelas de referência
  - Troubleshooting conciso

### 4. 🎯 **MAPA_VISUAL_SETUP.md**

- **Para:** Compreender fluxo, resolver problemas
- **Tempo:** 20 minutos leitura
- **Conteúdo:**
  - Diagramas ASCII da arquitetura
  - Árvore de ficheiros visual
  - Troubleshooting detalhado (10+ cenários)
  - Checklist visual
  - Tempos realistas

### 5. 🔧 **setup_kitanda.ps1**

- **Para:** Automação total
- **Tempo:** 20 minutos (execução automática)
- **Conteúdo:**
  - Script PowerShell que faz tudo
  - Verificação pré-requisitos
  - Download + setup automático
  - Cria BD, migrações, seed dados

### 6. 📄 **DADOS_TESTE.md**

- **Para:** Entender dados fictícios
- **Tempo:** 5 minutos leitura
- **Conteúdo:**
  - 4 contas de teste
  - 4 produtos de exemplo
  - Instruções login

### 7. 🌐 **GUIA_DEPLOY_RENDER.md**

- **Para:** Deploy em produção
- **Tempo:** 30 minutos
- **Conteúdo:**
  - Setup no Render
  - Variáveis produção
  - Migração BD
  - HTTPS, domínio

---

## 🎓 Fluxo de Aprendizado Recomendado

```
Primeira Vez (Nunca programou)
│
├─ Ler: GUIA_CONFIGURACAO.md (20 min)
├─ Fazer: Seguir passo-a-passo (30 min)
├─ Testar: Login e exploração (10 min)
├─ Compreender: MAPA_VISUAL_SETUP.md (15 min)
└─ Pronto: ~75 minutos total


Dev com Experiência (Mas novo no projeto)
│
├─ Ler: PLANO_EXECUCAO_NOVO_PC.md (20 min, apenas skim)
├─ Executar: GUIA_RAPIDO_AGENT.md (30 min)
├─ Testar: Login (5 min)
├─ Dúvidas: MAPA_VISUAL_SETUP.md conforme necessário
└─ Pronto: ~50 minutos total


Agent/Automação
│
├─ Executar: setup_kitanda.ps1 (20 min)
├─ Verificar: Output do script
├─ Testar: Backend em http://localhost:8000/docs
├─ Testar: Frontend em http://127.0.0.1:5500
└─ Pronto: ~20 minutos total
```

---

## 🔗 Relações Entre Documentos

```
                    VOCÊ COMEÇA AQUI
                           │
                           ▼
                    ┌─────────────┐
                    │   SITUAÇÃO  │
                    │   INICIAL?  │
                    └─────────────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
            ▼              ▼              ▼
        INICIANTE     DEV EXP.      AGENT/AUTO
            │              │              │
            ▼              ▼              ▼
    GUIA_CONFIG    GUIA_RAPIDO    setup_kitanda
            │              │              │
            └──────────────┼──────────────┘
                           │
                    ┌──────▼──────┐
                    │   EM DÚVIDA?│
                    └──────┬──────┘
                           ▼
                   MAPA_VISUAL_SETUP
                   (Troubleshooting)
                           │
            ┌──────────────┼──────────────┐
            │              │              │
            ▼              ▼              ▼
        CONTINUOU  TESTES PASSARAM  PRECISA
        COM ERRO      MAS PROD?      DEPLOY?
            │              │              │
            └──────┬───────┘              ▼
                   │          GUIA_DEPLOY_RENDER
                   │                     │
                   ▼                     ▼
            PLANO_EXECUCAO      ✓ PRODUÇÃO OK
            (Detalhes)
                   │
                   ▼
            ✓ DESENVOLVIMENTO OK
```

---

## 🎯 Checklist de Navegação

Quando ler cada documento:

```
□ PRIMEIRA VEZ NO PROJETO?
  └─ Ler: GUIA_CONFIGURACAO.md

□ INSTALOU TUDO E QUER MAIS DETALHES?
  └─ Ler: PLANO_EXECUCAO_NOVO_PC.md

□ QUER FAZER RÁPIDO?
  └─ Executar: setup_kitanda.ps1
     ou
     Ler: GUIA_RAPIDO_AGENT.md

□ TEM UM ERRO?
  └─ Ir para: MAPA_VISUAL_SETUP.md → Troubleshooting

□ TUDO FUNCIONA, QUER ENTENDER MELHOR?
  └─ Ler: MAPA_VISUAL_SETUP.md

□ PRECISA FAZER DEPLOY?
  └─ Ler: GUIA_DEPLOY_RENDER.md

□ QUER USAR DADOS DE TESTE?
  └─ Ler: DADOS_TESTE.md
     Executar: python seed_render.py
```

---

## 💡 Dicas Importantes

### 📌 Ordem Recomendada (Geral)

1. **Comece aqui:** Este documento (ÍNDICE)
2. **Depois:** GUIA_CONFIGURACAO.md ou PLANO_EXECUCAO_NOVO_PC.md
3. **Se erros:** MAPA_VISUAL_SETUP.md
4. **Se produção:** GUIA_DEPLOY_RENDER.md

### ⚡ Atalho para Devs

```
setup_kitanda.ps1 → GUIA_RAPIDO_AGENT.md → MAPA_VISUAL_SETUP.md
```

### 🤖 Para Agents/Scripts

```
setup_kitanda.ps1 (automático)
└─ Saída informa próximos passos
```

### 🆘 Se Ficar Preso

1. Procure erro em: **MAPA_VISUAL_SETUP.md**
2. Não encontrou? Leia: **PLANO_EXECUCAO_NOVO_PC.md**
3. Ainda preso? Limpe tudo e comece do zero (30 min)

---

## 📞 Estrutura de Ficheiros

```
Kitanda/
├── 📄 [ESTE ARQUIVO] ← ÍNDICE_DOCUMENTACAO.md
├── 📄 GUIA_CONFIGURACAO.md
├── 📄 PLANO_EXECUCAO_NOVO_PC.md
├── 📄 GUIA_RAPIDO_AGENT.md
├── 📄 MAPA_VISUAL_SETUP.md
├── 🔧 setup_kitanda.ps1
├── 📄 DADOS_TESTE.md
├── 📄 GUIA_DEPLOY_RENDER.md
│
├── 📁 back-end/
│   ├── .env (CREATE)
│   ├── venv/ (CREATE)
│   ├── requirements.txt
│   ├── alembic/ (migrações)
│   └── app/
│
└── 📁 front-end/public/
    ├── index.html
    ├── js/api.js (verificar!)
    └── ...
```

---

## 🚀 Iniciar Agora

```
Você está aqui → ÍNDICE_DOCUMENTACAO.md

PRÓXIMO PASSO:

1. Se PRIMEIRO TEMPO → GUIA_CONFIGURACAO.md
2. Se EXPERIENTE → GUIA_RAPIDO_AGENT.md
3. Se AGENT → Execute: setup_kitanda.ps1
4. Se TEM ERRO → MAPA_VISUAL_SETUP.md
```

---

**Atualizado:** 2026-07-09  
**Versão:** 1.0  
**Manutenedor:** Kitanda Dev Team
