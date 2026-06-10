# Álbum de Figurinhas da Copa

## Sobre o Projeto
O **Álbum de Figurinhas da Copa** é uma aplicação web desenvolvida para colecionadores de figurinhas da Copa do Mundo. O sistema permite que os usuários gerenciem sua coleção digital, acompanhem o progresso do álbum e organizem suas figurinhas de forma prática e intuitiva.
A aplicação utiliza autenticação via Google e armazenamento em nuvem através do Firebase, garantindo segurança e facilidade de acesso.

---

## Tecnologias Utilizadas

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend as a Service (BaaS)
- Firebase

### Autenticação
- Firebase Authentication
- Login com Google

### Banco de Dados
- Cloud Firestore

### Hospedagem
- Firebase Hosting

---

## Autenticação

O sistema utiliza o serviço **Firebase Authentication** para realizar o login dos usuários através de suas contas Google.

### Funcionalidades de Autenticação

- Login com Google
- Logout seguro
- Identificação automática do usuário
- Proteção de dados por conta
- Persistência de sessão

---

## Funcionalidades

- Login com Google
- Cadastro de figurinhas
- Marcação de figurinhas obtidas
- Armazenamento em nuvem
- Dados sincronizados em tempo real

---

## Como Executar

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar o Firebase

Crie um projeto no Firebase e configure:

- Authentication
- Cloud Firestore
- Hosting (opcional)

Adicione as credenciais no arquivo:

```javascript
firebase-config.js
```

### 4. Executar o projeto

```bash
npm start
```

ou utilize uma extensão como Live Server.

---

## Objetivo

O objetivo deste projeto é aplicar conceitos de desenvolvimento web moderno utilizando Firebase como Backend as a Service (BaaS), autenticação com Google e armazenamento em nuvem para gerenciamento de coleções digitais.

---

## Desenvolvedora

Projeto desenvolvido para fins acadêmicos e de aprendizado em desenvolvimento web utilizando Firebase Authentication e integração com contas Google por Pietra Moroni.
