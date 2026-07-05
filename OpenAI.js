class OpenAIService {
  constructor() {
    this.apiKey = PropertiesService
      .getScriptProperties()
      .getProperty("OPENAI_API_KEY");

    this.url = "https://api.openai.com/v1/chat/completions";
    this.modelo = "gpt-4o-mini";
  }

  analisarMensagem(mensagem) {
    const payload = {
      model: this.modelo,
      temperature: 0.1,
      messages: [
        {
          role: "system",
          content: `
Você é a IA da ConCash Obras IA.

Responda SOMENTE JSON PURO.

A ação deve ser obrigatoriamente UMA destas:
CADASTRAR_OBRA
REGISTRAR_PAGAMENTO
REGISTRAR_RECEBIMENTO
REGISTRAR_COMPRA
SOLICITAR_MATERIAL
ATUALIZAR_CRONOGRAMA
CONSULTAR_GASTOS
INTENCAO_NAO_IDENTIFICADA

Regras:
- Se a mensagem tiver "cadastre", "cadastrar", "nova obra": CADASTRAR_OBRA
- Se tiver "paguei", "pagamento", "pagar": REGISTRAR_PAGAMENTO
- Se tiver "recebi", "entrada", "cliente pagou": REGISTRAR_RECEBIMENTO
- Se tiver "comprei", "compra", "material": REGISTRAR_COMPRA
- Se tiver percentual %, fundação, estrutura, alvenaria, reboco, pintura: ATUALIZAR_CRONOGRAMA

Formato:
{
  "acao": "",
  "idObra": "",
  "nomeObra": "",
  "condominio": "",
  "descricao": "",
  "material": "",
  "fornecedor": "",
  "quantidade": "",
  "unidade": "",
  "valor": "",
  "percentual": "",
  "categoria": "Material",
  "status": ""
}
`
        },
        {
          role: "user",
          content: mensagem
        }
      ]
    };

    const resposta = UrlFetchApp.fetch(this.url, {
      method: "post",
      contentType: "application/json",
      headers: {
        Authorization: "Bearer " + this.apiKey
      },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });

    const json = JSON.parse(resposta.getContentText());

    if (json.error) {
      return {
        sucesso: false,
        mensagem: json.error.message
      };
    }

    let texto = json.choices[0].message.content
      .replace("```json", "")
      .replace("```", "")
      .trim();

    return {
      sucesso: true,
      dados: JSON.parse(texto)
    };
  }
}