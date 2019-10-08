describe('Drag test', () => {
    it('Drag and drop card', () => {
        cy.visit('/');
        cy.get(".HomePage_SingleKanbanCard__3eMgy").trigger("mousedown", {which: 1})

        cy.get(".HomePage_KanbanCardsStatus__wHq7V").eq(1).trigger("mousemove").trigger("mouseup")
    });
});
