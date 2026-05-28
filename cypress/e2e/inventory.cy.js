import InventoryPage from '../pages/InventoryPage'

describe('Inventory Page', () => {

  beforeEach(() => {
    cy.loginAsStandardUser()
    cy.verifyOnInventoryPage()
  })

  it('displays exactly 6 products', () => {
    InventoryPage.shouldHaveProductCount(6)
  })

  it('shows Products title', () => {
    InventoryPage.shouldShowTitle('Products')
  })

  it('each product has a name', () => {
    InventoryPage.productNames.each(($el) => {
      cy.wrap($el).should('not.be.empty')
    })
  })

  it('each product has a price', () => {
    InventoryPage.productPrices.each(($el) => {
      cy.wrap($el)
        .invoke('text')
        .should('match', /\$\d+\.\d{2}/)
    })
  })

  it('each product has an Add to Cart button', () => {
    InventoryPage.addToCartButtons
      .should('have.length', 6)
  })

  it('sorts by price low to high', () => {
    InventoryPage.sortBy('lohi')
    InventoryPage.productPrices.then(($prices) => {
      const prices = [...$prices].map(
        el => parseFloat(el.innerText.replace('$',''))
      )
      expect(prices).to.deep.equal(
        [...prices].sort((a,b) => a - b)
      )
    })
  })

  it('sorts by name A to Z', () => {
    InventoryPage.sortBy('az')
    InventoryPage.productNames.then(($names) => {
      const names = [...$names].map(el => el.innerText)
      expect(names).to.deep.equal([...names].sort())
    })
  })

  it('can add first product to cart', () => {
    cy.addFirstProductToCart()
    cy.verifyCartCount(1)
  })

})