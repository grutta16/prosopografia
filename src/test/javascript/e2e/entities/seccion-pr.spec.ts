import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Seccion e2e test', () => {

    let navBarPage: NavBarPage;
    let seccionDialogPage: SeccionDialogPage;
    let seccionComponentsPage: SeccionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Seccions', () => {
        navBarPage.goToEntity('seccion-pr');
        seccionComponentsPage = new SeccionComponentsPage();
        expect(seccionComponentsPage.getTitle())
            .toMatch(/prosopografiaApp.seccion.home.title/);

    });

    it('should load create Seccion dialog', () => {
        seccionComponentsPage.clickOnCreateButton();
        seccionDialogPage = new SeccionDialogPage();
        expect(seccionDialogPage.getModalTitle())
            .toMatch(/prosopografiaApp.seccion.home.createOrEditLabel/);
        seccionDialogPage.close();
    });

    it('should create and save Seccions', () => {
        seccionComponentsPage.clickOnCreateButton();
        seccionDialogPage.setNombreInput('nombre');
        expect(seccionDialogPage.getNombreInput()).toMatch('nombre');
        seccionDialogPage.save();
        expect(seccionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SeccionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-seccion-pr div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SeccionDialogPage {
    modalTitle = element(by.css('h4#mySeccionLabel'));
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
