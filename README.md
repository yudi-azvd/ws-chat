# Chat com Socket.IO

## Funcionalidades
- chat em tempo real com vários usuários
- suporte para apelidos/nomes de usuário
- você pode ver quem está digitando (no momento só funciona para o primeiro
que começou a digitar)
- Comando para mensagens privadas `/p [nome do usuário] então escreva sua mensagem`
    - ex: `/p [aaaa] essa mensagem apenas o "aaaa" vai ver`

## Baixar e rodar

Clone o respositório e entre nele

```
git clone https://github.com/yudi-azvd/ws-chat
cd ws-chat
```

Instale as dependências:

```
yarn
```

Inicie o servidor de desenvolvimento

```
yarn dev
```

Você pode abrir múltiplas abas em seu navegador no endereço
http://localhost:300.


## Referências
- [Tutorial do Socket.IO](https://socket.io/get-started/chat)
- "Arquitetura" do servidor foi tirada [daqui](https://socket.io/docs/v4/server-application-structure/#each-file-registers-its-own-event-handlers).