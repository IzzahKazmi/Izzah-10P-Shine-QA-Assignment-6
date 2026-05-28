class ProductPage {

  // --- Selectors ---
  get productName() {
    return cy.get('.inventory_details_name')
  }
  get productPrice() {
    return cy.get('.inventory_details_price')
  }
  get productDescription() {
    return cy.get('.inventory_details_desc')
  }
  get productImage() {
    return cy.get('.inventory_details_img')
  }
  get addToCartButton() {
    return cy.get('[data-test="add-to-cart"]')
  }
  get backButton() {
    return cy.get('[data-test="back-to-products"]')
  }

  // --- Actions ---
  addToCart() {
    this.addToCartButton.click()
    return this
  }

  goBack() {
    this.backButton.click()
    return this
  }

  // --- Assertions ---
  shouldBeVisible() {
    cy.url().should('include', '/inventory-item.html')
    this.productName.should('be.visible')
    return this
  }

  shouldShowName() {
    this.productName
      .should('be.visible')
      .and('not.be.empty')
    return this
  }

  shouldShowPrice() {
    this.productPrice
      .should('be.visible')
      .invoke('text')
      .should('match', /\$\d+\.\d{2}/)
    return this
  }

  shouldShowDescription() {
    this.productDescription
      .should('be.visible')
      .and('not.be.empty')
    return this
  }

}

export default new ProductPage()