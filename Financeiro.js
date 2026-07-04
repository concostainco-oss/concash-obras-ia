/******************************************************************
 * CONCASH OBRAS IA
 * AGENTE: FINANCEIRO IA
 ******************************************************************/

class FinanceiroIA {

  constructor() {
    this.banco = new BancoDados();
  }

  registrarPagamento(dados) {

    this.banco.adicionar(CONFIG.ABAS.CONTAS_PAGAR, [
      new Date(),
      dados.idObra,
      dados.descricao,
      dados.categoria,
      dados.favorecido,
      dados.valor,
      dados.vencimento,
      dados.status,
      dados.formaPagamento,
      dados.observacao
    ]);

    return {
      sucesso: true,
      mensagem: "Pagamento registrado com sucesso para a obra: " + dados.idObra
    };

  }

  registrarRecebimento(dados) {

    this.banco.adicionar(CONFIG.ABAS.CONTAS_RECEBER, [
      new Date(),
      dados.idObra,
      dados.descricao,
      dados.cliente,
      dados.valor,
      dados.vencimento,
      dados.status,
      dados.formaRecebimento,
      dados.observacao
    ]);

    return {
      sucesso: true,
      mensagem: "Recebimento registrado com sucesso para a obra: " + dados.idObra
    };

  }

}