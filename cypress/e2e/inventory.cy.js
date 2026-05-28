import InventoryPage from '../pages/InventoryPage'
import LoginPage from '../pages/LoginPage'

describe('Inventory Page — with POM', () => {

  beforeEach(() => {
    LoginPage.visit()
    LoginPage.login('standard_user', 'secret_sauce')
    InventoryPage.shouldBeVisible()
  })

  it('shows 6 products', () => {
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

  it('sorts products by price low to high', () => {
    InventoryPage.sortBy('lohi')
    InventoryPage.productPrices.then(($prices) => {
      const vals = [...$prices].map(
        el => parseFloat(el.innerText.replace('$',''))
      )
      expect(vals).to.deep.equal([...vals].sort((a,b)=>a-b))
    })
  })

})