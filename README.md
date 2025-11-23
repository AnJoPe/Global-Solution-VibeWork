# VibeWork

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=20232A)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Status](https://img.shields.io/badge/Status-Completo-brightgreen?style=for-the-badge)
![Responsivo](https://img.shields.io/badge/Responsivo-Sim-brightgreen?style=for-the-badge)

---

## 1. Título e Descrição

**VibeWork** - Plataforma de Gestão de Bem-estar e Produtividade

Criar uma plataforma web para gestão de bem-estar e produtividade em ambientes corporativos. O projeto busca oferecer uma experiência visual agradável, organizada e responsiva, permitindo que colaboradores registrem seu bem-estar diário, gerenciem sua agenda de trabalho e visualizem relatórios de produtividade.

---

## 2. Status do Projeto

- ✅ Completo
- ✅ Responsivo

---

## 3. Sumário

1. [Título e Descrição](#1-título-e-descrição)
2. [Status do Projeto](#2-status-do-projeto)
3. [Sumário](#3-sumário)
4. [Sobre o Projeto](#4-sobre-o-projeto)
5. [Tecnologias Utilizadas](#5-tecnologias-utilizadas)
6. [Instalação](#6-instalação)
7. [Como Usar](#7-como-usar)
8. [Estrutura de Pastas](#8-estrutura-de-pastas)
9. [Endpoints ou Rotas Principais](#9-endpoints-ou-rotas-principais)
10. [Autores e Créditos](#10-autores-e-créditos)
11. [Screenshots / Demonstração](#11-screenshots--demonstração)
12. [Contato](#12-contato)

---

## 4. Sobre o Projeto

O projeto VibeWork foi desenvolvido como desafio da Global Solution 2025 pela FIAP. A plataforma permite que colaboradores gerenciem seu bem-estar diário através de check-ins, organizem sua agenda de trabalho com um calendário integrado e visualizem relatórios de produtividade.

---

## 5. Tecnologias Utilizadas

- **Vite** – Configuração inicial e execução do projeto
- **React** – Criação dos componentes da interface
- **TypeScript** – Tipagem e organização do código
- **Tailwind CSS** – Estilização responsiva com classes utilitárias
- **React Big Calendar** – Calendário integrado
- **date-fns** – Manipulação de datas
- **EmailJS** – Envio de emails
- **API Java (Quarkus)** – Backend conectado com Oracle Database
- **Render (Docker)** – Hospedagem da API
- **Vercel** – Hospedagem do Frontend

---

## 6. Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/AnJoPe/Global-Solution-VibeWork.git
   cd Global-Solution-VibeWork
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Acesse no navegador o endereço indicado pelo Vite (geralmente http://localhost:5173).

---

## 7. Como Usar

Acesse a aplicação em produção: [https://gs-vibework.vercel.app/](https://gs-vibework.vercel.app/)

Ou rode localmente seguindo a seção de [Instalação](#6-instalação).

---

## 8. Estrutura de Pastas e Arquivos

```
|-- public
|   |-- Icons
|   |   |-- 1.svg
|   |   |-- 2.svg
|   |   |-- 3.svg
|   |   |-- 4.svg
|   |   |-- 5.svg
|   |   |-- check.svg
|   |   |-- chevron-down.svg
|   |   |-- circle-user.svg
|   |   |-- github.svg
|   |   |-- house.svg
|   |   |-- info.svg
|   |   |-- linkedin.svg
|   |   |-- log-in.png
|   |   |-- log-out.svg
|   |   |-- mail.png
|   |   |-- menu.svg
|   |   |-- moon.svg
|   |   |-- notepad-text.svg
|   |   |-- portal_paciente_azul_icon.svg
|   |   |-- panel-left-close.svg
|   |   |-- send.svg
|   |   |-- sun.svg
|   |   |-- user-pen.svg
|   |   |-- user-plus.svg
|   |   |-- user.svg
|   |   |-- users.svg
|   |   |-- VibeWork.svg
|   |   `-- x.svg
|   |-- Integrantes
|   |   |-- andre_rosa.png
|   |   |-- jose_diogo.png
|   |   `-- pedro_miranda.png
|   |-- Screenshots
|   |   |-- cadastro.png
|   |   |-- contato.png
|   |   |-- homeDashboard.png
|   |   |-- integrantes.png
|   |   |-- login.png
|   |   |-- perfil.png
|   |   |-- relatorios.png
|   |   `-- sobre.png
|   `-- favicon.svg
|-- src
|   |-- Components
|   |   |-- Cards
|   |   |   |-- CardBemEstar.tsx
|   |   |   |-- CardEvento.tsx
|   |   |   `-- CardProdutividade.tsx
|   |   |-- Conteudo
|   |   |   `-- Conteudo.tsx
|   |   |-- Header
|   |   |   `-- Header.tsx
|   |   |-- Integrante
|   |   |   `-- Integrante.tsx
|   |   |-- Navbar
|   |   |   `-- Navbar.tsx
|   |   |-- Pergunta
|   |   |   `-- Pergunta.tsx
|   |   |-- Sidebar
|   |   |   `-- Sidebar.tsx
|   |   `-- Tema
|   |       `-- Tema.tsx
|   |-- Context
|   |   |-- SidebarContext.tsx
|   |   `-- ThemeContext.tsx
|   |-- Pages
|   |   |-- Cadastro
|   |   |   `-- Cadastro.tsx
|   |   |-- Contato
|   |   |   `-- Contato.tsx
|   |   |-- Home
|   |   |   `-- Home.tsx
|   |   |-- Integrantes
|   |   |   `-- Integrantes.tsx
|   |   |-- Login
|   |   |   `-- Login.tsx
|   |   |-- Perfil
|   |   |   `-- Perfil.tsx
|   |   |-- Relatorios
|   |   |   `-- Relatorios.tsx
|   |   `-- Sobre
|   |       `-- Sobre.tsx
|   |-- Types
|   |   |-- CalendarEvent.ts
|   |   |-- Relatorios.ts
|   |   `-- UsuarioType.ts
|   |-- App.tsx
|   |-- index.css
|   `-- main.tsx
|-- .gitignore
|-- eslint.config.js
|-- index.html
|-- package-lock.json
|-- package.json
|-- README.MD
|-- tailwind.config.js
|-- tsconfig.app.json
|-- tsconfig.json
|-- tsconfig.node.json
`-- vite.config.ts
```

---

## 9. Endpoints ou Rotas Principais

### Rotas Frontend

- `/` – Home (Dashboard com calendário)
- `/login` – Login
- `/cadastro` – Cadastro
- `/perfil` – Perfil do usuário
- `/perfil/:id` – Perfil específico
- `/relatorios` – Relatórios
- `/sobre` – Sobre o projeto
- `/integrantes` – Equipe
- `/contato` – Contato

### Endpoints Backend (API Java)

- **POST** `/api/usuarios/registrar` – Criar usuário
- **POST** `/api/usuarios/login` – Login
- **GET** `/api/usuarios/{id}` – Obter usuário
- **GET** `/api/evento_calendario/{userId}` – Listar eventos
- **POST** `/api/evento_calendario` – Criar evento
- **PUT** `/api/evento_calendario` – Atualizar evento
- **DELETE** `/api/evento_calendario/{id}` – Deletar evento
- **GET** `/api/relatorio_bem_estar/{userId}` – Relatórios bem-estar
- **POST** `/api/relatorio_bem_estar` – Criar check-in
- **GET** `/api/relatorio_produtividade/{userId}` – Relatórios produtividade

---

## 10. Autores e Créditos

- **André Rosa Colombo**
- **José Diogo da Silva Neves**
- **Pedro Henrique M. de Vasconcelos**

---

## 11. Screenshots / Demonstração

Screenshots do projeto em: `./public/Screenshots/`

---

## 12. Contato

- **André Rosa Colombo** – RM: 563112 | Turma: 1TDSA | [GitHub](https://github.com/AndreColombo) | [LinkedIn](https://www.linkedin.com/in/andrerosacolombo)
- **José Diogo da Silva Neves** – RM: 562341 | Turma: 1TDSA | [GitHub](https://github.com/ZeDio) | [LinkedIn](https://www.linkedin.com/in/jos%C3%A9-diogo-d-33634b280)
- **Pedro Henrique M. de Vasconcelos** – RM: 562682 | Turma: 1TDSA | [GitHub](https://github.com/pmiranda27) | [LinkedIn](https://www.linkedin.com/in/pedro-henrique-miranda-de-vasconcelos/)

---

## 🔗 Repositório no GitHub

📁 Acesse o repositório completo do projeto:  
[https://github.com/AnJoPe/Global-Solution-VibeWork](https://github.com/AnJoPe/Global-Solution-VibeWork)

---

## 🔗 Projeto na Vercel

📁 Acesse o projeto pela Vercel:  
[https://gs-vibework.vercel.app/](https://gs-vibework.vercel.app/)

---

## 🔗 Apresentação no YouTube

📽️ Acesse a apresentação do projeto:  
[]()

---
