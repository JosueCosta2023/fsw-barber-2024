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
- Plataforma: Web Mobile
- Backend: Node.js, postgreSQL and prisma
- Frontend: next.js, tailwindCss and typescript
- Autenticação: Google Sign-In
- Banco de Dados: postgreSQL
- Deploy: Vercel and NEONDB

## Clone o repositório:
Para Clonar nosso repositório utilize o comando 

    git clone https://github.com/JosueCosta2023/fsw-barber-2024.git


Após a clonagem utilize:

    npm install --force

"O `--force` é para força a instalação de todas as dependências ignorando avisos de segurança sobre versões."

Para utilizar um banco de dados pessoal, execute o migrate para criar as tabelas necessarias:
    
    npx prisma migrate dev

## Variaveis de Ambiente
Esta variaveis são essenciais para conexão com o banco de dados, crie o arquivo `.env` e insira suas credenciais.

    DATABASE_URL="Seu URi do banco de dados"

    GOOGLE_CLIENT_ID="Crendencial google cloud",

    GOOGLE_CLIENT_SECRET="Credencial google cloud",

    NEXT_AUTH_SECRET="secret" --pode deixar secret escrito se preferir.

## Uso
`Login:` Na tela inicial, clique em "Login com Google" para acessar sua conta.

`Listagem de Barbearias:` Navegue pela lista de barbearias para encontrar uma de sua escolha.

`Agendamento:` Selecione um serviço e escolha a data e o horário desejados dentro dos limites definidos.

`Cancelar Agendamento:` Vá até a lista de agendamentos e cancele qualquer serviço agendado.

`Status do Serviço:` O status do serviço será atualizado automaticamente conforme a data e hora do agendamento.

## Rotas
Aqui apresentamos um exemplo do link localhost e do URI, o localhost é para instalação local e o URI vem através do deploy.


    - Home page
    http://localhost:3000
    http://URI

    - Pagina de detalhes de uma barbearia
    http://localhost:3000/barbershop/[id]
    http://uri/barbershop/[id]

    - Pagina para agendar serviço
    http://localhost:3000/barbershop?service=nome_do_serviço
    http://URI/barbershop?service=nome_do_serviço

    - Pagina de listagem de agendamentos
    http://localhost:3000/bookings
    http://URI/bookings







