describe('Mi aplicación', () => {
  it('Debe cargar la página de inicio', () => {
    cy.visit('/') 
    cy.contains('Bienvenido') 
  })
})
