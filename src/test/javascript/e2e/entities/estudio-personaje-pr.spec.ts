import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('EstudioPersonaje e2e test', () => {

    let navBarPage: NavBarPage;
    let estudioPersonajeDialogPage: EstudioPersonajeDialogPage;
    let estudioPersonajeComponentsPage: EstudioPersonajeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load EstudioPersonajes', () => {
        navBarPage.goToEntity('estudio-personaje-pr');
        estudioPersonajeComponentsPage = new EstudioPersonajeComponentsPage();
        expect(estudioPersonajeComponentsPage.getTitle())
            .toMatch(/prosopografiaApp.estudioPersonaje.home.title/);

    });

    it('should load create EstudioPersonaje dialog', () => {
        estudioPersonajeComponentsPage.clickOnCreateButton();
        estudioPersonajeDialogPage = new EstudioPersonajeDialogPage();
        expect(estudioPersonajeDialogPage.getModalTitle())
            .toMatch(/prosopografiaApp.estudioPersonaje.home.createOrEditLabel/);
        estudioPersonajeDialogPage.close();
    });

   /* it('should create and save EstudioPersonajes', () => {
        estudioPersonajeComponentsPage.clickOnCreateButton();
        estudioPersonajeDialogPage.setAnioInicioInput('5');
        expect(estudioPersonajeDialogPage.getAnioInicioInput()).toMatch('5');
        estudioPersonajeDialogPage.setAnioFinInput('5');
        expect(estudioPersonajeDialogPage.getAnioFinInput()).toMatch('5');
        estudioPersonajeDialogPage.institucionSelectLastOption();
        estudioPersonajeDialogPage.carreraSelectLastOption();
        estudioPersonajeDialogPage.personajeSelectLastOption();
        estudioPersonajeDialogPage.save();
        expect(estudioPersonajeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EstudioPersonajeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-estudio-personaje-pr div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class EstudioPersonajeDialogPage {
    modalTitle = element(by.css('h4#myEstudioPersonajeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    anioInicioInput = element(by.css('input#field_anioInicio'));
    anioFinInput = element(by.css('input#field_anioFin'));
    institucionSelect = element(by.css('select#field_institucion'));
    carreraSelect = element(by.css('select#field_carrera'));
    personajeSelect = element(by.css('select#field_personaje'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setAnioInicioInput = function(anioInicio) {
        this.anioInicioInput.sendKeys(anioInicio);
    };

    getAnioInicioInput = function() {
        return this.anioInicioInput.getAttribute('value');
    };

    setAnioFinInput = function(anioFin) {
        this.anioFinInput.sendKeys(anioFin);
    };

    getAnioFinInput = function() {
        return this.anioFinInput.getAttribute('value');
    };

    institucionSelectLastOption = function() {
        this.institucionSelect.all(by.tagName('option')).last().click();
    };

    institucionSelectOption = function(option) {
        this.institucionSelect.sendKeys(option);
    };

    getInstitucionSelect = function() {
        return this.institucionSelect;
    };

    getInstitucionSelectedOption = function() {
        return this.institucionSelect.element(by.css('option:checked')).getText();
    };

    carreraSelectLastOption = function() {
        this.carreraSelect.all(by.tagName('option')).last().click();
    };

    carreraSelectOption = function(option) {
        this.carreraSelect.sendKeys(option);
    };

    getCarreraSelect = function() {
        return this.carreraSelect;
    };

    getCarreraSelectedOption = function() {
        return this.carreraSelect.element(by.css('option:checked')).getText();
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
