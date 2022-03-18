describe('material', () => {
  beforeEach(() => cy.visit('/iframe.html?id=dashboardcomponent--primary'));
  it('should render the component', () => {
    cy.get('projects-dashboard').should('exist');
  });
});