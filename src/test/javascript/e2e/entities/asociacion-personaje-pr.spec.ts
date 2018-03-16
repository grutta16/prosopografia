import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('AsociacionPersonaje e2e test', () => {

    let navBarPage: NavBarPage;
    let asociacionPersonajeDialogPage: AsociacionPersonajeDialogPage;
    let asociacionPersonajeComponentsPage: AsociacionPersonajeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load AsociacionPersonajes', () => {
        navBarPage.goToEntity('asociacion-personaje-pr');
        asociacionPersonajeComponentsPage = new AsociacionPersonajeComponentsPage();
        expect(asociacionPersonajeComponentsPage.getTitle())
            .toMatch(/prosopografiaApp.asociacionPersonaje.home.title/);

    });

    it('should load create AsociacionPersonaje dialog', () => {
        asociacionPersonajeComponentsPage.clickOnCreateButton();
        asociacionPersonajeDialogPage = new AsociacionPersonajeDialogPage();
        expect(asociacionPersonajeDialogPage.getModalTitle())
            .toMatch(/prosopografiaApp.asociacionPersonaje.home.createOrEditLabel/);
        asociacionPersonajeDialogPage.close();
    });

   /* it('should create and save AsociacionPersonajes', () => {
        asociacionPersonajeComponentsPage.clickOnCreateButton();
        asociacionPersonajeDialogPage.setFechaDesdeInput('2000-12-31');
        expect(asociacionPersonajeDialogPage.getFechaDesdeInput()).toMatch('2000-12-31');
        asociacionPersonajeDialogPage.setFechaHastaInput('2000-12-31');
        expect(asociacionPersonajeDialogPage.getFechaHastaInput()).toMatch('2000-12-31');
        asociacionPersonajeDialogPage.asociacionSelectLastOption();
        asociacionPersonajeDialogPage.personajeSelectLastOption();
        asociacionPersonajeDialogPage.save();
        expect(asociacionPersonajeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AsociacionPersonajeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-asociacion-personaje-pr div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AsociacionPersonajeDialogPage {
    modalTitle = element(by.css('h4#myAsociacionPersonajeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fechaDesdeInput = element(by.css('input#field_fechaDesde'));
    fechaHastaInput = element(by.css('input#field_fechaHasta'));
    asociacionSelect = element(by.css('select#field_asociacion'));
    personajeSelect = element(by.css('select#field_personaje'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setFechaDesdeInput = function(fechaDesde) {
        this.fechaDesdeInput.sendKeys(fechaDesde);
    };

    getFechaDesdeInput = function() {
        return this.fechaDesdeInput.getAttribute('value');
    };

    setFechaHastaInput = function(fechaHasta) {
        this.fechaHastaInput.sendKeys(fechaHasta);
    };

    getFechaHastaInput = function() {
        return this.fechaHastaInput.getAttribute('value');
    };

    asociacionSelectLastOption = function() {
        this.asociacionSelect.all(by.tagName('option')).last().click();
    };

    asociacionSelectOption = function(option) {
        this.asociacionSelect.sendKeys(option);
    };

    getAsociacionSelect = function() {
        return this.asociacionSelect;
    };

    getAsociacionSelectedOption = function() {
        return this.asociacionSelect.element(by.css('option:checked')).getText();
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
