/******************************************************************
 * CONCASH OBRAS IA
 * UTILITÁRIOS
 ******************************************************************/

function classificarMensagem(mensagem) {

  const texto = mensagem.toLowerCase();

  if (texto.includes("pague") || texto.includes("paguei"))
    return "REGISTRAR_PAGAMENTO";

  if (texto.includes("recebi"))
    return "REGISTRAR_RECEBIMENTO";

  if (texto.includes("comprei"))
    return "REGISTRAR_COMPRA";

  if (texto.includes("solicitar") || texto.includes("solicite"))
    return "SOLICITAR_MATERIAL";

  if (
    texto.includes("%") ||
    texto.includes("fundação") ||
    texto.includes("estrutura") ||
    texto.includes("alvenaria") ||
    texto.includes("reboco") ||
    texto.includes("laje") ||
    texto.includes("pintura")
  )
    return "ATUALIZAR_CRONOGRAMA";

  if (
    texto.includes("cadastre") ||
    texto.includes("cadastrar") ||
    texto.includes("nova obra") ||
    texto.includes("nova casa")
  )
    return "CADASTRAR_OBRA";

  return "INTENCAO_NAO_IDENTIFICADA";

}


function extrairDadosMensagem(mensagem) {

  const texto = mensagem.toLowerCase();

  //-------------------------
  // VALOR
  //-------------------------

  const valorMatch = mensagem.match(/r\$\s*([\d\.]+(?:,\d+)?)/i);

  let valor = "";

  if (valorMatch) {

    valor = valorMatch[1]
      .replace(/\./g, "")
      .replace(",", ".");

  }

  //-------------------------
  // OBRA
  //-------------------------

  const obraMatch = mensagem.match(/[A-Z]+\d+/i);

  //-------------------------
  // PERCENTUAL
  //-------------------------

  const percentualMatch = mensagem.match(/(\d+)\s?%/);

  //-------------------------
  // QUANTIDADE
  //-------------------------

  const quantidadeMatch = mensagem.match(/(\d+)\s+(sacos?|blocos?|metros?|m²|m3|m³|unidades?|peças?)/i);

  //-------------------------
  // FORNECEDOR
  //-------------------------

  const fornecedorMatch = mensagem.match(/da\s+(.+?)\s+por\s+r\$/i);

  //-------------------------
  // MATERIAL
  //-------------------------

  let material = "";

  const materiais = [

    "cimento",
    "bloco",
    "areia",
    "brita",
    "ferro",
    "aço",
    "tijolo",
    "argamassa",
    "telha",
    "madeira",
    "tinta",
    "cimento cola",
    "porcelanato",
    "fio",
    "cabo",
    "tubo",
    "concreto"

  ];

  materiais.forEach(function(item){

    if(texto.includes(item))
      material=item;

  });

  //-------------------------
  // DESCRIÇÃO
  //-------------------------

  let descricao = material;

  //-------------------------
  // CONDOMÍNIO
  //-------------------------

  let condominio="";

  if(texto.includes("alphaville"))
    condominio="Terras Alphaville";

  if(texto.includes("petrópolis") || texto.includes("petropolis"))
    condominio="Petrópolis";

  //-------------------------
  // CATEGORIA
  //-------------------------

  let categoria="Material";

  if(texto.includes("pix"))
    categoria="Financeiro";

  //-------------------------
  // RETORNO
  //-------------------------

  return{

    idObra:obraMatch?obraMatch[0].toUpperCase():"",

    descricao:descricao,

    material:material,

    fornecedor:fornecedorMatch?fornecedorMatch[1].trim():"",

    quantidade:quantidadeMatch?quantidadeMatch[1]:"",

    unidade:quantidadeMatch?quantidadeMatch[2]:"",

    valor:valor,

    percentual:percentualMatch?percentualMatch[1]:"",

    categoria:categoria,

    condominio:condominio

  };

}


function montarResumoConfirmacao(intencao,dados){

return `

==============================

CONCASH OBRAS IA

==============================

Tipo:
${intencao}

Obra:
${dados.idObra}

Condomínio:
${dados.condominio}

Fornecedor:
${dados.fornecedor}

Material:
${dados.material}

Quantidade:
${dados.quantidade} ${dados.unidade}

Valor:
R$ ${dados.valor}

Categoria:
${dados.categoria}

==============================

DIGITE:

SIM

para confirmar.

`;

}


function obterRespostaUsuario(){

  return "SIM";

}