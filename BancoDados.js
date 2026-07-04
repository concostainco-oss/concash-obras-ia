/******************************************************************
 * CONCASH OBRAS IA
 * BANCO DE DADOS
 ******************************************************************/

class BancoDados {

  constructor() {

    this.planilha = SpreadsheetApp.openById(CONFIG.PLANILHA_ID);

  }

  aba(nome) {

    return this.planilha.getSheetByName(nome);

  }

  ler(nomeAba) {

    const aba = this.aba(nomeAba);

    if (!aba) {
      throw new Error("Aba não encontrada: " + nomeAba);
    }

    return aba.getDataRange().getValues();

  }

  adicionar(nomeAba, linha) {

    const aba = this.aba(nomeAba);

    aba.appendRow(linha);

  }

  ultimaLinha(nomeAba) {

    return this.aba(nomeAba).getLastRow();

  }

  buscarObraPorId(idObra) {

    const dados = this.ler(CONFIG.ABAS.OBRAS);

    const cabecalho = dados[0];

    const colunaId = cabecalho.indexOf("ID OBRA");

    if (colunaId === -1) {
      throw new Error("Coluna ID OBRA não encontrada na aba OBRAS.");
    }

    for (let i = 1; i < dados.length; i++) {

      if (
        String(dados[i][colunaId]).trim().toUpperCase() ==
        String(idObra).trim().toUpperCase()
      ) {

        return {

          linha: i + 1,

          dados: dados[i],

          cabecalho: cabecalho

        };

      }

    }

    return null;

  }

  obterTodos(nomeAba) {

    const aba = this.aba(nomeAba);

    if (!aba)
      return [];

    const dados = aba.getDataRange().getValues();

    dados.shift();

    return dados;

  }

  existe(nomeAba, coluna, valor) {

    const dados = this.obterTodos(nomeAba);

    return dados.some(function(linha) {

      return String(linha[coluna]).trim().toUpperCase() ==
             String(valor).trim().toUpperCase();

    });

  }

}