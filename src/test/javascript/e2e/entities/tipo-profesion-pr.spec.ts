import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('TipoProfesion e2e test', () => {

    let navBarPage: NavBarPage;
    let tipoProfesionDialogPage: TipoProfesionDialogPage;
    let tipoProfesionComponentsPage: TipoProfesionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load TipoProfesions', () => {
        navBarPage.goToEntity('tipo-profesion-pr');
        tipoProfesionComponentsPage = new TipoProfesionComponentsPage();
        expect(tipoProfesionComponentsPage.getTitle())
            .toMatch(/prosopografiaApp.tipoProfesion.home.title/);

    });

    it('should load create TipoProfesion dialog', () => {
        tipoProfesionComponentsPage.clickOnCreateButton();
        tipoProfesionDialogPage = new TipoProfesionDialogPage();
        expect(tipoProfesionDialogPage.getModalTitle())
            .toMatch(/prosopografiaApp.tipoProfesion.home.createOrEditLabel/);
        tipoProfesionDialogPage.close();
    });

    it('should create and save TipoProfesions', () => {
        tipoProfesionComponentsPage.clickOnCreateButton();
        tipoProfesionDialogPage.setNombreInput('nombre');
        expect(tipoProfesionDialogPage.getNombreInput()).toMatch('nombre');
        tipoProfesionDialogPage.save();
        expect(tipoProfesionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TipoProfesionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-tipo-profesion-pr div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TipoProfesionDialogPage {
    modalTitle = element(by.css('h4#myTipoProfesionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nombreInput = element(by.css('input#field_nombre'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNombreInput = function(nombre) {
        this.nombreInput.sendKeys(nombre);
    };

    getNombreInput = function() {
        return this.nombreInput.getAttribute('value');
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
