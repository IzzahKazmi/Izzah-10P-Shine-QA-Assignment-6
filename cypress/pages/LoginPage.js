class LoginPage {

  // --- Selectors ---
  get usernameInput() {
    return cy.get('[data-test="username"]')
  }
  get passwordInput() {
    return cy.get('[data-test="password"]')
  }
  get loginButton() {
    return cy.get('[data-test="login-button"]')
  }
  get errorMessage() {
    return cy.get('[data-test="error"]')
  }
  get errorCloseButton() {
    return cy.get('.error-button')
  }

  // --- Actions ---
  visit() {
    cy.visit('/')
  }

  enterUsername(username) {
    this.usernameInput.clear().type(username)
    return this
  }

  enterPassword(password) {
    this.passwordInput.clear().type(password)
    return this
  }

  clickLogin() {
    this.loginButton.click()
    return this
  }

  login(username, password) {
    this.enterUsername(username)
    this.enterPassword(password)
    this.clickLogin()
    return this
  }

  // --- Assertions ---
  shouldShowError(message) {
    this.errorMessage
      .should('be.visible')
      .and('contain', message)
    return this
  }

  shouldNotShowError() {
    this.errorMessage.should('not.exist')
    return this
  }

  closeError() {
    this.errorCloseButton.click()
    return this
  }

}

export default new LoginPage()