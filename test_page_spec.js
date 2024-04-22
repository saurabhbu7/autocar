describe('Webpage elements and functionality', () => {
  it('should have a test description', () => {
    cy.visit('path/to/page.html');
    cy.get('.test-description').should('be.visible');
  });

  it('should have a test file name', () => {
    cy.visit('path/to/page.html');
    cy.get('.test-file-name').should('be.visible');
  });
});
