import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ResidenciaPersonaje e2e test', () => {

    let navBarPage: NavBarPage;
    let residenciaPersonajeDialogPage: ResidenciaPersonajeDialogPage;
    let residenciaPersonajeComponentsPage: ResidenciaPersonajeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ResidenciaPersonajes', () => {
        navBarPage.goToEntity('residencia-personaje-pr');
        residenciaPersonajeComponentsPage = new ResidenciaPersonajeComponentsPage();
        expect(residenciaPersonajeComponentsPage.getTitle())
            .toMatch(/prosopografiaApp.residenciaPersonaje.home.title/);

    });

    it('should load create ResidenciaPersonaje dialog', () => {
        residenciaPersonajeComponentsPage.clickOnCreateButton();
        residenciaPersonajeDialogPage = new ResidenciaPersonajeDialogPage();
        expect(residenciaPersonajeDialogPage.getModalTitle())
            .toMatch(/prosopografiaApp.residenciaPersonaje.home.createOrEditLabel/);
        residenciaPersonajeDialogPage.close();
    });

   /* it('should create and save ResidenciaPersonajes', () => {
        residenciaPersonajeComponentsPage.clickOnCreateButton();
        residenciaPersonajeDialogPage.setFechaDesdeInput('2000-12-31');
        expect(residenciaPersonajeDialogPage.getFechaDesdeInput()).toMatch('2000-12-31');
        residenciaPersonajeDialogPage.setFechaHastaInput('2000-12-31');
        expect(residenciaPersonajeDialogPage.getFechaHastaInput()).toMatch('2000-12-31');
        residenciaPersonajeDialogPage.lugarSelectLastOption();
        residenciaPersonajeDialogPage.personajeSelectLastOption();
        residenciaPersonajeDialogPage.save();
        expect(residenciaPersonajeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ResidenciaPersonajeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-residencia-personaje-pr div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ResidenciaPersonajeDialogPage {
    modalTitle = element(by.css('h4#myResidenciaPersonajeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fechaDesdeInput = element(by.css('input#field_fechaDesde'));
    fechaHastaInput = element(by.css('input#field_fechaHasta'));
    lugarSelect = element(by.css('select#field_lugar'));
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

    lugarSelectLastOption = function() {
        this.lugarSelect.all(by.tagName('option')).last().click();
    };

    lugarSelectOption = function(option) {
        this.lugarSelect.sendKeys(option);
    };

    getLugarSelect = function() {
        return this.lugarSelect;
    };

    getLugarSelectedOption = function() {
        return this.lugarSelect.element(by.css('option:checked')).getText();
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
