/******************************************************************
 * CONCASH OBRAS IA
 * TESTE BLOCO 6
 ******************************************************************/

function iniciarSistema() {

  const ia = new OrquestradorIA();

  const mensagens = [

    "Cadastre a obra W10 no Terras Alphaville"

  ];

  mensagens.forEach(function(mensagem) {

    Logger.log("====================================");
    Logger.log("MENSAGEM:");
    Logger.log(mensagem);

    const confirmacao = ia.processarMensagem(mensagem);

    Logger.log("CONFIRMAÇÃO:");
    Logger.log(confirmacao.mensagem);

    const respostaUsuario = obterRespostaUsuario();

    Logger.log("RESPOSTA:");
    Logger.log(respostaUsuario);

    if (respostaUsuario == "SIM") {

      const resultado = ia.confirmarExecucao(confirmacao);

      Logger.log("RESULTADO:");
      Logger.log(resultado.mensagem);

    } else {

      Logger.log("Operação cancelada.");

    }

  });

}