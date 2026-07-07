# 🚀 Guia Passo a Passo: Como Configurar a Aplicação "Kitanda" num PC Novo

Bem-vindo(a)! Este guia foi escrito especialmente para quem está a começar e precisa de meter este projeto a funcionar num computador Windows novo, sem ter nenhuma ferramenta de programação instalada. 

Vamos fazer tudo passo a passo. Siga as instruções pela ordem apresentada.

---

## Passo 1: Instalar os Programas Essenciais

Antes de mexer no código, precisamos de instalar três programas base no computador:

### 1.1 Instalar o Python (O motor do Backend)
1. Vá ao site oficial: [python.org/downloads](https://www.python.org/downloads/)
2. Clique no botão amarelo "Download Python".
3. **⚠️ PASSO MUITO IMPORTANTE:** Quando abrir o instalador que descarregou, olhe para a parte inferior da janela. **Tem de marcar a caixa que diz "Add python.exe to PATH"** antes de clicar em "Install Now".
4. Deixe a instalação terminar.

### 1.2 Instalar o VS Code (O Editor de Código)
1. Vá ao site: [code.visualstudio.com](https://code.visualstudio.com/)
2. Descarregue a versão para Windows e instale clicando sempre em "Next" ou "Seguinte" até ao fim.

### 1.3 Instalar o PostgreSQL (A Base de Dados)
1. Vá a: [postgresql.org/download/windows](https://www.postgresql.org/download/windows/)
2. Clique em "Download the installer" e escolha a versão mais recente.
3. Durante a instalação, **vai pedir para definir uma password**. Defina uma password que não se esqueça (exemplo usado no código: `Ilevuosnof@!`).
4. Aceite as portas (5432) e configurações padrão.
5. Quando a instalação terminar, desmarque a caixa do "Stack Builder" e clique em Finish.

---

## Passo 2: Configurar a Base de Dados
Agora que instalou o PostgreSQL, precisamos de criar a base de dados onde a Kitanda vai guardar os utilizadores e produtos.

1. Pesquise no menu Iniciar do Windows por **"pgAdmin 4"** e abra o programa.
2. Vai pedir a password que configurou no passo anterior. Insira-a.
3. No lado esquerdo, clique na setinha ao lado de **Servers** > **PostgreSQL**.
4. Clique com o botão direito do rato em **Databases** -> **Create** -> **Database...**
5. No campo "Database", escreva exatamente: `kitanda_db`
6. Clique em **Save**. A base de dados está criada!

---

## Passo 3: Configurar o VS Code

1. Abra o VS Code.
2. No menu do lado esquerdo, clique no ícone de "Quadrados" (Extensões) ou prima `Ctrl + Shift + X`.
3. Na barra de pesquisa, procure e instale estas duas extensões clicando no botão azul "Install":
   * **Python** (Publicada pela Microsoft)
   * **Live Server** (Publicada por Ritwick Dey)

---

## Passo 4: Abrir e Preparar o Projeto

1. Mova a pasta inteira do projeto "Kitanda" para um local fácil (ex: Ambiente de Trabalho).
2. No VS Code, vá ao menu superior **File > Open Folder...** e selecione a pasta do seu projeto.
3. Agora precisamos de abrir o Terminal. Vá ao menu superior **Terminal > New Terminal**.
4. Vai ver um painel abrir-se na parte inferior. Aí, digite os seguintes comandos **um por um**, pressionando a tecla `Enter` após cada um:

**A. Entrar na pasta do backend:**
```bash
cd back-end
```

**B. Criar o ambiente virtual (uma bolha isolada para este projeto):**
```bash
python -m venv venv
```
*(Espere uns segundos até a pasta `venv` aparecer)*

**C. Ativar o ambiente virtual:**
```bash
.\venv\Scripts\activate
```
*(Se aparecer um `(venv)` a verde no terminal, significa que funcionou! Se der erro de permissão vermelha, ignore por agora, ou pesquise como permitir scripts no Powershell)*

**D. Instalar as bibliotecas da aplicação:**
```bash
pip install -r requirements.txt
```
*(Isto vai descarregar toda a "magia" da internet que faz o site funcionar. Pode demorar uns 2 minutinhos).*

---

## Passo 5: Configurar as Passwords (.env)

O sistema precisa de saber qual é a password da sua base de dados.

1. Dentro da pasta `back-end`, encontre um ficheiro chamado `.env`.
2. Abra-o no VS Code.
3. Vai ver uma linha assim:
   `DATABASE_URL=postgresql://postgres:Ilevuosnof%40!@localhost:5432/kitanda_db`
4. Se a password que colocou no Passo 1.3 foi diferente, substitua a parte `Ilevuosnof%40!` pela sua password. Se usou essa mesma, deixe ficar.

---

## Passo 6: Ligar o Motor! (Arrancar o Sistema)

O nosso projeto está dividido em duas partes: o motor (Backend) e a cara do site (Frontend). Temos de ligar os dois!

### 1. Ligar o Backend (Servidor de Dados)
No mesmo terminal onde instalou as coisas (com o `(venv)` a verde), digite:
```bash
uvicorn app.main:app --reload
```
Se vir a mensagem `Application startup complete.`, **o motor está ligado!** Não feche este terminal.

### 2. Ligar o Frontend (O Site)
1. No menu de pastas do lado esquerdo do VS Code, vá à pasta `front-end` -> `public`.
2. Encontre o ficheiro `index.html`.
3. Clique nele com o **botão direito do rato**.
4. Escolha a opção **"Open with Live Server"**.

🎉 **PARABÉNS!** O seu browser (Chrome/Edge) vai abrir automaticamente e o site da Kitanda estará a funcionar perfeitamente! 

---
> **Dica Extra:** Sempre que desligar o PC e quiser voltar a trabalhar no projeto, só precisa de repetir o **Passo 6**: abrir o terminal, fazer `cd back-end`, ativar com `.\venv\Scripts\activate`, correr o comando `uvicorn...`, e abrir o `index.html` com o Live Server!
