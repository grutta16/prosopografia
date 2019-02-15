import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Eleccion e2e test', () => {

    let navBarPage: NavBarPage;
    let eleccionDialogPage: EleccionDialogPage;
    let eleccionComponentsPage: EleccionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Eleccions', () => {
        navBarPage.goToEntity('eleccion-pr');
        eleccionComponentsPage = new EleccionComponentsPage();
        expect(eleccionComponentsPage.getTitle())
            .toMatch(/prosopografiaApp.eleccion.home.title/);

    });

    it('should load create Eleccion dialog', () => {
        eleccionComponentsPage.clickOnCreateButton();
        eleccionDialogPage = new EleccionDialogPage();
        expect(eleccionDialogPage.getModalTitle())
            .toMatch(/prosopografiaApp.eleccion.home.createOrEditLabel/);
        eleccionDialogPage.close();
    });

   /* it('should create and save Eleccions', () => {
        eleccionComponentsPage.clickOnCreateButton();
        eleccionDialogPage.setNombreInput('nombre');
        expect(eleccionDialogPage.getNombreInput()).toMatch('nombre');
        eleccionDialogPage.setFechaInput('2000-12-31');
        expect(eleccionDialogPage.getFechaInput()).toMatch('2000-12-31');
        eleccionDialogPage.setFuenteInput('fuente');
        expect(eleccionDialogPage.getFuenteInput()).toMatch('fuente');
        eleccionDialogPage.setObservacionesInput('observaciones');
        expect(eleccionDialogPage.getObservacionesInput()).toMatch('observaciones');
        eleccionDialogPage.alcanceSelectLastOption();
        eleccionDialogPage.cargoSelectLastOption();
        eleccionDialogPage.save();
        expect(eleccionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EleccionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-eleccion-pr div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class EleccionDialogPage {
    modalTitle = element(by.css('h4#myEleccionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nombreInput = element(by.css('input#field_nombre'));
    fechaInput = element(by.css('input#field_fecha'));
    fuenteInput = element(by.css('input#field_fuente'));
    observacionesInput = element(by.css('input#field_observaciones'));
    alcanceSelect = element(by.css('select#field_alcance'));
    cargoSelect = element(by.css('select#field_cargo'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNombreInput = function(nombre) {
        this.nombreInput.sendKeys(nombre);
    };

    getNombreInput = function() {
        return this.nombreInput.getAttribute('value');
    };

    setFechaInput = function(fecha) {
        this.fechaInput.sendKeys(fecha);
    };

    getFechaInput = function() {
        return this.fechaInput.getAttribute('value');
    };

    setFuenteInput = function(fuente) {
        this.fuenteInput.sendKeys(fuente);
    };

    getFuenteInput = function() {
        return this.fuenteInput.getAttribute('value');
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
