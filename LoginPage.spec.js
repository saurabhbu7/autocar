describe('Login Page', () => {
    it('successfully loads', () => {
        cy.visit('http://localhost:3000/login') // replace with your login page url
    })

    it('inputs username', () => {
        cy.get('input[name=username]').type('testUser')
    })

    it('inputs password', () => {
        cy.get('input[name=password]').type('testPassword')
    })

    it('submits the form', () => {
        cy.get('button[type=submit]').click()
    })
})
