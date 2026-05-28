class InventoryPage {

  // --- Selectors ---
  get productList() {
    return cy.get('.inventory_list')
  }
  get productItems() {
    return cy.get('.inventory_item')
  }
  get productNames() {
    return cy.get('.inventory_item_name')
  }
  get productPrices() {
    return cy.get('.inventory_item_price')
  }
  get addToCartButtons() {
    return cy.get('.btn_inventory')
  }
  get sortDropdown() {
    return cy.get('.product_sort_container')
  }
  get cartIcon() {
    return cy.get('.shopping_cart_link')
  }
  get pageTitle() {
    return cy.get('.title')
  }

  // --- Actions ---
  clickProductByIndex(index = 0) {
    this.productNames.eq(index).click()
    return this
  }

  clickProductByName(name) {
    cy.contains('.inventory_item_name', name).click()
    return this
  }

  addToCartByIndex(index = 0) {
    this.addToCartButtons.eq(index).click()
    return this
  }

  sortBy(value) {
    this.sortDropdown.select(value)
    return this
  }

  // --- Assertions ---
  shouldBeVisible() {
    cy.url().should('include', '/inventory.html')
    this.productList.should('be.visible')
    return this
  }

  shouldHaveProductCount(count) {
    this.productItems.should('have.length', count)
    return this
  }

  shouldShowTitle(text) {
    this.pageTitle.should('contain', text)
    return this
  }

}

export default new InventoryPage()