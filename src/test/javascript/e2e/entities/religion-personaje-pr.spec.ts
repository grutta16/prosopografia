import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ReligionPersonaje e2e test', () => {

    let navBarPage: NavBarPage;
    let religionPersonajeDialogPage: ReligionPersonajeDialogPage;
    let religionPersonajeComponentsPage: ReligionPersonajeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ReligionPersonajes', () => {
        navBarPage.goToEntity('religion-personaje-pr');
        religionPersonajeComponentsPage = new ReligionPersonajeComponentsPage();
        expect(religionPersonajeComponentsPage.getTitle())
            .toMatch(/prosopografiaApp.religionPersonaje.home.title/);

    });

    it('should load create ReligionPersonaje dialog', () => {
        religionPersonajeComponentsPage.clickOnCreateButton();
        religionPersonajeDialogPage = new ReligionPersonajeDialogPage();
        expect(religionPersonajeDialogPage.getModalTitle())
            .toMatch(/prosopografiaApp.religionPersonaje.home.createOrEditLabel/);
        religionPersonajeDialogPage.close();
    });

   /* it('should create and save ReligionPersonajes', () => {
        religionPersonajeComponentsPage.clickOnCreateButton();
        religionPersonajeDialogPage.setFechaDesdeInput('2000-12-31');
        expect(religionPersonajeDialogPage.getFechaDesdeInput()).toMatch('2000-12-31');
        religionPersonajeDialogPage.setFechaHastaInput('2000-12-31');
        expect(religionPersonajeDialogPage.getFechaHastaInput()).toMatch('2000-12-31');
        religionPersonajeDialogPage.religionSelectLastOption();
        religionPersonajeDialogPage.personajeSelectLastOption();
        religionPersonajeDialogPage.save();
        expect(religionPersonajeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ReligionPersonajeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-religion-personaje-pr div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ReligionPersonajeDialogPage {
    modalTitle = element(by.css('h4#myReligionPersonajeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fechaDesdeInput = element(by.css('input#field_fechaDesde'));
    fechaHastaInput = element(by.css('input#field_fechaHasta'));
    religionSelect = element(by.css('select#field_religion'));
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

    religionSelectLastOption = function() {
        this.religionSelect.all(by.tagName('option')).last().click();
    };

    religionSelectOption = function(option) {
        this.religionSelect.sendKeys(option);
    };

    getReligionSelect = function() {
        return this.religionSelect;
    };

    getReligionSelectedOption = function() {
        return this.religionSelect.element(by.css('option:checked')).getText();
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
