function iniciarSistema() {
  const eventoFake = {
    postData: {
      contents: JSON.stringify({
        entry: [{
          changes: [{
            value: {
              messages: [{
                from: "5586999999999",
                text: {
                  body: "Cadastre a obra E51 no Petrópolis"
                }
              }]
            }
          }]
        }]
      })
    }
  };

  const resposta = doPost(eventoFake);

  Logger.log(resposta.getContent());
}