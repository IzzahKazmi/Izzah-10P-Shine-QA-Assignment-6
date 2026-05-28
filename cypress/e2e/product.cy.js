import InventoryPage from '../pages/InventoryPage'
import ProductPage from '../pages/ProductPage'

describe('Product Detail Page', () => {

  beforeEach(() => {
    cy.loginAsStandardUser()
    cy.verifyOnInventoryPage()
    cy.goToProduct(0)
    ProductPage.shouldBeVisible()
  })

  it('shows product name', () => {
    ProductPage.shouldShowName()
  })

  it('shows product price', () => {
    ProductPage.shouldShowPrice()
  })

  it('shows product description', () => {
    ProductPage.shouldShowDescription()
  })

  it('shows product image', () => {
    ProductPage.productImage
      .should('be.visible')
      .and('have.attr', 'src')
  })

  it('Add to Cart button works', () => {
    ProductPage.addToCart()
    cy.verifyCartCount(1)
  })

  it('back button returns to inventory', () => {
    cy.goBackToInventory()
    InventoryPage.shouldBeVisible()
  })

})