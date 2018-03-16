import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Profesion e2e test', () => {

    let navBarPage: NavBarPage;
    let profesionDialogPage: ProfesionDialogPage;
    let profesionComponentsPage: ProfesionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Profesions', () => {
        navBarPage.goToEntity('profesion-pr');
        profesionComponentsPage = new ProfesionComponentsPage();
        expect(profesionComponentsPage.getTitle())
            .toMatch(/prosopografiaApp.profesion.home.title/);

    });

    it('should load create Profesion dialog', () => {
        profesionComponentsPage.clickOnCreateButton();
        profesionDialogPage = new ProfesionDialogPage();
        expect(profesionDialogPage.getModalTitle())
            .toMatch(/prosopografiaApp.profesion.home.createOrEditLabel/);
        profesionDialogPage.close();
    });

   /* it('should create and save Profesions', () => {
        profesionComponentsPage.clickOnCreateButton();
        profesionDialogPage.setNombreInput('nombre');
        expect(profesionDialogPage.getNombreInput()).toMatch('nombre');
        profesionDialogPage.tipoProfesionSelectLastOption();
        profesionDialogPage.save();
        expect(profesionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProfesionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-profesion-pr div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProfesionDialogPage {
    modalTitle = element(by.css('h4#myProfesionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nombreInput = element(by.css('input#field_nombre'));
    tipoProfesionSelect = element(by.css('select#field_tipoProfesion'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNombreInput = function(nombre) {
        this.nombreInput.sendKeys(nombre);
    };

    getNombreInput = function() {
        return this.nombreInput.getAttribute('value');
    };

    tipoProfesionSelectLastOption = function() {
        this.tipoProfesionSelect.all(by.tagName('option')).last().click();
    };

    tipoProfesionSelectOption = function(option) {
        this.tipoProfesionSelect.sendKeys(option);
    };

    getTipoProfesionSelect = function() {
        return this.tipoProfesionSelect;
    };

    getTipoProfesionSelectedOption = function() {
        return this.tipoProfesionSelect.element(by.css('option:checked')).getText();
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
