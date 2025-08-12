# Gerenciador de Projetos Fullstack

Este é um aplicativo fullstack simples para gerenciar projetos e suas tarefas associadas. Ele é construído com um backend em **Node.js/Express** e um frontend em **React**, ambos utilizando **TypeScript** para maior segurança e escalabilidade.

## 🚀 Tecnologias Utilizadas

### Backend
* **Node.js**: Ambiente de execução.
* **Express**: Framework para a API REST.
* **TypeScript**: Linguagem de programação para tipagem estática.
* **SQLite3**: Banco de dados relacional leve e sem servidor.
* **Jest**: Framework de testes unitários.
* **ts-node**: Para executar arquivos TypeScript diretamente no Node.js.
* **CORS**: Para permitir requisições do frontend.

### Frontend
* **React**: Biblioteca para a interface do usuário.
* **Vite**: Ferramenta de build otimizada e rápida.
* **TypeScript**: Linguagem de programação para tipagem estática.
* **Vitest**: Framework de testes unitários otimizado para o Vite.
* **React Testing Library**: Biblioteca para testar componentes React.

## 🏗️ Arquitetura do Projeto

O projeto segue uma arquitetura modular e dividida, com o frontend e o backend em pastas separadas (`frontend` e `backend`).

* **Backend (`backend/`)**: A API REST é estruturada com o padrão **MVC (Model-View-Controller)** de forma simplificada:
    * **`src/db.ts`**: Lida com a conexão e a criação do banco de dados (o "Modelo" de forma simplificada).
    * **`src/controllers/`**: Contém a lógica de negócio para manipular os dados dos projetos (os "Controladores").
    * **`src/routes/`**: Define as rotas da API e as associa aos controladores.
    * **`src/server.ts`**: O ponto de entrada principal do servidor.

* **Frontend (`frontend/`)**: O frontend é um aplicativo de página única (SPA) com um único componente principal, **`App.tsx`**, que gerencia o estado da aplicação e interage com a API do backend.

## 🧩 Decisões de Design e Arquitetura

1.  **TypeScript**: Foi escolhido para ambos os lados do projeto para garantir a segurança do tipo, melhorar a manutenibilidade do código e facilitar o desenvolvimento em equipe.
2.  **SQLite**: A escolha por um banco de dados leve e sem servidor foi feita para simplificar o setup do projeto. Não há necessidade de configurar um servidor de banco de dados externo, tornando o projeto mais fácil de ser clonado e executado por outros desenvolvedas.
3.  **Vite e React**: A combinação Vite + React foi escolhida por sua velocidade de build, hot reloading rápido e um ecossistema moderno e performático.
4.  **Testes (Jest e Vitest)**: Optamos por frameworks de teste diferentes para cada parte do projeto para aproveitar as melhores ferramentas de cada ecossistema:
    * **Jest** é o padrão da indústria para testes de Node.js, com um ecossistema maduro e ferramentas de mocking poderosas.
    * **Vitest** foi escolhido para o frontend porque é otimizado para o Vite, resultando em testes mais rápidos e uma configuração mais simples.

## ⚙️ Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente. Você precisará de dois terminais abertos, um para cada parte do projeto.

### Backend

1.  Navegue até a pasta do backend:
    ```bash
    cd backend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor em modo de desenvolvimento. O servidor rodará na porta `3000`.
    ```bash
    npm run dev
    ```

### Frontend

1.  Abra um **novo terminal** e navegue até a pasta do frontend:
    ```bash
    cd frontend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie a aplicação React em modo de desenvolvimento. A aplicação estará disponível em `http://localhost:5173`.
    ```bash
    npm run dev
    ```

## 🌐 Endpoints da API

A API REST do backend oferece os seguintes endpoints para gerenciamento de projetos. A base da URL é `http://localhost:3000/api/projects`.

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/projects` | Lista todos os projetos. |
| `POST` | `/api/projects` | Cria um novo projeto. |
| `GET` | `/api/projects/:id` | Retorna os detalhes de um projeto específico. |
| `PUT` | `/api/projects/:id` | Atualiza um projeto existente. |
| `DELETE`| `/api/projects/:id` | Exclui um projeto. |

## ✅ Como Rodar os Testes

### Testes do Backend (Jest)

1.  Abra o terminal na pasta `backend`.
2.  Execute o comando:
    ```bash
    npm test
    ```

### Testes do Frontend (Vitest)

1.  Abra o terminal na pasta `frontend`.
2.  Execute o comando:
    ```bash
    npm test
    ```

## ⏭️ Próximos Passos

Este projeto pode ser expandido com as seguintes funcionalidades:
* Implementação de tarefas (`tasks`) para cada projeto.
* Autenticação e autorização de usuários.
* Adicionar um banco de dados mais robusto, como PostgreSQL ou MySQL.
* Melhorar a interface do usuário com componentes mais interativos e um design mais sofisticado.
* Implementar CI/CD para automatizar o deploy."# Gerenciador-de-Projetos" 
