# 🎧 Helpdesk Web - Front-end

Interface de usuário (UI) moderna, responsiva e dinâmica para o sistema de gerenciamento de chamados de suporte técnico. Construída com React e estilizada com TailwindCSS, oferecendo uma experiência de uso fluida e feedback visual em tempo real.

## 🚀 Tecnologias Utilizadas

* **React** (via Vite para build super rápido)
* **TailwindCSS** (Estilização utilitária e design responsivo)
* **Axios** (Comunicação HTTP com a API)
* **React Router Dom** (Navegação SPA entre páginas públicas e privadas)
* **JWT-Decode** (Leitura do payload do token para controle visual)
* **React Hot Toast** (Notificações flutuantes elegantes)

## ✨ Funcionalidades e UX

* **Validação de Formulários:** Validação manual com Regex para e-mails e bloqueio de envios vazios.
* **Controle de Acesso Visual (RBAC):** O botão de "Fechar Chamado" é renderizado dinamicamente apenas se o JWT decodificado pertencer a um usuário com a role `ADMIN`.
* **Feedback em Tempo Real:** Notificações (Toasts) de sucesso, erro e carregamento durante requisições assíncronas.
* **Internacionalização Simples:** Dados trafegados em inglês com a API (`OPEN`/`CLOSED`), mas apresentados de forma amigável em português para o usuário final (`ABERTO`/`FECHADO`).
* **Proteção de Rotas:** Redirecionamento automático para a tela de login se o token estiver ausente ou expirado.

## ⚙️ Como executar localmente

1. Clone este repositório.
2. Certifique-se de que a API do Back-end esteja rodando na porta `8080`.
3. Abra o terminal na raiz do projeto e instale as dependências:
   ```bash
   npm install