# BB-Guia — FAQ Dinâmica para Comunidades Indígenas

WebApp construído com **Preact**, **Vite**, **MongoDB**, **Backblaze B2** e hospedado na **Vercel**.

## 📌 Descrição

O **BB-Guia** é um webapp que funciona como uma FAQ dinâmica de tutoriais relacionados a serviços ofertados pelo **Banco do Brasil**.

O diferencial do projeto é permitir que **mulheres de comunidades indígenas** possam contribuir com **áudios** que traduzem e explicam os tutoriais do português para suas línguas nativas, fortalecendo o acesso à informação de forma inclusiva.

### Objetivos do projeto
- Explicações acessíveis  
- Tradução colaborativa  
- Suporte em áudio  
- Fácil navegação e entendimento  

## 🚀 Tecnologias utilizadas

- **Preact** — Framework leve baseado em React  
- **Vite** — Ferramenta de build e servidor de desenvolvimento rápido  
- **MongoDB** — Banco de dados NoSQL utilizado pela API  
- **Backblaze B2** — Armazenamento em nuvem compatível com S3 para áudios  
- **Vercel** — Hospedagem do front-end  
- **Node.js/Express** (na API que acompanha o projeto)

## 📂 Como rodar o projeto

1. **Baixar o projeto**  
   Clone o repositório ou baixe o ZIP.

2. **Acessar a pasta**
   ```bash
   cd BB-Guia
   ```

3. **Instalar dependências**
   ```bash
   npm install
   ```

4. **Rodar o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

   Após isso, o Vite abrirá o projeto localmente (geralmente em http://localhost:5173).

## 🧩 Estrutura básica do webapp

- Lista de serviços e tutoriais  
- Página individual de tutorial (`/tutorial/:id`)  
- Possibilidade de anexar e ouvir áudios enviados  
- Interface minimalista e rápida usando Preact + Vite  
- Integração com API para carregar dados e áudios salvos no Backblaze B2  

## 🤝 Contribuições

Sugestões e melhorias são bem-vindas!  
Este projeto busca promover **inclusão e acessibilidade** para comunidades indígenas — qualquer apoio é valioso.
