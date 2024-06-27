// cypress/integration/login.spec.js

describe('Login Page Tests', () => {
  const email = 'test@example.com';
  const invalidEmail = 'invalid@example.com';
  const password = 'password123';
  const shortPassword = 'short';

  beforeEach(() => {
    cy.visit('/login');
  });

  context('Initial Page Load', () => {
    it('Should render the login form with empty fields', () => {
      cy.get('input[type="email"]').should('have.value', '');
      cy.get('input[type="password"]').should('have.value', '');
      cy.get('button[type="submit"]').should('contain', 'Login');
    });
  });

  context('Form Validation', () => {
    describe('Email Field', () => {
      it('Should display an error message for invalid email format', () => {
        cy.get('input[type="email"]').type('invalid-email');
        cy.get('input[type="email"]:invalid').should('exist');
      });

      it('Should accept a valid email format', () => {
        cy.get('input[type="email"]').type(email);
        cy.get('input[type="email"]:invalid').should('not.exist');
      });
    });

    describe('Password Field', () => {
      it('Should not allow short passwords', () => {
        cy.get('input[type="password"]').type(shortPassword);
        cy.get('input[type="password"]:invalid').should('exist');
      });

      it('Should accept a valid password format', () => {
        cy.get('input[type="password"]').clear().type(password);
        cy.get('input[type="password"]:invalid').should('not.exist');
      });
    });
  });

  context('Login Functionality', () => {
    describe('With Valid Credentials', () => {
      it('Should log in successfully and redirect to dashboard', () => {
        cy.intercept('POST', '/api/login', {
          statusCode: 200,
          body: { user: { id: 1, email } },
        }).as('loginRequest');

        cy.get('input[type="email"]').type(email);
        cy.get('input[type="password"]').type(password);
        cy.get('button[type="submit"]').click();

        cy.wait('@loginRequest').then((interception) => {
          expect(interception.response.statusCode).to.equal(200);
          cy.url().should('eq', `${Cypress.config('baseUrl')}/dashboard`);
        });
      });
    });

    describe('With Invalid Credentials', () => {
      it('Should show an alert for invalid credentials', () => {
        cy.intercept('POST', '/api/login', {
          statusCode: 401,
          body: { error: 'Invalid credentials' },
        }).as('loginRequest');

        cy.get('input[type="email"]').type(invalidEmail);
        cy.get('input[type="password"]').type(password);
        cy.get('button[type="submit"]').click();

        cy.wait('@loginRequest').then((interception) => {
          expect(interception.response.statusCode).to.equal(401);
          cy.on('window:alert', (text) => {
            expect(text).to.contains('Invalid credentials');
          });
          // Alternatively, if a custom error message element is present:
          // cy.get('.error-message').should('contain', 'Invalid credentials');
        });
      });
    });
  });
});