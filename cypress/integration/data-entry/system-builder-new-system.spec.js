
describe('Testing sidbar actions in system builder', () => {
    beforeEach(() => {
        cy.login();
        cy.visit(`http://localhost:3000/data-entry/system/build?systemId=2`);
    });

    // add first item
    it('Can create a new system', () => {

        // EDIT OPTION

        cy.getDataCy`SystemOption-ADD_OPTION`.click();
        cy.get('.RightSidebar').should('have.class', 'open');
        cy.getDataCy`edit-option-name`.find('input').type('Set{enter}', { force: true });
        // React Select is a pain
        cy.getDataCy`edit-option-name set`.should('have.value', 'Set').should('be.visible');
        // No option values should be selected automatically
        // Clicking "+" will add the first enumerated value to the list. 
        cy.getDataCy`add-option-value`.click();
        // Select should be auto-focused
        // Typing into the select should allow us to select other values
        cy.focused().type('Center{enter}');
        cy.getDataCy`SystemOptionValue-CENTER`;
        // When values are added the option should not be changable. The select background should turn to color $warning
        // Make default
        cy.getDataCy`edit-option-name`.should('have.class', 'warning');

        cy.getDataCy`add-option-value`.click();
        cy.focused().type('Back{enter}');
        cy.getDataCy`SystemOptionValue-BACK`;

        cy.getDataCy`add-option-value`.click();
        cy.focused().type('Front{enter}');
        cy.getDataCy`SystemOptionValue-FRONT`;

        cy.getDataCy`add-option-value`.click();
        cy.focused().type('Mult-plane{enter}');
        cy.getDataCy`SystemOptionValue-MULTI_PLANE`;
        // When all values are added, the "+" should disappear
        cy.getDataCy`add-option-value`.should('not.exist')
        // Maybe add an "Add All" button later?
        // cy.focused().blur();
        // values should all exist after being entered
        cy.getDataCy`edit-option-values back`.should('have.value', 'Back');
        cy.getDataCy`edit-option-values center`.should('have.value', 'Center');
        cy.getDataCy`edit-option-values front`.should('have.value', 'Front');
        cy.getDataCy`edit-option-values multi_plane`.should('have.value', 'Multi Plane');
        // Clicking the "X" should remove the value
        cy.getDataCy`delete-option-value-CENTER`.click().should('not.exist');
        cy.getDataCy`edit-option-values center`.should('not.exist');

        // EDIT VALUE

        cy.getDataCy`SystemOptionValue-MULTI_PLANE`.click();
        cy.get('.RightSidebar').should('be.visible').and('have.class', 'open');
        // can change value name
        cy.getDataCy`edit-value-name`.find('input').type('Center{enter}', { force: true });
        // -- (only after business logic is defined) -- can mark as mirrored and not mirrored
        // can select option or details as child/children
        cy.getDataCy`toggle-child-option`.click().should('have.class', 'selected');
        // can add option
        // add option button should disappear when clicked
        cy.getDataCy`add-option`.click().should('not.exist');
        // cannot toggle to detail when option exists
        cy.getDataCy`toggle-child-detail`.click({ force: true }).should('not.have.class', 'selected');
        // can change option
        cy.getDataCy`edit-option-name`.find('input').type('Joinery{enter}', { force: true });

        // can remove option
        cy.getDataCy`delete-option`.click();
        // can switch to detail when option is deleted
        cy.getDataCy`toggle-child-detail`.click().should('have.class', 'selected');
        // can add detail
        cy.getDataCy`add-detail`.click();
        // can change detail
        // detail select should autofocus
        cy.focused().type('Head{enter}');
        // cannot toggle to option when detail exists
        cy.getDataCy`toggle-child-option`.click({ force: true }).should('not.have.class', 'selected');
        // can remove detail
        cy.getDataCy`delete-detail-type-HEAD`.click().should('not.exist');
        cy.get('.RightSidebar').find('.Select > div:first-child').contains(/head/i).should('not.exist');
        // can toggle back to option when all details deleted
        cy.getDataCy`toggle-child-option`.click().should('have.class', 'selected');
        // can add option
        cy.getDataCy`add-option`.click().should('not.exist');
        cy.focused().type('Joinery{enter}', { force: true });
        // delete option
        cy.getDataCy`delete-option`.click();
        cy.getDataCy`toggle-child-detail`.click().should('have.class', 'selected');
        cy.getDataCy`add-detail`.click();
        cy.focused().type('Head{enter}');

        // Can select detail
        cy.getDataCy`SystemDetail-HEAD`.click();
        cy.getDataCy`edit-detail-type`.find('input').type('Horizontal{enter}', { force: true });
        cy.getDataCy`add-option`.click().should('not.exist');
        cy.focused().type('Stops{enter}');
        cy.getDataCy`delete-option`.click();
        cy.getDataCy`add-option`.click().should('not.exist');
        cy.focused().type('Stops{enter}');
        // Can select option
        cy.getDataCy`DetailOption-STOPS`.click();
        // Can add/delete option value
        cy.getDataCy`add-option-value`.click();
        cy.focused().type('Down{enter}');
        cy.getDataCy`delete-option-value-DOWN`.click({ force: true });
        cy.getDataCy`add-option-value`.click();
        cy.focused().type('Down{enter}');
        cy.getDataCy`DetailOptionValue-DOWN`;
        cy.getDataCy`add-option-value`.click().should('not.exist');
        cy.focused().type('Up{enter}');
        cy.getDataCy`DetailOptionValue-UP`;

        // cy.focused().blur();

        // All detail option values should exist after adding them
        cy.getDataCy`edit-option-values down`.should('have.value', 'Down');
        cy.getDataCy`edit-option-values up`.should('have.value', 'Up');

        cy.getDataCy`DetailOptionValue-UP`.click();
        // Can toggle to configuration
        cy.getDataCy`toggle-child-configuration`.click().should('have.class', 'selected');
        // Can add/delete configurations
        cy.getDataCy`add-configuration`.click();
        cy.focused().type('Head{enter}');
        cy.getDataCy`delete-configuration-type-HEAD`.click({ force: true });
        cy.getDataCy`add-configuration`.click();
        cy.focused().type('Head{enter}');
        cy.getDataCy`SystemConfiguration-HEAD`;
        // cannot toggle to option when option exists
        cy.getDataCy`toggle-child-option`.click({ force: true }).should('not.have.class', 'selected');

        cy.getDataCy`add-configuration`.click();
        cy.focused().type('Compensating{enter}');
        cy.getDataCy`SystemConfiguration-COMPENSATING_RECEPTOR`;

        // Need to tie configurations to STDTCT
        cy.getDataCy`add-configuration`.click()
        // .should('not.exist');
        cy.focused().type('Shim{enter}');
        cy.getDataCy`SystemConfiguration-SHIM_SUPPORT`;

        cy.focused().blur();

        // All configurations should exist after adding them
        cy.getDataCy`edit-Configuration-type-HEAD head`.should('have.value', 'Head');
        cy.getDataCy`edit-Configuration-type-COMPENSATING_RECEPTOR compensating_receptor`.should('have.value', 'Compensating Receptor');
        cy.getDataCy`edit-Configuration-type-SHIM_SUPPORT shim_support`.should('have.value', 'Shim Support');

        // Can add configuration option
        cy.getDataCy`SystemConfiguration-COMPENSATING_RECEPTOR`.click();
        cy.getDataCy`add-option`.click().should('not.exist');
        cy.focused().type('Durability{enter}');
        cy.getDataCy`ConfigurationOption-DURABILITY`.click();

        cy.getDataCy`add-option-value`.click();
        cy.focused().type('Standard Duty{enter}');
        cy.getDataCy`delete-option-value-STANDARD_DUTY`.click();
        cy.getDataCy`add-option-value`.click();
        cy.focused().type('Standard{enter}');
        cy.getDataCy`ConfigurationOptionValue-STANDARD_DUTY`;

        cy.getDataCy`add-option-value`.click().should('not.exist');
        cy.focused().type('Heavy{enter}');
        cy.getDataCy`ConfigurationOptionValue-HIGH_PERFORMANCE`;

        // All configurations option values should exist after adding them
        cy.getDataCy`edit-option-values standard_duty`.should('have.value', 'Standard Duty');
        cy.getDataCy`edit-option-values high_performance`.should('have.value', 'High Performance');

        // ADD CONFIRMATION TO UPDATE VALUES AND CONFIGURATIONS WITH CHILDREN

        //Value has children
        cy.getDataCy`SystemOptionValue-BACK`.click();
        cy.getDataCy`edit-option-value-delete-button`.click();
        cy.getDataCy`SystemOptionValue-FRONT`.click();
        cy.getDataCy`toggle-child-detail`.click()
        cy.getDataCy`add-detail`.click();
        cy.focused().type('Mullion{enter}');
        cy.getDataCy`edit-value-name`.click();
        cy.getDataCy`edit-value-name`.find('input').type('Back{enter}', { force: true });
        cy.getDataCy`modal`.should('exist');
        cy.getDataCy`modal-finish-button`.click();

        //Type has children
        cy.getDataCy`SystemDetail-MULLION`.click();
        cy.getDataCy`add-option`.click();
        cy.focused().type('Joinery{enter}');
        cy.getDataCy`edit-detail-type mullion`.click().type('Jamb{enter}', { force: true });
        cy.getDataCy`modal`.should('exist');
        cy.getDataCy`modal-finish-button`.click();

        // ADD CONFIRMATION TO DELETE ACTIONS WHENEVER AN ITEM HAS CHILDREN

        //Option Has children
        cy.getDataCy`ConfigurationOption-DURABILITY`.click();
        cy.getDataCy`edit-option-delete-button`.click();
        cy.getDataCy`modal`.should('exist');
        cy.getDataCy`modal-cancel-button`.click();
        cy.getDataCy`ConfigurationOption-DURABILITY`.should('exist');
        cy.getDataCy`SystemConfiguration-COMPENSATING_RECEPTOR`.click();
        cy.getDataCy`delete-option`.click();
        cy.getDataCy`modal`.should('exist');
        cy.getDataCy`modal-finish-button`.click();
        cy.getDataCy`ConfigurationOption-DURABILITY`.should('not.exist');

        //Value has children
        cy.getDataCy`DetailOptionValue-UP`.click();
        cy.getDataCy`edit-option-value-delete-button`.click({ force: true });
        cy.getDataCy`modal`.should('exist');
        cy.getDataCy`modal-cancel-button`.click();
        cy.getDataCy`DetailOption-STOPS`.click();
        cy.getDataCy`delete-option-value-UP`.click();
        cy.getDataCy`modal`.should('exist');
        cy.getDataCy`modal-finish-button`.click();
        cy.getDataCy`DetailOptionValue-UP`.should('not.exist');

        //Type has children
        cy.getDataCy`SystemDetail-HORIZONTAL`.click();
        cy.getDataCy`edit-type-delete-button`.click();
        cy.getDataCy`modal`.should('exist');
        cy.getDataCy`modal-cancel-button`.click();
        cy.getDataCy`modal`.should('not.exist');
        cy.getDataCy`SystemDetail-HORIZONTAL`.should('exist');
        cy.getDataCy`SystemOptionValue-CENTER`.click();
        cy.getDataCy`delete-detail-type-HORIZONTAL`.click({ force: true });
        cy.getDataCy`modal`.should('exist');
        cy.getDataCy`modal-cancel-button`.click();
        cy.getDataCy`modal`.should('not.exist');
        cy.getDataCy`SystemDetail-HORIZONTAL`.should('exist');

        //Value doesn't have children
        cy.getDataCy`DetailOptionValue-DOWN`.click();
        cy.getDataCy`edit-option-value-delete-button`.click({ force: true });
        cy.getDataCy`modal`.should('not.exist');
        cy.getDataCy`DetailOptionValue-DOWN`.should('not.exist');

        //Option doesn't have children
        cy.getDataCy`DetailOption-STOPS`.click();
        cy.getDataCy`edit-option-delete-button`.click({ force: true });
        cy.getDataCy`modal`.should('not.exist');
        cy.getDataCy`DetailOptionValue-UP`.should('not.exist');

        //Type doesn't have children
        cy.getDataCy`SystemDetail-HORIZONTAL`.click();
        cy.getDataCy`edit-type-delete-button`.click({ force: true });
        cy.getDataCy`modal`.should('not.exist');
        cy.getDataCy`DetailOptionValue-UP`.should('not.exist');

        // Test that select options have the correct values listed

        // Clicks on an option.

        // X Adds a value (probably part of options)

        // clicks on the value and checks to make sure its selected and is a value

        // clicks the name and changes it => makes sure it is updated

        // clicks makes default => is default => default button disappears? (or changes test to default?)

        // clicks add Detail => 
        // Adds the detail and hides the add option

        // Delete Value => deletes the value (default should change to another value if other value exists)


        // cy.getDataCy`SystemOptionValue-BACK`;
        // cy.getDataCy`SystemOptionValue-FRONT`;
        // cy.getDataCy`SystemOptionValue-MULTI_PLANE`;
        // cy.getDataCy`toggle-child-option`.click();
        // cy.getDataCy`edit-option-name`.find('input').type('Joinery{enter}', { force: true });
        // cy.getDataCy`edit-option-name`.find('div > div > div').contains('Joinery').should('be.visible');

        // cy.getDataCy`SystemOption-JOINERY`.click();
        // // cy.getDataCy`edit-option-values`.contains(/shear/i);
        // // cy.getDataCy`edit-option-values`.contains(/stick/i);
        // // cy.getDataCy`edit-option-values`.contains(/type/i);
        // // cy.getDataCy`edit-option-values`.contains(/screw/i);

        // cy.getDataCy`SystemOptionValue-SCREW_SPLINE`.click();
        // cy.getDataCy`toggle-child-detail`.click();
        // // cy.getDataCy`edit-detail-types`.contains(/head/i);
        // // cy.getDataCy`edit-detail-types`.contains(/horizontal/i);
        // // cy.getDataCy`edit-detail-types`.contains(/sill/i);
        // // cy.getDataCy`edit-detail-types`.contains(/jamb/i);
        // // cy.getDataCy`edit-detail-types`.contains(/mullion/i);

        // cy.getDataCy`SystemDetail-HEAD`.click();
        // // cy.getDataCy`toggle-child-option`.click();
        // cy.getDataCy`edit-option-name`.find('input').type('Stops{enter}', { force: true });
        // cy.getDataCy`edit-option-name`.find('div > div > div').contains('Stops').should('be.visible');

        // // cy.getDataCy`SystemOption-SIGHTLINE`.click();
        // cy.getDataCy`edit-option-values`.contains(/4\.5"/i);
        // cy.getDataCy`edit-option-values`.contains(/2"/i);
        // cy.getDataCy`edit-option-values`.contains(/variable/i);

        // // cy.getDataCy`SystemOption-2`.click();
        // cy.getDataCy`DetailOption-STOPS`.click();
        // // cy.getDataCy`edit-option-values`.contains(/up/i);
        // // cy.getDataCy`edit-option-values`.contains(/down/i);

        // cy.getDataCy`DetailOptionValue-UP`.click();
        // cy.getDataCy`toggle-child-configuration`.click();
        // // cy.getDataCy`edit-configuration-types`.contains(/head/i);
        // // cy.getDataCy`edit-configuration-types`.contains(/receptor/i);
        // // cy.getDataCy`edit-configuration-types`.contains(/shim/i);
    });

    // add first item
    // it('Can add detail to empty system', () => {
    //     cy.getDataCy`add-detail`.click();
    //     cy.get('.RightSidebar').should('have.class', 'open');
    //     cy.getDataCy`edit-detail-name`.type('Head{enter}');
    // });


    // views
    // SystemOption
    // it('Can change option name', () => {
    //     cy.getDataCy`edit-option-name`.find('input').type('Set{enter}', {force:true});
    // });

    // it('Can change option value"s', () => {
    // });

    // it('Can delete option', () => {
    //     cy.getDataCy`delete-option`.click();
    // });
    // SystemOptionValue
    // SystemDetail
    // DetailOption
    // DetailOptionValue
    // SystemConfiguration
    // ConfigurationOption
    // ConfigurationOptionValue

    // deselection
    // cy.getDataCy`SystemOption-set`.click().should('have.class', 'selected');
    // cy.getDataCy`SystemOption-set`.should('not.have.class', 'selected');
});