describe('Inventory Page — Product Listing', () => {

  beforeEach(() => {
    // Log in before each test
    cy.visit('/')
    cy.get('[data-test="username"]')
      .type('standard_user')
    cy.get('[data-test="password"]')
      .type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.url().should('include', '/inventory.html')
  })

  it('displays exactly 6 products', () => {
    cy.get('.inventory_item')
      .should('have.length', 6)
  })

  it('each product has a name visible', () => {
    cy.get('.inventory_item_name')
      .each(($el) => {
        cy.wrap($el).should('not.be.empty')
      })
  })

  it('each product has a price visible', () => {
    cy.get('.inventory_item_price')
      .each(($el) => {
        cy.wrap($el)
          .invoke('text')
          .should('match', /\$\d+\.\d{2}/)
      })
  })

  it('each product has an Add to Cart button', () => {
    cy.get('.btn_inventory')
      .should('have.length', 6)
  })

  it('can sort products by price low to high', () => {
    cy.get('.product_sort_container')
      .select('lohi')
    cy.get('.inventory_item_price').then(($prices) => {
      const prices = [...$prices].map(
        el => parseFloat(el.innerText.replace('$',''))
      )
      const sorted = [...prices].sort((a,b) => a - b)
      expect(prices).to.deep.equal(sorted)
    })
  })

  it('can sort products by name A to Z', () => {
    cy.get('.product_sort_container')
      .select('az')
    cy.get('.inventory_item_name').then(($names) => {
      const names = [...$names].map(el => el.innerText)
      const sorted = [...names].sort()
      expect(names).to.deep.equal(sorted)
    })
  })

})