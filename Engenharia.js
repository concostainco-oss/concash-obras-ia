/******************************************************************
 * CONCASH OBRAS IA
 * AGENTE: ENGENHARIA IA
 ******************************************************************/

class EngenhariaIA {

  constructor() {

    this.banco = new BancoDados();

  }

  cadastrarObra(dadosObra) {

    //----------------------------------
    // VALIDA ID
    //----------------------------------

    if (!dadosObra.idObra) {

      return {

        sucesso: false,

        mensagem: "Informe o código da obra."

      };

    }

    //----------------------------------
    // VERIFICA DUPLICIDADE
    //----------------------------------

    const obraExistente = this.banco.buscarObraPorId(dadosObra.idObra);

    if (obraExistente) {

      return {

        sucesso: false,

        mensagem: "Obra já cadastrada: " + dadosObra.idObra

      };

    }

    //----------------------------------
    // VALIDA CONDOMÍNIO
    //----------------------------------

    const condominiosPermitidos = [

      "Petrópolis",
      "Terras Alphaville",
      "Verana"

    ];

    if (
      dadosObra.condominio &&
      !condominiosPermitidos.includes(dadosObra.condominio)
    ) {

      return {

        sucesso: false,

        mensagem:
          "Condomínio inválido: " + dadosObra.condominio

      };

    }

    //----------------------------------
    // VALORES PADRÃO
    //----------------------------------

    dadosObra.nomeObra =
      dadosObra.nomeObra || dadosObra.idObra;

    dadosObra.condominio =
      dadosObra.condominio || "";

    dadosObra.enderecoLote =
      dadosObra.enderecoLote || "";

    dadosObra.tipoEmpreendimento =
      dadosObra.tipoEmpreendimento || "Casa";

    dadosObra.status =
      dadosObra.status || "Planejamento";

    dadosObra.dataInicio =
      dadosObra.dataInicio || new Date();

    dadosObra.previsaoEntrega =
      dadosObra.previsaoEntrega || "";

    dadosObra.areaConstruida =
      dadosObra.areaConstruida || 0;

    dadosObra.areaLote =
      dadosObra.areaLote || 0;

    dadosObra.vgvPrevisto =
      dadosObra.vgvPrevisto || 0;

    dadosObra.orcamentoPrevisto =
      dadosObra.orcamentoPrevisto || 0;

    dadosObra.custoRealizado =
      dadosObra.custoRealizado || 0;

    dadosObra.lucroPrevisto =
      dadosObra.lucroPrevisto || 0;

    dadosObra.lucroRealizado =
      dadosObra.lucroRealizado || 0;

    dadosObra.responsavel =
      dadosObra.responsavel || "";

    dadosObra.sociosInvestidores =
      dadosObra.sociosInvestidores || "";

    //----------------------------------
    // GRAVA
    //----------------------------------

    this.banco.adicionar(CONFIG.ABAS.OBRAS, [

      dadosObra.idObra,

      dadosObra.nomeObra,

      dadosObra.condominio,

      dadosObra.enderecoLote,

      dadosObra.tipoEmpreendimento,

      dadosObra.status,

      dadosObra.dataInicio,

      dadosObra.previsaoEntrega,

      dadosObra.areaConstruida,

      dadosObra.areaLote,

      dadosObra.vgvPrevisto,

      dadosObra.orcamentoPrevisto,

      dadosObra.custoRealizado,

      dadosObra.lucroPrevisto,

      dadosObra.lucroRealizado,

      dadosObra.responsavel,

      dadosObra.sociosInvestidores

    ]);

    return {

      sucesso: true,

      mensagem:
        "Obra cadastrada com sucesso: " + dadosObra.idObra

    };

  }

}