describe('Login — Failure Scenarios', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('shows error for empty username and password', () => {
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username is required')
  })

  it('shows error for empty password', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Password is required')
  })

  it('shows error for wrong credentials', () => {
    cy.get('[data-test="username"]').type('wrong_user')
    cy.get('[data-test="password"]').type('wrong_pass')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain',
        'Username and password do not match')
  })

  it('shows error for locked out user', () => {
    cy.get('[data-test="username"]')
      .type('locked_out_user')
    cy.get('[data-test="password"]')
      .type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Sorry, this user has been locked out')
  })

  it('error message has X button that closes it', () => {
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]').should('be.visible')
    cy.get('.error-button').click()
    cy.get('[data-test="error"]').should('not.exist')
  })

})