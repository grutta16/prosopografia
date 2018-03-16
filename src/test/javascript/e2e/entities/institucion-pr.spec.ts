import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Institucion e2e test', () => {

    let navBarPage: NavBarPage;
    let institucionDialogPage: InstitucionDialogPage;
    let institucionComponentsPage: InstitucionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Institucions', () => {
        navBarPage.goToEntity('institucion-pr');
        institucionComponentsPage = new InstitucionComponentsPage();
        expect(institucionComponentsPage.getTitle())
            .toMatch(/prosopografiaApp.institucion.home.title/);

    });

    it('should load create Institucion dialog', () => {
        institucionComponentsPage.clickOnCreateButton();
        institucionDialogPage = new InstitucionDialogPage();
        expect(institucionDialogPage.getModalTitle())
            .toMatch(/prosopografiaApp.institucion.home.createOrEditLabel/);
        institucionDialogPage.close();
    });

   /* it('should create and save Institucions', () => {
        institucionComponentsPage.clickOnCreateButton();
        institucionDialogPage.setNombreInput('nombre');
        expect(institucionDialogPage.getNombreInput()).toMatch('nombre');
        institucionDialogPage.nivelSelectLastOption();
        institucionDialogPage.lugarSelectLastOption();
        // institucionDialogPage.carrerasSelectLastOption();
        institucionDialogPage.save();
        expect(institucionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class InstitucionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-institucion-pr div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class InstitucionDialogPage {
    modalTitle = element(by.css('h4#myInstitucionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nombreInput = element(by.css('input#field_nombre'));
    nivelSelect = element(by.css('select#field_nivel'));
    lugarSelect = element(by.css('select#field_lugar'));
    carrerasSelect = element(by.css('select#field_carreras'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNombreInput = function(nombre) {
        this.nombreInput.sendKeys(nombre);
    };

    getNombreInput = function() {
        return this.nombreInput.getAttribute('value');
    };

    setNivelSelect = function(nivel) {
        this.nivelSelect.sendKeys(nivel);
    };

    getNivelSelect = function() {
        return this.nivelSelect.element(by.css('option:checked')).getText();
    };

    nivelSelectLastOption = function() {
        this.nivelSelect.all(by.tagName('option')).last().click();
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

    carrerasSelectLastOption = function() {
        this.carrerasSelect.all(by.tagName('option')).last().click();
    };

    carrerasSelectOption = function(option) {
        this.carrerasSelect.sendKeys(option);
    };

    getCarrerasSelect = function() {
        return this.carrerasSelect;
    };

    getCarrerasSelectedOption = function() {
        return this.carrerasSelect.element(by.css('option:checked')).getText();
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
