describe('Test Description', () => {
  it('should have a test description with proper type', () => {
    cy.readFile('page.html').then((content) => {
      expect(content.test_description).to.be.a('string');
    });
  });
});

describe('Test File Name', () => {
  it('should have a test file name with proper type', () => {
    cy.readFile('page.html').then((content) => {
      expect(content.test_file_name).to.be.a('string');
    });
  });
});