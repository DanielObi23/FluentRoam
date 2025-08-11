const hell = {
  "firstMessage": "¿Necesitas ayuda con algo? ¿Estás perdido en un sitio?",
  "followUp": {
    "chatId": "4df65b16-c7e4-4b1c-b0b1-e2130f97fa0c",
    "response": "¿En dónde estás? Hay una zona comercial cerca de aquí. Puedo ayudarte a encontrar...",
    "fullData": {
      "id": "4df65b16-c7e4-4b1c-b0b1-e2130f97fa0c",
      "orgId": "2c411254-75ec-42a8-b3b9-5f0c23ea2182",
      "previousChatId": "26316bbf-df1f-4e8a-9f19-444f495a6bbf",
      "input": [
        {
          "role": "user",
          "content": "Tell me more"
        }
      ],
      "output": [
        {
          "role": "assistant",
          "content": "¿En dónde estás? Hay una zona comercial cerca de aquí. Puedo ayudarte a encontrar..."
        }
      ],
      "assistantId": "e3fbfb66-b32e-4c74-b456-c6ea5fb15663",
      "messages": [
        {
          "role": "user",
          "content": "Hello, I need help"
        },
        {
          "role": "assistant",
          "content": "¿Necesitas ayuda con algo? ¿Estás perdido en un sitio?"
        }
      ],
      "createdAt": "2025-08-11T14:25:08.734Z",
      "updatedAt": "2025-08-11T14:25:08.734Z",
      "cost": 0.005,
      "costs": [
        {
          "cost": 0.00002364,
          "type": "model",
          "model": {
            "model": "llama-3.1-8b-instant",
            "provider": "groq"
          },
          "promptTokens": 436,
          "completionTokens": 23
        },
        {
          "cost": 0.005,
          "type": "chat"
        }
      ]
    }
  },
  "thirdMessage": {
    "chatId": "c20baa0b-09da-4972-ad8d-21c8afa78d24",
    "response": "¿Quieres aprender más sobre algo en particular? ¿Un museo, el centro de la ciudad o tal vez una biblioteca?",
    "fullData": {
      "id": "c20baa0b-09da-4972-ad8d-21c8afa78d24",
      "orgId": "2c411254-75ec-42a8-b3b9-5f0c23ea2182",
      "previousChatId": "4df65b16-c7e4-4b1c-b0b1-e2130f97fa0c",
      "input": [
        {
          "role": "user",
          "content": "Where is the best place to learn more?"
        }
      ],
      "output": [
        {
          "role": "assistant",
          "content": "¿Quieres aprender más sobre algo en particular? ¿Un museo, el centro de la ciudad o tal vez una biblioteca?"
        }
      ],
      "assistantId": "e3fbfb66-b32e-4c74-b456-c6ea5fb15663",
      "messages": [
        {
          "role": "user",
          "content": "Hello, I need help"
        },
        {
          "role": "assistant",
          "content": "¿Necesitas ayuda con algo? ¿Estás perdido en un sitio?"
        },
        {
          "role": "user",
          "content": "Tell me more"
        },
        {
          "role": "assistant",
          "content": "¿En dónde estás? Hay una zona comercial cerca de aquí. Puedo ayudarte a encontrar..."
        }
      ],
      "createdAt": "2025-08-11T14:25:09.209Z",
      "updatedAt": "2025-08-11T14:25:09.209Z",
      "cost": 0.005,
      "costs": [
        {
          "cost": 0.00002606,
          "type": "model",
          "model": {
            "model": "llama-3.1-8b-instant",
            "provider": "groq"
          },
          "promptTokens": 478,
          "completionTokens": 27
        },
        {
          "cost": 0.005,
          "type": "chat"
        }
      ]
    }
  }
}