/******************************************************************
 * CONCASH OBRAS IA
 * AGENTE: PLANEJAMENTO IA
 ******************************************************************/

class PlanejamentoIA {

  constructor() {
    this.banco = new BancoDados();
  }

  registrarAvancoFisico(dados) {

    this.banco.adicionar(CONFIG.ABAS.CRONOGRAMA, [
      new Date(),
      dados.idObra,
      dados.etapa,
      dados.percentualExecutado,
      dados.status,
      dados.observacao
    ]);

    return {
      sucesso: true,
      mensagem: "Avanço físico registrado para a obra: " + dados.idObra
    };

  }

}