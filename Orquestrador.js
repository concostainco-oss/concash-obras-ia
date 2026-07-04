/******************************************************************
 * CONCASH OBRAS IA
 * ORQUESTRADOR CENTRAL
 ******************************************************************/

class OrquestradorIA {

  constructor() {

    this.engenharia = new EngenhariaIA();
    this.financeiro = new FinanceiroIA();
    this.compras = new ComprasIA();
    this.planejamento = new PlanejamentoIA();

  }

  /**************************************************************
   * Analisa a mensagem e prepara confirmação
   **************************************************************/
  prepararConfirmacao(mensagem) {

    const intencao = classificarMensagem(mensagem);
    const dados = extrairDadosMensagem(mensagem);

    if (intencao === "INTENCAO_NAO_IDENTIFICADA") {

      return {
        sucesso: false,
        precisaConfirmacao: false,
        mensagem: "Não consegui entender sua solicitação.",
        intencao,
        dados
      };

    }

    return {

      sucesso: true,
      precisaConfirmacao: true,
      mensagem: montarResumoConfirmacao(intencao, dados),
      intencao,
      dados

    };

  }

  /**************************************************************
   * Executa após confirmação
   **************************************************************/
  confirmarExecucao(confirmacao) {

    if (!confirmacao ||
        !confirmacao.intencao ||
        !confirmacao.dados) {

      return {
        sucesso: false,
        mensagem: "Confirmação inválida."
      };

    }

    return this.executar(
      confirmacao.intencao,
      confirmacao.dados
    );

  }

  /**************************************************************
   * Entrada principal da IA
   **************************************************************/
  processarMensagem(mensagem) {

    return this.prepararConfirmacao(mensagem);

  }

  /**************************************************************
   * Executa a ação solicitada
   **************************************************************/
  executar(intencao, dados) {

    let resultado;

    switch (intencao) {

      case "CADASTRAR_OBRA":
        resultado = this.engenharia.cadastrarObra(dados);
        break;

      case "REGISTRAR_PAGAMENTO":
        resultado = this.financeiro.registrarPagamento(dados);
        break;

      case "REGISTRAR_RECEBIMENTO":
        resultado = this.financeiro.registrarRecebimento(dados);
        break;

      case "REGISTRAR_COMPRA":
        resultado = this.compras.registrarCompra(dados);
        break;

      case "SOLICITAR_MATERIAL":
        resultado = this.compras.registrarSolicitacaoMaterial(dados);
        break;

      case "ATUALIZAR_CRONOGRAMA":
        resultado = this.planejamento.registrarAvancoFisico(dados);
        break;

      default:

        resultado = {
          sucesso: false,
          mensagem: "Intenção não reconhecida."
        };

    }

    registrarLogSistema(
      intencao,
      "Orquestrador IA",
      resultado.sucesso ? "Sucesso" : "Erro",
      resultado.mensagem
    );

    return resultado;

  }

}