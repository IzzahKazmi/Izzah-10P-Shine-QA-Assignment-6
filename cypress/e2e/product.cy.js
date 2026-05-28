describe('Product Detail Page', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-test="username"]')
      .type('standard_user')
    cy.get('[data-test="password"]')
      .type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.url().should('include', '/inventory.html')
  })

  it('navigates to product detail page on click', () => {
    cy.get('.inventory_item_name').first().click()
    cy.url().should('include', '/inventory-item.html')
  })

  it('product detail page shows product name', () => {
    cy.get('.inventory_item_name').first()
      .invoke('text').as('productName')
    cy.get('.inventory_item_name').first().click()
    cy.get('.inventory_details_name')
      .should('be.visible')
      .and('not.be.empty')
  })

  it('product detail page shows price', () => {
    cy.get('.inventory_item_name').first().click()
    cy.get('.inventory_details_price')
      .should('be.visible')
      .invoke('text')
      .should('match', /\$\d+\.\d{2}/)
  })

  it('product detail page shows description', () => {
    cy.get('.inventory_item_name').first().click()
    cy.get('.inventory_details_desc')
      .should('be.visible')
      .and('not.be.empty')
  })

  it('product detail page shows product image', () => {
    cy.get('.inventory_item_name').first().click()
    cy.get('.inventory_details_img')
      .should('be.visible')
      .and('have.attr', 'src')
  })

  it('Add to Cart button exists on detail page', () => {
    cy.get('.inventory_item_name').first().click()
    cy.get('[data-test="add-to-cart"]')
      .should('be.visible')
  })

  it('Back button returns to inventory list', () => {
    cy.get('.inventory_item_name').first().click()
    cy.get('[data-test="back-to-products"]').click()
    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_list').should('be.visible')
  })

})