describe('material', () => {
  beforeEach(() => cy.visit('/iframe.html?id=navigationcomponent--primary&args=navigationMenu;'));
  it('should render the component', () => {
    cy.get('projects-navigation').should('exist');
  });
});