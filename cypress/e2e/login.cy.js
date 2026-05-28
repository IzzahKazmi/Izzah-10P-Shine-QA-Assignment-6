describe('Login — Failure Scenarios', () => {

  beforeEach(() => { cy.visit('/') })

  it('shows error for empty credentials', () => {
    cy.get('[data-test="login-button"]').click()
    cy.verifyErrorMessage('Username is required')
  })

  it('shows error for wrong credentials', () => {
    cy.login('wrong_user', 'wrong_pass')
    cy.verifyErrorMessage(
      'Username and password do not match'
    )
  })

  it('shows error for locked out user', () => {
    cy.loginFromFixture('lockedUser')
    cy.verifyErrorMessage(
      'Sorry, this user has been locked out'
    )
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

})