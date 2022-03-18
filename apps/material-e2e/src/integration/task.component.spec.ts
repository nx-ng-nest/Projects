describe('material', () => {
  beforeEach(() => cy.visit('/iframe.html?id=taskcomponent--primary'));
  it('should render the component', () => {
    cy.get('projects-task').should('exist');
  });
});