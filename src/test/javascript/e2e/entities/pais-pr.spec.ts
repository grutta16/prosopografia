import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Pais e2e test', () => {

    let navBarPage: NavBarPage;
    let paisDialogPage: PaisDialogPage;
    let paisComponentsPage: PaisComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Pais', () => {
        navBarPage.goToEntity('pais-pr');
        paisComponentsPage = new PaisComponentsPage();
        expect(paisComponentsPage.getTitle())
            .toMatch(/prosopografiaApp.pais.home.title/);

    });

    it('should load create Pais dialog', () => {
        paisComponentsPage.clickOnCreateButton();
        paisDialogPage = new PaisDialogPage();
        expect(paisDialogPage.getModalTitle())
            .toMatch(/prosopografiaApp.pais.home.createOrEditLabel/);
        paisDialogPage.close();
    });

    it('should create and save Pais', () => {
        paisComponentsPage.clickOnCreateButton();
        paisDialogPage.setNombreInput('nombre');
        expect(paisDialogPage.getNombreInput()).toMatch('nombre');
        paisDialogPage.save();
        expect(paisDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PaisComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-pais-pr div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PaisDialogPage {
    modalTitle = element(by.css('h4#myPaisLabel'));
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
