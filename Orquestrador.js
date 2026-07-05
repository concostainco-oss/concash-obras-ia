class OrquestradorIA {
  constructor() {
    this.openai = new OpenAIService();
    this.banco = new BancoDados();
    this.engenharia = new EngenhariaIA();
  }

  processarMensagem(mensagem) {
    const respostaIA = this.openai.analisarMensagem(mensagem);

    if (!respostaIA.sucesso) {
      return { sucesso: false, mensagem: respostaIA.mensagem };
    }

    const dados = respostaIA.dados;

    if (!dados.idObra) {
      const obraMatch = mensagem.match(/[A-Z]+\d+/i);
      dados.idObra = obraMatch ? obraMatch[0].toUpperCase() : "";
    }

    if (!dados.condominio) {
      const texto = mensagem.toLowerCase();
      if (texto.includes("alphaville")) dados.condominio = "Terras Alphaville";
      if (texto.includes("petrópolis") || texto.includes("petropolis")) dados.condominio = "Petrópolis";
    }

    dados.acao = this.normalizarAcao(dados.acao, mensagem);

    return this.executarAcao(dados);
  }

  normalizarAcao(acao, mensagem) {
    const texto = String((acao || "") + " " + (mensagem || "")).toUpperCase();

    if (texto.includes("CADASTRAR") || texto.includes("CADASTRE")) return "CADASTRAR_OBRA";
    if (texto.includes("PAGAMENTO") || texto.includes("PAGAR") || texto.includes("PAGUEI")) return "REGISTRAR_PAGAMENTO";
    if (texto.includes("RECEBIMENTO") || texto.includes("RECEBI")) return "REGISTRAR_RECEBIMENTO";
    if (texto.includes("COMPRA") || texto.includes("COMPREI")) return "REGISTRAR_COMPRA";
    if (texto.includes("CRONOGRAMA") || texto.includes("ATUALIZAR") || texto.includes("PERCENTUAL") || texto.includes("FUNDAÇÃO") || texto.includes("%")) return "ATUALIZAR_CRONOGRAMA";

    return "INTENCAO_NAO_IDENTIFICADA";
  }

  executarAcao(dados) {
    switch (dados.acao) {
      case "CADASTRAR_OBRA":
        return this.cadastrarObra(dados);
      case "REGISTRAR_COMPRA":
        return this.registrarCompra(dados);
      case "REGISTRAR_PAGAMENTO":
        return this.registrarPagamento(dados);
      case "REGISTRAR_RECEBIMENTO":
        return this.registrarRecebimento(dados);
      case "ATUALIZAR_CRONOGRAMA":
        return this.atualizarCronograma(dados);
      default:
        return { sucesso: false, mensagem: "Intenção não identificada." };
    }
  }

  cadastrarObra(dados) {
    return this.engenharia.cadastrarObra({
      idObra: dados.idObra,
      nomeObra: dados.nomeObra || dados.idObra,
      condominio: dados.condominio || "",
      enderecoLote: "",
      tipoEmpreendimento: "Casa",
      status: "Planejamento",
      dataInicio: new Date(),
      previsaoEntrega: "",
      areaConstruida: "",
      areaLote: "",
      vgvPrevisto: dados.valor || "",
      orcamentoPrevisto: "",
      custoRealizado: 0,
      lucroPrevisto: "",
      lucroRealizado: 0,
      responsavel: "André",
      sociosInvestidores: ""
    });
  }

  registrarCompra(dados) {
    this.banco.adicionar(CONFIG.ABAS.COMPRAS, [
      new Date(),
      dados.idObra || "",
      dados.fornecedor || "",
      dados.material || dados.descricao || "",
      dados.quantidade || "",
      dados.valor || "",
      "Registrado",
      "Registrado pela IA"
    ]);

    return { sucesso: true, mensagem: "Compra registrada com sucesso para a obra: " + dados.idObra };
  }

  registrarPagamento(dados) {
    this.banco.adicionar(CONFIG.ABAS.CONTAS_PAGAR, [
      new Date(),
      dados.idObra || "",
      dados.fornecedor || "",
      dados.descricao || dados.material || "Pagamento registrado pela IA",
      dados.categoria || "Material",
      "",
      dados.valor || "",
      "",
      new Date(),
      new Date(),
      "Pix",
      "Não",
      "",
      "",
      "",
      "",
      "Pago",
      new Date(),
      ""
    ]);

    return { sucesso: true, mensagem: "Pagamento registrado com sucesso para a obra: " + dados.idObra };
  }

  registrarRecebimento(dados) {
    this.banco.adicionar(CONFIG.ABAS.CONTAS_RECEBER, [
      new Date(),
      dados.idObra || "",
      dados.descricao || "Recebimento registrado pela IA",
      "",
      dados.valor || "",
      "",
      "Recebido",
      "Pix",
      "Registrado pela IA"
    ]);

    return { sucesso: true, mensagem: "Recebimento registrado com sucesso para a obra: " + dados.idObra };
  }

  atualizarCronograma(dados) {
    this.banco.adicionar(CONFIG.ABAS.CRONOGRAMA, [
      new Date(),
      dados.idObra || "",
      dados.descricao || "Atualização de cronograma",
      dados.percentual || "",
      "Atualizado pela IA"
    ]);

    return { sucesso: true, mensagem: "Cronograma atualizado com sucesso para a obra: " + dados.idObra };
  }
}