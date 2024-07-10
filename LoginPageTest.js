describe('Login Page Tests', () => {

  beforeEach(() => {
    cy.visit('/login'); // Adjust the URL path as necessary.
  });

  it('Should render login form with initial empty fields', () => {
    cy.get('input[type="email"]').should('be.empty');
    cy.get('input[type="password"]').should('be.empty');
    cy.get('button[type="submit"]').should('contain', 'Login');
  });

});