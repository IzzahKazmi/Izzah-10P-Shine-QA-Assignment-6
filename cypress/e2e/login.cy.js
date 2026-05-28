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

describe('Login — Success Flow', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('logs in with valid credentials', () => {
    cy.get('[data-test="username"]')
      .type('standard_user')
    cy.get('[data-test="password"]')
      .type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    // After login, URL should change to /inventory.html
    cy.url().should('include', '/inventory.html')
  })

  it('shows the inventory page header after login', () => {
    cy.get('[data-test="username"]')
      .type('standard_user')
    cy.get('[data-test="password"]')
      .type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.get('.title')
      .should('be.visible')
      .and('contain', 'Products')
  })

  it('homepage shows product list after login', () => {
    cy.get('[data-test="username"]')
      .type('standard_user')
    cy.get('[data-test="password"]')
      .type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.get('.inventory_list')
      .should('be.visible')
    cy.get('.inventory_item')
      .should('have.length.greaterThan', 0)
  })

  it('shows shopping cart icon after login', () => {
    cy.get('[data-test="username"]')
      .type('standard_user')
    cy.get('[data-test="password"]')
      .type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.get('.shopping_cart_link')
      .should('be.visible')
  })

  it('hamburger menu is accessible after login', () => {
    cy.get('[data-test="username"]')
      .type('standard_user')
    cy.get('[data-test="password"]')
      .type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.get('#react-burger-menu-btn')
      .should('be.visible')
  })

})