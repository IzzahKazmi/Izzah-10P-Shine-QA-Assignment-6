// --- LOGIN COMMANDS ---

// Login with username and password arguments
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/')
  cy.get('[data-test="username"]').type(username)
  cy.get('[data-test="password"]').type(password)
  cy.get('[data-test="login-button"]').click()
})

// Login as the standard user (most common case)
Cypress.Commands.add('loginAsStandardUser', () => {
  cy.login('standard_user', 'secret_sauce')
})

// Login using fixture file credentials
Cypress.Commands.add('loginFromFixture', (userType) => {
  cy.fixture('users').then((users) => {
    const user = users[userType]
    cy.login(user.username, user.password)
  })
})

// --- NAVIGATION COMMANDS ---

// Navigate to a specific product by its index (0 = first)
Cypress.Commands.add('goToProduct', (index = 0) => {
  cy.get('.inventory_item_name').eq(index).click()
})

// Go back to inventory list from product detail page
Cypress.Commands.add('goBackToInventory', () => {
  cy.get('[data-test="back-to-products"]').click()
  cy.url().should('include', '/inventory.html')
})

// Open the hamburger menu
Cypress.Commands.add('openMenu', () => {
  cy.get('#react-burger-menu-btn').click()
  cy.get('.bm-menu').should('be.visible')
})

// Logout via hamburger menu
Cypress.Commands.add('logout', () => {
  cy.openMenu()
  cy.get('#logout_sidebar_link').click()
  cy.url().should('include', '/')
})

// --- CART COMMANDS ---

// Add first product on inventory page to cart
Cypress.Commands.add('addFirstProductToCart', () => {
  cy.get('.btn_inventory').first().click()
})

// Verify cart badge shows expected count
Cypress.Commands.add('verifyCartCount', (count) => {
  cy.get('.shopping_cart_badge')
    .should('be.visible')
    .and('have.text', String(count))
})

// --- ASSERTION HELPERS ---

// Verify we are on the inventory page
Cypress.Commands.add('verifyOnInventoryPage', () => {
  cy.url().should('include', '/inventory.html')
  cy.get('.inventory_list').should('be.visible')
})

// Verify error message contains text
Cypress.Commands.add('verifyErrorMessage', (text) => {
  cy.get('[data-test="error"]')
    .should('be.visible')
    .and('contain', text)
})