import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('PartidoPersonaje e2e test', () => {

    let navBarPage: NavBarPage;
    let partidoPersonajeDialogPage: PartidoPersonajeDialogPage;
    let partidoPersonajeComponentsPage: PartidoPersonajeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load PartidoPersonajes', () => {
        navBarPage.goToEntity('partido-personaje-pr');
        partidoPersonajeComponentsPage = new PartidoPersonajeComponentsPage();
        expect(partidoPersonajeComponentsPage.getTitle())
            .toMatch(/prosopografiaApp.partidoPersonaje.home.title/);

    });

    it('should load create PartidoPersonaje dialog', () => {
        partidoPersonajeComponentsPage.clickOnCreateButton();
        partidoPersonajeDialogPage = new PartidoPersonajeDialogPage();
        expect(partidoPersonajeDialogPage.getModalTitle())
            .toMatch(/prosopografiaApp.partidoPersonaje.home.createOrEditLabel/);
        partidoPersonajeDialogPage.close();
    });

   /* it('should create and save PartidoPersonajes', () => {
        partidoPersonajeComponentsPage.clickOnCreateButton();
        partidoPersonajeDialogPage.setFechaDesdeInput('2000-12-31');
        expect(partidoPersonajeDialogPage.getFechaDesdeInput()).toMatch('2000-12-31');
        partidoPersonajeDialogPage.setFechaHastaInput('2000-12-31');
        expect(partidoPersonajeDialogPage.getFechaHastaInput()).toMatch('2000-12-31');
        partidoPersonajeDialogPage.partidoSelectLastOption();
        partidoPersonajeDialogPage.personajeSelectLastOption();
        partidoPersonajeDialogPage.save();
        expect(partidoPersonajeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PartidoPersonajeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-partido-personaje-pr div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PartidoPersonajeDialogPage {
    modalTitle = element(by.css('h4#myPartidoPersonajeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fechaDesdeInput = element(by.css('input#field_fechaDesde'));
    fechaHastaInput = element(by.css('input#field_fechaHasta'));
    partidoSelect = element(by.css('select#field_partido'));
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

    partidoSelectLastOption = function() {
        this.partidoSelect.all(by.tagName('option')).last().click();
    };

    partidoSelectOption = function(option) {
        this.partidoSelect.sendKeys(option);
    };

    getPartidoSelect = function() {
        return this.partidoSelect;
    };

    getPartidoSelectedOption = function() {
        return this.partidoSelect.element(by.css('option:checked')).getText();
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
