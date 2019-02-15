import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ParejaPersonaje e2e test', () => {

    let navBarPage: NavBarPage;
    let parejaPersonajeDialogPage: ParejaPersonajeDialogPage;
    let parejaPersonajeComponentsPage: ParejaPersonajeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ParejaPersonajes', () => {
        navBarPage.goToEntity('pareja-personaje-pr');
        parejaPersonajeComponentsPage = new ParejaPersonajeComponentsPage();
        expect(parejaPersonajeComponentsPage.getTitle())
            .toMatch(/prosopografiaApp.parejaPersonaje.home.title/);

    });

    it('should load create ParejaPersonaje dialog', () => {
        parejaPersonajeComponentsPage.clickOnCreateButton();
        parejaPersonajeDialogPage = new ParejaPersonajeDialogPage();
        expect(parejaPersonajeDialogPage.getModalTitle())
            .toMatch(/prosopografiaApp.parejaPersonaje.home.createOrEditLabel/);
        parejaPersonajeDialogPage.close();
    });

   /* it('should create and save ParejaPersonajes', () => {
        parejaPersonajeComponentsPage.clickOnCreateButton();
        parejaPersonajeDialogPage.setNombresInput('nombres');
        expect(parejaPersonajeDialogPage.getNombresInput()).toMatch('nombres');
        parejaPersonajeDialogPage.setApellidosInput('apellidos');
        expect(parejaPersonajeDialogPage.getApellidosInput()).toMatch('apellidos');
        parejaPersonajeDialogPage.setFechaDesdeInput('2000-12-31');
        expect(parejaPersonajeDialogPage.getFechaDesdeInput()).toMatch('2000-12-31');
        parejaPersonajeDialogPage.setFechaHastaInput('2000-12-31');
        expect(parejaPersonajeDialogPage.getFechaHastaInput()).toMatch('2000-12-31');
        parejaPersonajeDialogPage.personajeSelectLastOption();
        parejaPersonajeDialogPage.save();
        expect(parejaPersonajeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ParejaPersonajeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-pareja-personaje-pr div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ParejaPersonajeDialogPage {
    modalTitle = element(by.css('h4#myParejaPersonajeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nombresInput = element(by.css('input#field_nombres'));
    apellidosInput = element(by.css('input#field_apellidos'));
    fechaDesdeInput = element(by.css('input#field_fechaDesde'));
    fechaHastaInput = element(by.css('input#field_fechaHasta'));
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
