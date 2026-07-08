# 🚀 Guia Passo a Passo: Fazer o Deploy do Backend no Render

Parabéns por já ter colocado o frontend na Vercel! Agora vamos colocar o "motor" (o Backend) na internet usando o **Render**, e ligar os dois!

Siga este passo a passo com muita atenção:

---

## 1. Preparar o Código no GitHub
Para o Render conseguir ler o seu código, ele precisa de estar no GitHub.
1. Certifique-se de que a pasta inteira do seu projeto (que contém a pasta `back-end` e `front-end`) está carregada no seu repositório do GitHub.
2. O ficheiro `requirements.txt` tem de estar dentro da pasta `back-end`.

---

## 2. Criar a Base de Dados (Online)
O seu backend precisa de uma base de dados que esteja na internet, porque o "localhost" só funciona no seu PC.
1. Crie uma conta no **Render** ([render.com](https://render.com/)).
2. No painel (Dashboard), clique no botão **New +** e escolha **PostgreSQL**.
3. Dê um nome (ex: `kitanda-db`), escolha a região mais próxima e avance no plano Gratuito (Free).
4. Quando a base de dados for criada, role a página até ver as "Connections".
5. Copie o valor que está em **Internal Database URL** (vamos precisar disto no passo seguinte).

---

## 3. Fazer o Deploy do Backend (Web Service)
Agora vamos colocar o código Python no ar.
1. No painel do Render, clique novamente em **New +** e escolha **Web Service**.
2. Ligue a sua conta do GitHub e selecione o repositório da "Kitanda".
3. Nas configurações do Web Service, preencha EXATAMENTE assim:
   * **Name:** `kitanda-api` (ou outro nome à sua escolha)
   * **Language:** `Python 3`
   * **Root Directory:** `back-end` *(Isto é super importante porque o seu backend está dentro desta subpasta)*
   * **Build Command:** `pip install -r requirements.txt`
   * **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port 10000`
   * **Instance Type:** `Free`

4. Não clique logo em "Create"! Role a página para baixo e clique em **Advanced** -> **Add Environment Variable**. Adicione estas variáveis:
   * **Key:** `DATABASE_URL` | **Value:** Cole aqui o "Internal Database URL" que copiou no Passo 2.
   * **Key:** `SECRET_KEY` | **Value:** Escreva uma palavra passe aleatória (ex: `super-secreta-2026`)
   * **Key:** `PYTHON_VERSION` | **Value:** `3.12.0` (Opcional, ajuda a evitar erros de versão)

5. Clique em **Create Web Service**. 
6. O Render vai começar a instalar o seu código (pode demorar uns 5 minutos). Quando vir verde dizendo "Live", copie o link que aparece no topo esquerdo (ex: `https://kitanda-api-xxxxx.onrender.com`).

---

## 4. Ligar a Vercel (Frontend) ao Render (Backend)
O seu frontend na Vercel ainda está a tentar falar com `http://localhost:8000`. Temos de o avisar que o backend mudou de morada!

1. No seu VS Code, vá ao ficheiro: `front-end/public/js/api.js`.
2. Logo na linha 5, vai ver:
   ```javascript
   const API_BASE_URL = 'http://localhost:8000/api/v1';
   ```
3. Mude para o link novo que o Render lhe deu (não se esqueça de manter o `/api/v1` no fim):
   ```javascript
   const API_BASE_URL = 'https://o-seu-link-do-render.onrender.com/api/v1';
   ```
4. Salve o ficheiro.

---

## 5. Último Passo: Re-Deploy na Vercel
1. Agora que mudou o ficheiro `api.js`, faça um commit e envie (`git push`) essa alteração para o GitHub.
2. A **Vercel vai detetar a alteração automaticamente** e fazer um novo deploy do seu frontend.
3. Assim que a Vercel terminar, abra o seu site `https://byclick-20.vercel.app/` e teste fazer o registo de um utilizador!

> **⚠️ Atenção (Cold Starts no Render):** Como o Render é gratuito, se ficar 15 minutos sem receber ninguém, o backend "adormece". O primeiro clique no site pode demorar uns 30 a 50 segundos a responder, mas depois fica rápido. É perfeitamente normal!
