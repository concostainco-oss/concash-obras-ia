/******************************************************************
 * CONCASH OBRAS IA
 * AGENTE: COMPRAS IA
 * VERSÃO 2.0
 ******************************************************************/

class ComprasIA {

  constructor() {
    this.banco = new BancoDados();
  }

  registrarCompra(dados) {

    // Cadastro automático do fornecedor
    this.cadastrarFornecedorSeNaoExistir(dados.fornecedor);

    this.banco.adicionar(CONFIG.ABAS.COMPRAS, [

      new Date(),

      dados.idObra,

      dados.fornecedor,

      dados.material,

      dados.quantidade,

      dados.valor,

      dados.status || "Registrada",

      dados.observacao || ""

    ]);

    return {

      sucesso: true,

      mensagem:
        "Compra registrada com sucesso para a obra: " + dados.idObra

    };

  }

  registrarSolicitacaoMaterial(dados) {

    this.banco.adicionar(CONFIG.ABAS.SOLICITACOES, [

      new Date(),

      dados.idObra,

      dados.material,

      dados.quantidade,

      dados.prioridade,

      dados.solicitante,

      dados.status || "Pendente",

      dados.observacao || ""

    ]);

    return {

      sucesso: true,

      mensagem:
        "Solicitação de material registrada para a obra: " + dados.idObra

    };

  }

  cadastrarFornecedorSeNaoExistir(nomeFornecedor) {

    if (!nomeFornecedor || nomeFornecedor == "")
      return;

    const aba = SpreadsheetApp
      .openById(CONFIG.ID_PLANILHA)
      .getSheetByName(CONFIG.ABAS.FORNECEDORES);

    const dados = aba.getDataRange().getValues();

    for (let i = 1; i < dados.length; i++) {

      if (
        String(dados[i][1]).toUpperCase() ==
        String(nomeFornecedor).toUpperCase()
      ) {
        return;
      }

    }

    aba.appendRow([

      Utilities.getUuid(),

      nomeFornecedor,

      "",

      "",

      "",

      "ATIVO"

    ]);

  }

}