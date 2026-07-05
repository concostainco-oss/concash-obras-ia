/**************************************************************
 * CONCASH OBRAS IA
 * CONFIGURAÇÕES GERAIS
 **************************************************************/

const CONFIG = {

  //==========================================================
  // GERAL
  //==========================================================

  VERSAO: "1.0",

  MODELO_OPENAI: "gpt-4o-mini",

  TEMPERATURA: 0.2,

  //==========================================================
  // OPENAI
  //==========================================================

  OPENAI_API_KEY:
    PropertiesService.getScriptProperties()
      .getProperty("OPENAI_API_KEY"),

  //==========================================================
  // GOOGLE PLANILHA
  //==========================================================

  PLANILHA_ID:
    "1M0y7tXVK-5lVIDU66Qqm1zBX_u3cm0Rpx5rYSWqGZnQ",

  SHEET_ID:
    "1M0y7tXVK-5lVIDU66Qqm1zBX_u3cm0Rpx5rYSWqGZnQ",

  //==========================================================
  // ABAS
  //==========================================================

  ABAS: {

    OBRAS: "OBRAS",

    DIARIO: "DIÁRIO DE OBRAS",

    OCORRENCIAS: "OCORRÊNCIAS",

    CRONOGRAMA: "CRONOGRAMA FÍSICO",

    CONTAS_PAGAR: "CONTAS A PAGAR",

    CONTAS_RECEBER: "CONTAS A RECEBER",

    COMPRAS: "SOLICITAÇÕES DE MATERIAL",

    SOLICITACOES: "SOLICITAÇÕES DE MATERIAL",

    INDICADORES: "INDICADORES",

    LOGS: "LOGS DO SISTEMA"

  }

};