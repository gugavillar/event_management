# 🕊️ Sistema de Gerenciamento de Eventos - Igreja Anglicana Vida

## 📖 Sobre o Projeto

Este sistema foi desenvolvido para gerenciar eventos da Igreja Anglicana Vida, incluindo voluntários, participantes, funções e presença. O objetivo é facilitar a organização de eventos e manter um registro claro e acessível de todas as atividades da igreja.

---

### Funcionalidades

- ✅ Cadastro e gerenciamento de eventos.
- ✅ Gerenciamento de voluntários e suas funções.
- ✅ Controle de participantes e presença.
- ✅ Dashboard com métricas de participação e voluntariado.
- ✅ Roles múltiplas e lideranças por evento.
- ✅ Filtros avançados para consultas rápidas.

---

### 🛠 Tecnologias Utilizadas

- Front-end: ReactJS, Next.js, TypeScript
- Back-end: API Routes Next.js, Prisma ORM
- Banco de dados: MySQL
- Autenticação: NextAuth.js
- Infraestrutura: Docker, VPS

---

### 🚀 Como Rodar Localmente

#### Pré-requisitos

- Node.js >= 18
- Container docker mysql para o banco de dados

#### Passos

1. Clone o repositório:

```bash
    git clone https://github.com/gugavillar/event_management.git
```

2. Instale as dependências:

```bash
    cd event_manager
    npm install
```

3. Configure as variáveis de ambiente (.env):

```env
    DATABASE_URL=mysql://usuario:senha@localhost:3306/banco
    NEXTAUTH_SECRET=sua_chave_secreta
```

4. Execute as migrações do Prisma:

```bash
    npx prisma migrate dev
```

5. Rode a aplicação

```bash
    npm run dev
```

Acesse: http:localhost:3000

---

### Estrutura do projeto

```bash
/src
  /components - Componentes reutilizaveis
  /app/(admin)/* - Páginas protegidas
  /prisma - Modelos e migrações do banco
  /server - Funções das API routes
  /services - Servições de requests das API
```

---

### 📝 Observações

- Um voluntário pode ter múltiplas funções por evento.
- O sistema foi pensado para ser escalável e receber novo módulos futuramente.

### 📜 Licença

Este projeto está sob a licença MIT.
