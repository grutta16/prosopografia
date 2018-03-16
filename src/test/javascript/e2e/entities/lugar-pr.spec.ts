import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Lugar e2e test', () => {

    let navBarPage: NavBarPage;
    let lugarDialogPage: LugarDialogPage;
    let lugarComponentsPage: LugarComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Lugars', () => {
        navBarPage.goToEntity('lugar-pr');
        lugarComponentsPage = new LugarComponentsPage();
        expect(lugarComponentsPage.getTitle())
            .toMatch(/prosopografiaApp.lugar.home.title/);

    });

    it('should load create Lugar dialog', () => {
        lugarComponentsPage.clickOnCreateButton();
        lugarDialogPage = new LugarDialogPage();
        expect(lugarDialogPage.getModalTitle())
            .toMatch(/prosopografiaApp.lugar.home.createOrEditLabel/);
        lugarDialogPage.close();
    });

   /* it('should create and save Lugars', () => {
        lugarComponentsPage.clickOnCreateButton();
        lugarDialogPage.setNombreInput('nombre');
        expect(lugarDialogPage.getNombreInput()).toMatch('nombre');
        lugarDialogPage.provinciaSelectLastOption();
        lugarDialogPage.save();
        expect(lugarDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class LugarComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-lugar-pr div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class LugarDialogPage {
    modalTitle = element(by.css('h4#myLugarLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nombreInput = element(by.css('input#field_nombre'));
    provinciaSelect = element(by.css('select#field_provincia'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNombreInput = function(nombre) {
        this.nombreInput.sendKeys(nombre);
    };

    getNombreInput = function() {
        return this.nombreInput.getAttribute('value');
    };

    provinciaSelectLastOption = function() {
        this.provinciaSelect.all(by.tagName('option')).last().click();
    };

    provinciaSelectOption = function(option) {
        this.provinciaSelect.sendKeys(option);
    };

    getProvinciaSelect = function() {
        return this.provinciaSelect;
    };

    getProvinciaSelectedOption = function() {
        return this.provinciaSelect.element(by.css('option:checked')).getText();
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
