// Test case 1: Check if the HTML page is correctly rendered
describe('HTML Rendering', function() {
    it('Successfully loads HTML page', function() {
        cy.visit('page.html') // change URL to match your dev URL
    })
})

// Test case 2: Check if title is correctly rendered
describe('Title', function() {
    it('Check title', function() {
        cy.visit('page.html') // change URL to match your dev URL
        cy.title().should('include', 'Simple Page with Navbar and Card')
    })
})

// Test case 3: Check if navbar is correctly rendered
describe('Navbar', function() {
    it('Check navbar', function() {
        cy.visit('page.html') // change URL to match your dev URL
        cy.get('.navbar').should('exist')
        cy.get('.navbar a').should('have.length', 5)
    })
})

// Test case 4: Check if card is correctly rendered
describe('Card', function() {
    it('Check card', function() {
        cy.visit('page.html') // change URL to match your dev URL
        cy.get('.card').should('exist')
        cy.get('.card h1').should('contain', 'Welcome!')
        cy.get('.card p').should('contain', 'This is a simple card in the center of the page.')
    })
})
