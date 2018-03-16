import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CargoPersonaje e2e test', () => {

    let navBarPage: NavBarPage;
    let cargoPersonajeDialogPage: CargoPersonajeDialogPage;
    let cargoPersonajeComponentsPage: CargoPersonajeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CargoPersonajes', () => {
        navBarPage.goToEntity('cargo-personaje-pr');
        cargoPersonajeComponentsPage = new CargoPersonajeComponentsPage();
        expect(cargoPersonajeComponentsPage.getTitle())
            .toMatch(/prosopografiaApp.cargoPersonaje.home.title/);

    });

    it('should load create CargoPersonaje dialog', () => {
        cargoPersonajeComponentsPage.clickOnCreateButton();
        cargoPersonajeDialogPage = new CargoPersonajeDialogPage();
        expect(cargoPersonajeDialogPage.getModalTitle())
            .toMatch(/prosopografiaApp.cargoPersonaje.home.createOrEditLabel/);
        cargoPersonajeDialogPage.close();
    });

   /* it('should create and save CargoPersonajes', () => {
        cargoPersonajeComponentsPage.clickOnCreateButton();
        cargoPersonajeDialogPage.setFechaInicioInput('2000-12-31');
        expect(cargoPersonajeDialogPage.getFechaInicioInput()).toMatch('2000-12-31');
        cargoPersonajeDialogPage.setFechaFinInput('2000-12-31');
        expect(cargoPersonajeDialogPage.getFechaFinInput()).toMatch('2000-12-31');
        cargoPersonajeDialogPage.setObservacionesInput('observaciones');
        expect(cargoPersonajeDialogPage.getObservacionesInput()).toMatch('observaciones');
        cargoPersonajeDialogPage.alcanceSelectLastOption();
        cargoPersonajeDialogPage.cargoSelectLastOption();
        cargoPersonajeDialogPage.personajeSelectLastOption();
        cargoPersonajeDialogPage.save();
        expect(cargoPersonajeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CargoPersonajeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-cargo-personaje-pr div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CargoPersonajeDialogPage {
    modalTitle = element(by.css('h4#myCargoPersonajeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fechaInicioInput = element(by.css('input#field_fechaInicio'));
    fechaFinInput = element(by.css('input#field_fechaFin'));
    observacionesInput = element(by.css('input#field_observaciones'));
    alcanceSelect = element(by.css('select#field_alcance'));
    cargoSelect = element(by.css('select#field_cargo'));
    personajeSelect = element(by.css('select#field_personaje'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setFechaInicioInput = function(fechaInicio) {
        this.fechaInicioInput.sendKeys(fechaInicio);
    };

    getFechaInicioInput = function() {
        return this.fechaInicioInput.getAttribute('value');
    };

    setFechaFinInput = function(fechaFin) {
        this.fechaFinInput.sendKeys(fechaFin);
    };

    getFechaFinInput = function() {
        return this.fechaFinInput.getAttribute('value');
    };

    setObservacionesInput = function(observaciones) {
        this.observacionesInput.sendKeys(observaciones);
    };

    getObservacionesInput = function() {
        return this.observacionesInput.getAttribute('value');
    };

    setAlcanceSelect = function(alcance) {
        this.alcanceSelect.sendKeys(alcance);
    };

    getAlcanceSelect = function() {
        return this.alcanceSelect.element(by.css('option:checked')).getText();
    };

    alcanceSelectLastOption = function() {
        this.alcanceSelect.all(by.tagName('option')).last().click();
    };
    cargoSelectLastOption = function() {
        this.cargoSelect.all(by.tagName('option')).last().click();
    };

    cargoSelectOption = function(option) {
        this.cargoSelect.sendKeys(option);
    };

    getCargoSelect = function() {
        return this.cargoSelect;
    };

    getCargoSelectedOption = function() {
        return this.cargoSelect.element(by.css('option:checked')).getText();
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
