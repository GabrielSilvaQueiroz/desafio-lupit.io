# Projeto de Cadastro de Jogadores

Este é um projeto de cadastro de jogadores desenvolvido com Nest.js no backend e Next.js no frontend. O sistema permite a criação, edição e exclusão de registros de jogadores, além de armazenar informações importantes sobre cada jogador.

## Pré-requisitos

Certifique-se de ter o Node.js instalado em sua máquina. Em seguida, instale globalmente o Nest.js com o seguinte comando:


npm i -g @nestjs/cli

# Configuração do Backend

Abra a pasta do backend: cd backend

Instale as dependências: npm i

Crie um arquivo .env baseado no exemplo fornecido (.env.exemple) e configure corretamente a string de conexão para o banco de dados MySQL.

Execute as migrações do Prisma para vincular o modelo ao banco de dados: npx prisma migrate dev

Inicie o servidor backend: npm run start:dev

O backend estará rodando em http://localhost:3001

## Observações do Backend
Certifique-se de ter um banco de dados MySQL instalado localmente, rodando na porta 3306.
O Prisma utiliza um arquivo .env para a string de conexão com o banco de dados. Certifique-se de criar esse arquivo e configurá-lo corretamente.

# Configuração do Frontend

Abra a pasta do frontend: cd frontend

Instale as dependências: npm i

Inicie o servidor frontend:npm run dev

O frontend estará acessível em http://localhost:3000

Aproveite o projeto de cadastro de jogadores!