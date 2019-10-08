describe('Create card', () => {
    it('Visit the app', () => {
        cy.visit('/').get('main').find('button').contains('Create new task').click().get('input[name="title"]').type('Create design').get('input[name="description"]').type('Create design for new project').get('select[name="assignee"]').select('karl-marx').get('select[name="project"]').select('project-1').get('select[name="priority"]').select('medium').get('input[name="dueDate"]').type('2020-12-31').get('select[name="category"]').select('design').get('button[type="submit"]').click().wait(2000)

        cy.visit('/').get('.HomePage_KanbanCardsStatus__wHq7V').find('.HomePage_SingleKanbanCard__3eMgy>div>div>h2').contains('Create design')
    });

    it('Fields errors', () => {
        cy.visit('/').get('main').find('button').contains('Create new task').click().wait(1000).get('button[type="submit"]').click().wait(2000).get('form>div>div>.FormConfig_FormInputError__23rRY')
    });

});
