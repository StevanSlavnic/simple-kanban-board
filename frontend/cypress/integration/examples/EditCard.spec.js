describe('Edit card', () => {
    it('All fields populated', () => {
        cy.visit('/').get('.HomePage_KanbanCardsStatus__wHq7V').find('.HomePage_SingleKanbanCard__3eMgy>div>div').find('button>span').eq(0).click().wait(1000).get('input[name="title"]').clear().type('Edit design').get('input[name="description"]').clear().type('Edit design for new project').get('select[name="assignee"]').select('vladimir-lenin').get('select[name="project"]').select('project-2').get('select[name="priority"]').select('high').get('input[name="dueDate"]').type('2020-12-31').get('select[name="category"]').select('design').get('button[type="submit"]').click().wait(2000)
        cy.visit('/').get('.HomePage_KanbanCardsStatus__wHq7V').find('.HomePage_SingleKanbanCard__3eMgy>div>div>h2').contains('Edit design')


    });

    it('Fields errors', () => {
        cy.visit('/').get('.HomePage_KanbanCardsStatus__wHq7V').find('.HomePage_SingleKanbanCard__3eMgy>div>div').find('button>span').eq(0).click().wait(1000).get('input[name="title"]').clear().get('input[name="description"]').clear().get('select[name="assignee"]').select('').get('select[name="project"]').select('').get('select[name="priority"]').select('').get('input[name="dueDate"]').clear().get('select[name="category"]').select('').get('button[type="submit"]').click().wait(2000).get('form>div>div>.FormConfig_FormInputError__23rRY')
    });
});
