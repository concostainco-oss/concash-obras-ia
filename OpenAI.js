/******************************************************************
 * CONCASH OBRAS IA
 * OPENAI
 * VERSÃO 1.0
 ******************************************************************/

class OpenAIService {

  constructor() {

    this.apiKey = ""; // inserir chave da OpenAI posteriormente

    this.modelo = CONFIG.MODELO_OPENAI;

    this.temperatura = CONFIG.TEMPERATURA;

  }

  analisarMensagem(mensagem) {

    return {

      sucesso: true,

      mensagem: "Integração OpenAI ainda não ativada.",

      resposta: null

    };

  }

}