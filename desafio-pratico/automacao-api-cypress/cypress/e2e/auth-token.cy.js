/// <reference types="cypress-plugin-api" />

describe('Autenticação API - Geração de Token com Cypress', () => {
  beforeEach(function () {
    // Aqui busca as infomrações da pasta fixtures, mais precisamento do arquivo autentication
    cy.fixture("autentication").then(function (autentication) {
      this.autentication = autentication;
    });
  });

  it('Deve autenticar e gerar o token com sucesso', function () {
    // Usando as credenciais válidas do arquivo autentication.json
    const autentication = this.autentication.ValidCredentials; 

    cy.postValidateCredentials(autentication).then((response) => {
      // Verificar se o status code retornado é 200
      expect(response.status).to.eq(200);

      // Verificar se no retorno do body o campo "access_token" é exibido
      expect(response.body).to.have.property('access_token');
      
     // Verificar se no retorno do body  o campo "token_type" é exibido
      expect(response.body).to.have.property('token_type');
      
      // Verificar se o token_type é do tipo 'Bearer'
      expect(response.body.token_type).to.eq('Bearer');

      // Verificar se o campo "expires_in" também está presente e é um número
      expect(response.body).to.have.property('expires_in').that.is.a('number'); 
    });
  
  });


  it('Deve retornar erro 400 para requisição inválida', function () {
    // Usando as credenciais válidas do arquivo autentication.json
    const autentication = this.autentication.ValidCredentials; 
    cy.postInvalidRequest(autentication).then((response) => {
      // Verificar se o status code retornado é 400
      expect(response.status).to.eq(400);
  
      // Verificar se contém o campo "error"
      expect(response.body).to.have.property('error', 'invalid_request');
  
      // Verificar se contém o campo "error_description"
      expect(response.body).to.have.property('error_description', 'Missing or duplicate parameters');
    });
  });
  

  it('Deve falhar com status 401 para credenciais inválidas', function () {
    // Usando as credenciais invalidas do arquivo autentication.json
    const autentication = this.autentication.InvalidCredentials; 
    cy.postValidateCredentials(autentication).then((response) => {
      // Verificar se o status code retornado é 401
      expect(response.status).to.eq(401);

      // Validar a existência dos campos principais
      expect(response.body).to.have.property('status_code', 401);
      expect(response.body).to.have.property('name', 'Unauthorized');
      expect(response.body).to.have.property('message', 'Unauthorized');
      expect(response.body).to.have.property('details');

      // Verificar se o campo 'details' contém um array e não está vazio
      expect(response.body.details).to.be.an('array').that.is.not.empty;

      // Validar o primeiro item do array 'details'
      const detail = response.body.details[0];
      expect(detail).to.have.property('status', 'DENIED');
      expect(detail).to.have.property('error_code', 'GENERIC-401');
      expect(detail).to.have.property('description', 'Unauthorized');
      expect(detail).to.have.property('description_detail', 'CODE 02');
    });
  });


});



