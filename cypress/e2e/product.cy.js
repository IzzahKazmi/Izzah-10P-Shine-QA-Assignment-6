import InventoryPage from '../pages/InventoryPage'
import LoginPage from '../pages/LoginPage'
import ProductPage from '../pages/ProductPage'

describe('Product Detail Page — with POM', () => {

  beforeEach(() => {
    LoginPage.visit()
    LoginPage.login('standard_user', 'secret_sauce')
    InventoryPage.shouldBeVisible()
    InventoryPage.clickProductByIndex(0)
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

  it('back button returns to inventory', () => {
    ProductPage.goBack()
    InventoryPage.shouldBeVisible()
  })

})