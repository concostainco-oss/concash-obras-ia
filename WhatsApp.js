/******************************************************
 * CONCASH OBRAS IA
 * WHATSAPP WEBHOOK - V1
 ******************************************************/

function doGet(e) {
  const VERIFY_TOKEN = "CONCASH_V1";

  const mode = e.parameter["hub.mode"];
  const token = e.parameter["hub.verify_token"];
  const challenge = e.parameter["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return ContentService.createTextOutput(challenge);
  }

  return ContentService.createTextOutput("Token inválido");
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    const mensagem =
      body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.text?.body || "";

    const telefone =
      body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.from || "";

    if (!mensagem) {
      return respostaJson({
        sucesso: false,
        mensagem: "Nenhuma mensagem recebida."
      });
    }

    const ia = new OrquestradorIA();
    const resultado = ia.processarMensagem(mensagem);

    const respostaTexto = resultado.sucesso
      ? resultado.mensagem
      : "Não consegui processar sua solicitação.";

    if (telefone) {
      enviarRespostaWhatsApp(telefone, respostaTexto);
    }

    return respostaJson({
      sucesso: true,
      telefone: telefone,
      mensagemRecebida: mensagem,
      resposta: respostaTexto
    });

  } catch (erro) {
    return respostaJson({
      sucesso: false,
      erro: erro.toString()
    });
  }
}

function enviarRespostaWhatsApp(telefone, texto) {
  const token = PropertiesService
    .getScriptProperties()
    .getProperty("WHATSAPP_TOKEN");

  const phoneNumberId = PropertiesService
    .getScriptProperties()
    .getProperty("WHATSAPP_PHONE_NUMBER_ID");

  if (!token || !phoneNumberId) {
    Logger.log("Token ou Phone Number ID do WhatsApp ainda não configurado.");
    return;
  }

  const url =
    "https://graph.facebook.com/v20.0/" +
    phoneNumberId +
    "/messages";

  const payload = {
    messaging_product: "whatsapp",
    to: telefone,
    type: "text",
    text: {
      body: texto
    }
  };

  UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + token
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });
}

function respostaJson(objeto) {
  return ContentService
    .createTextOutput(JSON.stringify(objeto))
    .setMimeType(ContentService.MimeType.JSON);
}