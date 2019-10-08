describe('Home page test', () => {
    it('Visit the app', () => { // Test header of app
        cy.visit('/').get('header').find('a>div').contains("A51 Kanban")

    });
});
