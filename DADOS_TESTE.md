# 🧪 Dados de Teste - Kitanda (Ambiente de Produção / Render)

Este documento contém a lista completa de todos os dados fictícios que foram inseridos na base de dados de produção para que possa testar todas as funcionalidades (Logins, Compras, Painel de Vendedor e Administração).

> Todas as contas abaixo partilham a mesma senha de acesso.
> **Senha Global de Teste:** `password123`

---

## 👤 Contas de Utilizador

### 1. Comprador Normal
Use esta conta para testar o carrinho de compras, fazer pedidos e conversar com vendedores.
* **Nome:** João Comprador
* **Email:** `comprador@teste.com`
* **Localização:** Luanda, Talatona, Morro Bento

### 2. Vendedor Individual
Use esta conta para aceder ao Painel de Vendedor, gerir os produtos da loja "Loja da Maria" e ver pedidos recebidos.
* **Nome:** Maria Vendedora
* **Email:** `vendedor@teste.com`
* **Nome da Loja:** Loja da Maria *(Moda e acessórios feitos à mão)*
* **Localização:** Luanda, Belas, Kilamba

### 3. Vendedor Empresarial
Use esta conta para aceder ao Painel de Vendedor de uma empresa de tecnologia. Esta conta possui tanto **produtos** como **serviços**.
* **Nome:** Admin Tech Lda
* **Email:** `empresa@teste.com`
* **Nome da Loja:** Tech Angola Lda *(Tudo em informática e reparação)*
* **Localização:** Benguela, Lobito, Restinga

### 4. Administrador do Sistema
Use esta conta (futuramente) para gerir a plataforma de forma global.
* **Nome:** Administrador Kitanda
* **Email:** `admin@kitanda.com`

---

## 📦 Produtos Adicionados

Estes são os produtos que aparecem na página Explorar.

| Produto | Vendedor | Categoria | Preço (Kz) | Stock |
| :--- | :--- | :--- | :--- | :--- |
| **Vestido Samakaka** | Loja da Maria | Moda | 15.000,00 | 10 |
| **Bolsa de Couro** | Loja da Maria | Moda | 25.000,00 | 5 |
| **Portátil Asus i7** | Tech Angola Lda | Tecnologia | 650.000,00 | 3 |
| **Rato Sem Fios** | Tech Angola Lda | Tecnologia | 12.000,00 | 50 |

---

## 🛠️ Serviços Adicionados

Estes são os serviços disponíveis para contratação através do sistema.

| Serviço | Empresa | Categoria | Preço Base (Kz) | Duração Estimada |
| :--- | :--- | :--- | :--- | :--- |
| **Formatação de PC** | Tech Angola Lda | Reparações | 15.000,00 | 2h |
| **Reparação de Telemóveis** | Tech Angola Lda | Reparações | 20.000,00 | 1 dia |

---
*Estes dados foram gerados automaticamente através do ficheiro `create_test_data.py` e populados diretamente na base de dados conectada ao Render.*
