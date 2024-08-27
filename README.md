35minutes
# FWS-Barber 2024
#### Esta plataforma mobile foi desenvolvida para facilitar a interação entre barbearias e seus clientes. A aplicação permite que os usuários encontrem barbearias próximas, agendem serviços, e gerenciem suas reservas diretamente pelo aplicativo. A plataforma foi construída com foco na usabilidade e na automação de processos, garantindo uma experiência fluida para os usuários.

## Funcionalidades
### Listagem de Barbearias:
    O usuário tem acesso a uma lista de barbearias disponíveis na região, com detalhes sobre cada uma, incluindo endereço, horário de funcionamento e serviços oferecidos.

### Login via Conta Google: 
    Os usuários podem se autenticar na plataforma utilizando suas contas do Google, garantindo um processo de login rápido e seguro.

### Agendamento de Serviços: 
    O usuário pode agendar serviços diretamente pelo aplicativo, escolhendo a barbearia, o serviço desejado, a data e a hora disponíveis.

### Exclusão de Serviços: 
    Caso necessário, o usuário pode cancelar um serviço agendado diretamente pelo aplicativo.

## Horários de Agendamento:

`Data Atual:` O usuário só pode agendar serviços a partir do dia atual.

`Horário de Atendimento:` Os horários disponíveis para agendamento são ajustados automaticamente de acordo com o horário de funcionamento da barbearia selecionada.

`Status Automático dos Serviços` 
 - Agendado: Serviços que ainda não ocorreram são marcados como "Agendados".

 - Finalizado: Serviços que já ocorreram são automaticamente marcados como "Finalizados".


## Requisitos de Sistema
Plataforma: Web Mobile
Backend: Node.js, postgreSQL
Frontend: next.js
Autenticação: Google Sign-In
Banco de Dados: postgreSQL
Deploy: Vercel e NEONDB

## Clone o repositório:

bash
Copiar código
git clone https://github.com/seu-usuario/sua-plataforma-barbearias.git
cd sua-plataforma-barbearias
Instale as dependências do backend:

bash
Copiar código
cd backend
npm install
Configure as variáveis de ambiente:

Crie um arquivo .env na pasta backend com as seguintes variáveis:
makefile
Copiar código
MONGODB_URI=seu_uri_mongodb
FIREBASE_API_KEY=sua_api_key
FIREBASE_AUTH_DOMAIN=seu_auth_domain
FIREBASE_PROJECT_ID=seu_project_id
FIREBASE_STORAGE_BUCKET=seu_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
FIREBASE_APP_ID=sua_app_id
Inicie o backend:

bash
Copiar código
npm start
Instale as dependências do frontend:

bash
Copiar código
cd ../frontend
npm install
Inicie o frontend:

bash
Copiar código
npm start


## Uso
`Login:` Na tela inicial, clique em "Login com Google" para acessar sua conta.

`Listagem de Barbearias:` Navegue pela lista de barbearias para encontrar uma de sua escolha.

`Agendamento:` Selecione um serviço e escolha a data e o horário desejados dentro dos limites definidos.

`Cancelar Agendamento:` Vá até a lista de agendamentos e cancele qualquer serviço agendado.

`Status do Serviço:` O status do serviço será atualizado automaticamente conforme a data e hora do agendamento.

## Estrutura do Projeto
backend/: Contém a API e a lógica de negócios.

models/: Modelos de dados para MongoDB.
routes/: Definição das rotas da API.
controllers/: Contém a lógica das operações de cada rota.
middleware/: Contém middlewares como autenticação.
frontend/: Contém o código do aplicativo mobile.

screens/: Contém as telas principais do aplicativo.
components/: Componentes reutilizáveis.
navigation/: Configuração de navegação entre telas.
Contribuição
Se deseja contribuir para o projeto, por favor, siga estas etapas:

Fork o repositório.
Clone o repositório para sua máquina local.
Crie uma nova branch para suas mudanças (git checkout -b minha-branch).
Commit suas mudanças (git commit -m 'Minha contribuição').
Push para a branch (git push origin minha-branch).
Crie um Pull Request para revisão.
Licença
Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.



