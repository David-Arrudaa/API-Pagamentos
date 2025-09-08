# API de Pagamentos com Node.js e Stripe 🚀

<p align="center">
<img src="https://img.shields.io/badge/Status-Em Construção-orange?style=for-the-badge" alt="Status do Projeto: Em Construção"/>
</p>

## 📖 Sobre o Projeto

Este projeto é uma API de pagamentos desenvolvida em **Node.js** com **Express**. A API integra-se com a plataforma **Stripe** para processar transações de cartão de crédito em um ambiente de teste.

O objetivo foi construir um back-end robusto, seguindo uma arquitetura em camadas para separação de responsabilidades, com validação de dados de entrada e autenticação de acesso via API Key.

## 🛠️ Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias Back-End:

<p align="left">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma"/>
  <img src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe"/>
  <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite"/>
</p>

## ✨ Funcionalidades Principais

- **Processamento de Pagamentos:** Integração com a **Stripe** para processar pagamentos de teste com cartão de crédito.
- **Arquitetura em Camadas:** Código organizado em `Routes`, `Controllers` e `Services` para uma melhor manutenção e escalabilidade.
- **Autenticação via API Key:** Proteção dos endpoints, exigindo uma chave de API válida para autorizar as requisições.
- **Validação de Dados:** Utilização da biblioteca **Zod** para validar os dados de entrada, garantindo a integridade das informações antes do processamento.
- **Persistência de Dados com Prisma:** Gerenciamento do banco de dados **SQLite** através do ORM Prisma para salvar e consultar informações.

## 🚀 Como Executar

1.  **Clone este repositório.**
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Configure as variáveis de ambiente:**
    - Renomeie o arquivo `.env.example` para `.env`.
    - Preencha as chaves da Stripe e outras informações necessárias no arquivo `.env`.
4.  **Crie e migre o banco de dados:**
    ```bash
    npx prisma migrate dev
    ```
5.  **Inicie o servidor:**
    ```bash
    node index.js
    ```

## 👨‍💻 Autor

**David Arruda**.

### 📫 Onde me encontrar

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/david-viniciusarruda/)
[![Email](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:david.viniciusarruda@gmail.com)
