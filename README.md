# 📌 DevLink — Linktree com painel administrativo

# 📖 Sobre o projeto

Este repositório é uma aplicação web inspirada no conceito de **link na bio** (estilo Linktree): uma página pública com o nome do perfil e atalhos para redes sociais, complementada por um **painel administrativo** protegido por login.

O foco é **estudo e aprendizado** em desenvolvimento web moderno: praticar React com TypeScript, roteamento, integração com **Firebase** (autenticação e banco de dados em tempo real) e construção de interfaces com **Tailwind CSS**. O projeto acompanha a lógica de um mini produto — página pública + área logada para cadastrar dados — típico de cursos e portfólios de desenvolvedor.

# 🚀 O que estou aprendendo

- **React** (componentes funcionais, composição de UI)
- **TypeScript** (tipagem de props, estados e dados vindos do Firestore)
- **Vite** como bundler e ambiente de desenvolvimento
- **Firebase Authentication** (login com e-mail e senha)
- **Cloud Firestore** (escrita, leitura em tempo real com `onSnapshot`, exclusão de documentos)
- **Hooks** (`useState`, `useEffect`) para formulários, lista de links e guarda de rota
- **React Router** (`createBrowserRouter`, rotas públicas e privadas, `Navigate`, `Link`, `useNavigate`)
- **CRUD parcial** na prática: cadastro e listagem em tempo real, exclusão de links (sem tela de edição no código atual)
- **Rotas protegidas** com `onAuthStateChanged` e componente de rota privada
- **Componentização** (cabeçalho, inputs reutilizáveis, ícones sociais)
- **Estilização com Tailwind CSS** (layout responsivo com classes utilitárias)
- **Boas práticas em evolução** (validação básica de formulário, feedback ao usuário com `alert` em alguns fluxos)

# 🛠️ Tecnologias utilizadas

**Runtime e linguagem**

- Node.js (para scripts do projeto)
- TypeScript

**Front-end**

- React 19
- React DOM
- React Router DOM 7

**Estilo**

- Tailwind CSS 4
- Plugin `@tailwindcss/vite`

**Back-end as a Service**

- Firebase (módulos `firebase/app`, `firebase/auth`, `firebase/firestore`)

**Ícones**

- React Icons

**Build e qualidade**

- Vite 8
- ESLint 9 (com plugins para React Hooks e React Refresh)
- typescript-eslint

**Outras dependências no `package.json`**

- Os pacotes `localforage`, `match-sorter`, `sort-by` e `icons` constam como dependências do projeto, porém **não aparecem importados no código-fonte atual** da pasta `src` — podem ter sido adicionados para etapas futuras do curso ou experimentação.

# ⚙️ Funcionalidades

**Página inicial (`/`)**

- Exibe o título com o nome **Marcelo Baptista** e um convite para ver os links.
- Bloco visual estilo “card” com o texto “Instagram” (sem `href` configurado no código atual).
- Rodapé com ícones que abrem **LinkedIn**, **Instagram** e **GitHub** em nova aba (URLs fixas no componente).

**Login (`/login`)**

- Formulário com e-mail e senha.
- Autenticação via **Firebase** (`signInWithEmailAndPassword`).
- Validação simples de campos obrigatórios; erros de login são tratados no `catch` com log no console.
- Após login bem-sucedido, o código navega para a rota **`/adim`** (conforme implementação atual — essa rota não está definida no roteador; o painel correto no app é **`/admin`**).

**Área administrativa — Meus Links (`/admin`, rota privada)**

- Acesso apenas para usuário autenticado (componente de rota privada + redirecionamento para `/login` se não houver sessão).
- Cadastro de links na coleção Firestore **`myLinks`**: nome, URL, cor do texto e cor de fundo (incluindo seletores `color`), com campo `created` ao salvar.
- Listagem dos links em tempo real com **`onSnapshot`**.
- Exclusão de um link por documento (`deleteDoc`).
- Pré-visualização do estilo do link enquanto o nome é preenchido.
- Cabeçalho com links para Home, Meus Links, Minhas Redes e botão de **logout** (`signOut`).

**Minhas redes sociais (`/admin/social`, rota privada)**

- Formulário para URLs de **Facebook**, **Instagram** e **GitHub**.
- Persistência com **`setDoc`** no documento `social/link` no Firestore.
- Mensagem de sucesso com `alert` após salvar; erros registrados no console.

**Persistência local na sessão**

- Após autenticação, dados básicos do usuário (`uid`, `email`) são gravados em **`localStorage`** na chave `@reactlinks` (no fluxo da rota privada).

# 📚 Aprendizados

Na prática, o projeto reforça como separar **página pública** e **área autenticada**, como o Firestore atualiza a UI em tempo real sem recarregar a página inteira, e como organizar formulários com estado local no React.

Alguns pontos que aparecem naturalmente ao evoluir o código: alinhar **todas as rotas** usadas no `navigate` após o login com as rotas declaradas no `createBrowserRouter`; completar o fluxo da página inicial se a intenção for exibir os mesmos links cadastrados no admin; carregar no formulário de redes os valores já salvos no Firestore (o arquivo atual importa `getDoc` mas ainda não lê o documento ao abrir a tela). Esses detalhes são comuns em projetos de aprendizado e viram ótimos exercícios de refino.

# 🔥 Próximos passos

- Corrigir o redirecionamento pós-login para **`/admin`** (ou a rota desejada), garantindo consistência com o roteador.
- Exibir na **home** os links cadastrados em `myLinks` (e, se fizer sentido, as redes salvas em `social/link`), unificando conteúdo público com o painel.
- Preencher o formulário de redes com **`getDoc`** ao montar a página, para edição do que já foi salvo.
- Implementar **edição** de links (update no Firestore) e, opcionalmente, ordenação explícita na listagem.
- Melhorar feedback de erro (mensagens na UI em vez de apenas `console.log` / `alert`).
- **Variáveis de ambiente** para a configuração do Firebase (evitar expor chaves diretamente no repositório em cenários reais).
- **Responsividade** e polimento visual contínuo; **testes** (por exemplo, Vitest + Testing Library) para formulários e rotas.
- Revisar dependências não usadas ou integrá-las a um recurso concreto (ex.: cache offline com `localforage`).

# ▶️ Como rodar o projeto

1. **Clonar o repositório**

   ```bash
   git clone <url-do-repositório>
   cd linktree
   ```

2. **Instalar dependências**

   ```bash
   npm install
   ```

3. **Rodar o projeto**

   ```bash
   npm run dev
   ```

   O Vite exibirá o endereço local (por padrão, algo como `http://localhost:5173`). Abra esse endereço no navegador.

**Scripts úteis**

- `npm run build` — gera a build de produção (TypeScript + Vite).
- `npm run preview` — serve a build localmente para testar o resultado compilado.
- `npm run lint` — executa o ESLint no projeto.

**Firebase**

- O projeto espera um projeto Firebase válido com **Authentication** (e-mail/senha) e **Firestore** habilitados, e regras de segurança compatíveis com o uso do app. A configuração do cliente está em `src/services/firabase.Connection.ts` (nome do arquivo conforme o repositório).

# 👨‍💻 Autor

Marcelo Henrique Baptista

---

*Projeto desenvolvido no contexto de estudos em desenvolvimento web (Full Stack / front-end).*
