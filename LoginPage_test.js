describe('Login Page Tests', () => {

  beforeEach(() => {
    cy.visit('/login'); // assuming the login page is at /login route
  });

  it('should display login form', () => {
    cy.get('form').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  describe('Form Interactions', () => {

    it('should accept email input', () => {
      cy.get('input[type="email"]')
        .type('user@example.com')
        .should('have.value', 'user@example.com');
    });

    it('should accept password input', () => {
      cy.get('input[type="password"]')
        .type('password123')
        .should('have.value', 'password123');
    });

    it('should show an alert for invalid credentials', () => {
      cy.intercept('POST', '/api/login', { statusCode: 401 }).as('loginRequest');

      cy.get('input[type="email"]').type('invalid@example.com');
      cy.get('input[type="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();

      cy.wait('@loginRequest');

      cy.on('window:alert', (str) => {
        expect(str).to.equal('Invalid credentials');
      });
    });

    it('should redirect to /dashboard on successful login', () => {
      cy.intercept('POST', '/api/login', { user: { id: 1, email: 'user@example.com' } }).as('loginRequest');

      cy.get('input[type="email"]').type('user@example.com');
      cy.get('input[type="password"]').type('password123');
      cy.get('button[type="submit"]').click();

      cy.wait('@loginRequest');

      cy.url().should('include', '/dashboard');
    });
  });

});