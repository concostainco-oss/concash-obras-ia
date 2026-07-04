/******************************************************************
 * CONCASH OBRAS IA
 * LOGS DO SISTEMA
 ******************************************************************/

function registrarLogSistema(evento, modulo, status, observacao) {

  const banco = new BancoDados();

  banco.adicionar(CONFIG.ABAS.LOGS, [
    new Date(),
    evento,
    modulo,
    status,
    observacao || ""
  ]);

}