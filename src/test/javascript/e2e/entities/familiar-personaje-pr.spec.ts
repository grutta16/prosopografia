import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('FamiliarPersonaje e2e test', () => {

    let navBarPage: NavBarPage;
    let familiarPersonajeDialogPage: FamiliarPersonajeDialogPage;
    let familiarPersonajeComponentsPage: FamiliarPersonajeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load FamiliarPersonajes', () => {
        navBarPage.goToEntity('familiar-personaje-pr');
        familiarPersonajeComponentsPage = new FamiliarPersonajeComponentsPage();
        expect(familiarPersonajeComponentsPage.getTitle())
            .toMatch(/prosopografiaApp.familiarPersonaje.home.title/);

    });

    it('should load create FamiliarPersonaje dialog', () => {
        familiarPersonajeComponentsPage.clickOnCreateButton();
        familiarPersonajeDialogPage = new FamiliarPersonajeDialogPage();
        expect(familiarPersonajeDialogPage.getModalTitle())
            .toMatch(/prosopografiaApp.familiarPersonaje.home.createOrEditLabel/);
        familiarPersonajeDialogPage.close();
    });

   /* it('should create and save FamiliarPersonajes', () => {
        familiarPersonajeComponentsPage.clickOnCreateButton();
        familiarPersonajeDialogPage.setNombresInput('nombres');
        expect(familiarPersonajeDialogPage.getNombresInput()).toMatch('nombres');
        familiarPersonajeDialogPage.setApellidosInput('apellidos');
        expect(familiarPersonajeDialogPage.getApellidosInput()).toMatch('apellidos');
        familiarPersonajeDialogPage.relacionFamiliarSelectLastOption();
        familiarPersonajeDialogPage.personajeSelectLastOption();
        familiarPersonajeDialogPage.save();
        expect(familiarPersonajeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class FamiliarPersonajeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-familiar-personaje-pr div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class FamiliarPersonajeDialogPage {
    modalTitle = element(by.css('h4#myFamiliarPersonajeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nombresInput = element(by.css('input#field_nombres'));
    apellidosInput = element(by.css('input#field_apellidos'));
    relacionFamiliarSelect = element(by.css('select#field_relacionFamiliar'));
    personajeSelect = element(by.css('select#field_personaje'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNombresInput = function(nombres) {
        this.nombresInput.sendKeys(nombres);
    };

    getNombresInput = function() {
        return this.nombresInput.getAttribute('value');
    };

    setApellidosInput = function(apellidos) {
        this.apellidosInput.sendKeys(apellidos);
    };

    getApellidosInput = function() {
        return this.apellidosInput.getAttribute('value');
    };

    relacionFamiliarSelectLastOption = function() {
        this.relacionFamiliarSelect.all(by.tagName('option')).last().click();
    };

    relacionFamiliarSelectOption = function(option) {
        this.relacionFamiliarSelect.sendKeys(option);
    };

    getRelacionFamiliarSelect = function() {
        return this.relacionFamiliarSelect;
    };

    getRelacionFamiliarSelectedOption = function() {
        return this.relacionFamiliarSelect.element(by.css('option:checked')).getText();
    };

    personajeSelectLastOption = function() {
        this.personajeSelect.all(by.tagName('option')).last().click();
    };

    personajeSelectOption = function(option) {
        this.personajeSelect.sendKeys(option);
    };

    getPersonajeSelect = function() {
        return this.personajeSelect;
    };

    getPersonajeSelectedOption = function() {
        return this.personajeSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
