# Webhook Tester - Aplicação NestJS

Aplicação simples em NestJS para testar o recebimento de webhooks.

## Funcionalidades

- Recebe webhooks via POST `/webhook`
- Aceita qualquer payload JSON
- Armazena webhooks em memória com ID único, timestamp, headers e body
- Lista todos os webhooks recebidos via GET `/webhooks`
- Logs formatados no console para cada webhook recebido

## Instalação

```bash
npm install
```

## Executar a aplicação

### Modo desenvolvimento
```bash
npm run start:dev
```

### Modo produção
```bash
npm run build
npm run start:prod
```

## Uso

### Enviar um webhook

```bash
curl -X POST http://localhost:3000/webhook \
  -H "Content-Type: application/json" \
  -H "X-Custom-Header: test-value" \
  -d '{"event": "test", "data": {"message": "Hello from webhook"}}'
```

**Resposta:**
```json
{
  "message": "Webhook recebido com sucesso",
  "webhook": {
    "id": "uuid-gerado-automaticamente",
    "timestamp": "2025-12-16T17:23:11.258Z",
    "headers": {
      "host": "localhost:3000",
      "content-type": "application/json",
      "x-custom-header": "test-value"
    },
    "body": {
      "event": "test",
      "data": {
        "message": "Hello from webhook"
      }
    }
  }
}
```

### Listar todos os webhooks recebidos

```bash
curl http://localhost:3000/webhooks
```

**Resposta:**
```json
{
  "total": 2,
  "webhooks": [
    {
      "id": "uuid-1",
      "timestamp": "2025-12-16T17:23:11.258Z",
      "headers": {...},
      "body": {...}
    },
    {
      "id": "uuid-2",
      "timestamp": "2025-12-16T17:23:47.358Z",
      "headers": {...},
      "body": {...}
    }
  ]
}
```

## Logs no Console

Quando um webhook é recebido, a aplicação exibe logs formatados:

```
[Nest] 439634  -  12/16/2025, 2:23:11 PM    LOG [AppService] === Novo Webhook Recebido ===
[Nest] 439634  -  12/16/2025, 2:23:11 PM    LOG [AppService] ID: 5f61f84f-e10b-4932-89d1-b91e71a516a0
[Nest] 439634  -  12/16/2025, 2:23:11 PM    LOG [AppService] Timestamp: 2025-12-16T17:23:11.258Z
[Nest] 439634  -  12/16/2025, 2:23:11 PM    LOG [AppService] Headers: {
  "host": "localhost:3000",
  "content-type": "application/json",
  "x-custom-header": "test-value"
}
[Nest] 439634  -  12/16/2025, 2:23:11 PM    LOG [AppService] Body: {
  "event": "test",
  "data": {
    "message": "Hello from webhook"
  }
}
[Nest] 439634  -  12/16/2025, 2:23:11 PM    LOG [AppService] ============================
```

## Estrutura do Projeto

```
src/
├── app.controller.ts       # Controller com rotas POST /webhook e GET /webhooks
├── app.service.ts          # Service com lógica de armazenamento e logging
├── app.module.ts           # Módulo principal
├── webhook.interface.ts    # Interface TypeScript para WebhookRecord
└── main.ts                 # Entry point da aplicação
```

## Tecnologias Utilizadas

- NestJS v10+
- TypeScript
- Node.js
- Armazenamento em memória (não persistente)

## Notas

- Os webhooks são armazenados apenas em memória e serão perdidos ao reiniciar a aplicação
- Não há limite de armazenamento configurado
- Todos os headers HTTP são capturados e armazenados
- A aplicação aceita qualquer payload JSON válido
