import LoginPage from '../pages/LoginPage'

describe('Login — Failure Scenarios', () => {

  beforeEach(() => {
    LoginPage.visit()
  })

  it('shows error for empty credentials', () => {
    LoginPage.clickLogin()
    LoginPage.shouldShowError('Username is required')
  })

  it('shows error for empty password', () => {
    LoginPage.enterUsername('standard_user')
    LoginPage.clickLogin()
    LoginPage.shouldShowError('Password is required')
  })

  it('shows error for wrong credentials', () => {
    cy.loginFromFixture('invalidUser')
    LoginPage.shouldShowError(
      'Username and password do not match'
    )
  })

  it('shows error for locked out user', () => {
    cy.loginFromFixture('lockedUser')
    LoginPage.shouldShowError(
      'Sorry, this user has been locked out'
    )
  })

  it('error message closes when X is clicked', () => {
    LoginPage.clickLogin()
    LoginPage.shouldShowError('Username is required')
    LoginPage.closeError()
    LoginPage.shouldNotShowError()
  })

})

describe('Login — Success Flow', () => {

  it('logs in and lands on inventory page', () => {
    cy.loginAsStandardUser()
    cy.verifyOnInventoryPage()
  })

  it('homepage shows products after login', () => {
    cy.loginAsStandardUser()
    cy.get('.inventory_item')
      .should('have.length.greaterThan', 0)
  })

  it('cart icon is visible after login', () => {
    cy.loginAsStandardUser()
    cy.get('.shopping_cart_link').should('be.visible')
  })

  it('can logout successfully', () => {
    cy.loginAsStandardUser()
    cy.logout()
    cy.url().should('eq', 'https://www.saucedemo.com/')
  })

})