describe('House List Tests', () => {
  it('Visit the page, load elements and paginate them', () => {
    cy.visit('/')
    cy.get('[data-test-id="house-list"]')
      .find('[data-test-id="house-item"]', { timeout: 12000 }).its('length').should('eq', 10)

    cy.get('[data-test-id="house-address"]').eq(0).should('contain', 'Paseo de la Castellana')

    cy.get('[data-test-id="pagination-item"]').eq(3).click()

    cy.get('[data-test-id="house-address"]').eq(0).should('contain', 'Alcala')
  })
  it('Sort items and paginate the list', () => {
    cy.visit('/')

    cy.get('[data-test-id="sort-select"]')
      .select('Address: A-Z')

    cy.get('[data-test-id="house-address"]', { timeout: 12000 }).eq(0).should('contain', 'Alcala')

    cy.get('[data-test-id="pagination-item"]').last().click()

    cy.get('[data-test-id="house-address"]').last().should('contain', 'Paseo de la Castellana')
  })
})
