describe('Authentication and Routing', () => {

  beforeEach(() => {
    // Before each test, visit the application
    cy.visit('/');
  });

  context('Initial Setup', () => {
    it('Should redirect to /login by default', () => {
      cy.url().should('include', '/login');
    });
  });

  context('Login Page', () => {

    it('Should have a Login Form', () => {
      cy.get('form').should('be.visible');
    });

    it('Should not redirect on invalid credentials', () => {
      cy.get('input[name="username"]').type('invalid_user');
      cy.get('input[name="password"]').type('invalid_password');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/login');
    });

    it('Should redirect to /dashboard on valid credentials', () => {
      cy.get('input[name="username"]').clear().type('valid_user');
      cy.get('input[name="password"]').clear().type('valid_password');
      cy.get('button[type="submit"]').click();

      cy.url().should('include', '/dashboard');

      // Check if dashboard component is loaded correctly
      cy.contains('Dashboard').should('be.visible');
    });
  });

  context('Dashboard Page', () => {

    beforeEach(() => {
      // Log in before accessing dashboard
      cy.get('input[name="username"]').clear().type('valid_user');
      cy.get('input[name="password"]').clear().type('valid_password');
      cy.get('button[type="submit"]').click();
    });

    it('Should display the Dashboard after login', () => {
      cy.url().should('include', '/dashboard');
    });

    it('Should redirect to /login if not authenticated', () => {
      // simulate logging out or having no user session
      cy.visit('/');
      cy.clearCookies();
      cy.visit('/dashboard');

      cy.url().should('include', '/login');
    });
  });

  context('Overall App Behavior', () => {
    it('Should handle direct URL access correctly', () => {
      // Attempt to access the dashboard without logging in
      cy.visit('/dashboard');
      cy.url().should('include', '/login');
    });

    it('Should redirect to dashboard if already logged in', () => {
      // Log in
      cy.get('input[name="username"]').clear().type('valid_user');
      cy.get('input[name="password"]').clear().type('valid_password');
      cy.get('button[type="submit"]').click();
      cy.visit('/login');

      cy.url().should('include', '/dashboard');
    });

    it('Should be able to log out', () => {
      // Assume there's a logout button in the dashboard
      cy.get('input[name="username"]').clear().type('valid_user');
      cy.get('input[name="password"]').clear().type('valid_password');
      cy.get('button[type="submit"]').click();

      cy.contains('Logout').click();

      // The URL should reroute to login
      cy.url().should('include', '/login');
    });
  });
});