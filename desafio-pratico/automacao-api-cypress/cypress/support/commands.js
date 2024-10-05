// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



// Requisição inválida sem o grant_type
Cypress.Commands.add('postInvalidRequest', (autentication) => {
    const clientId = autentication.clientId;
    const clientSecret = autentication.clientSecret;
  
    // Convertendo Client ID e Client Secret para Base64
    const encodedCredentials = btoa(`${clientId}:${clientSecret}`);
  
    // Usando cy.request para fazer a requisição POST sem o grant_type
    return cy.request({
      method: 'POST',
      url: 'https://api-homologacao.getnet.com.br/auth/oauth/v2/token', // URL completa
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${encodedCredentials}`
      },
      body: {
        scope: 'oob' // Removendo o campo grant_type
      },
      failOnStatusCode: false // Permitindo continuar mesmo com erro
    });
  });
  
  Cypress.Commands.add('postValidateCredentials', (autentication) => {
    const clientId = autentication.clientId;
    const clientSecret = autentication.clientSecret;
  
    // Convertendo Client ID e Client Secret para Base64
    const encodedCredentials = btoa(`${clientId}:${clientSecret}`);
  
    // Usando cy.request para fazer a requisição POST com credenciais válidas
    return cy.api({
      method: 'POST',
      url: 'https://api-homologacao.getnet.com.br/auth/oauth/v2/token', // URL completa
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${encodedCredentials}`
      },
      body: {
        scope: 'oob',
        grant_type: 'client_credentials'
      },
      failOnStatusCode: false
    });
  });
  