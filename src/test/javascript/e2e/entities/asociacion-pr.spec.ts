import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Asociacion e2e test', () => {

    let navBarPage: NavBarPage;
    let asociacionDialogPage: AsociacionDialogPage;
    let asociacionComponentsPage: AsociacionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Asociacions', () => {
        navBarPage.goToEntity('asociacion-pr');
        asociacionComponentsPage = new AsociacionComponentsPage();
        expect(asociacionComponentsPage.getTitle())
            .toMatch(/prosopografiaApp.asociacion.home.title/);

    });

    it('should load create Asociacion dialog', () => {
        asociacionComponentsPage.clickOnCreateButton();
        asociacionDialogPage = new AsociacionDialogPage();
        expect(asociacionDialogPage.getModalTitle())
            .toMatch(/prosopografiaApp.asociacion.home.createOrEditLabel/);
        asociacionDialogPage.close();
    });

    it('should create and save Asociacions', () => {
        asociacionComponentsPage.clickOnCreateButton();
        asociacionDialogPage.setNombreInput('nombre');
        expect(asociacionDialogPage.getNombreInput()).toMatch('nombre');
        asociacionDialogPage.save();
        expect(asociacionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AsociacionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-asociacion-pr div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AsociacionDialogPage {
    modalTitle = element(by.css('h4#myAsociacionLabel'));
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
