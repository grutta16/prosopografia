import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('RelacionFamiliar e2e test', () => {

    let navBarPage: NavBarPage;
    let relacionFamiliarDialogPage: RelacionFamiliarDialogPage;
    let relacionFamiliarComponentsPage: RelacionFamiliarComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load RelacionFamiliars', () => {
        navBarPage.goToEntity('relacion-familiar-pr');
        relacionFamiliarComponentsPage = new RelacionFamiliarComponentsPage();
        expect(relacionFamiliarComponentsPage.getTitle())
            .toMatch(/prosopografiaApp.relacionFamiliar.home.title/);

    });

    it('should load create RelacionFamiliar dialog', () => {
        relacionFamiliarComponentsPage.clickOnCreateButton();
        relacionFamiliarDialogPage = new RelacionFamiliarDialogPage();
        expect(relacionFamiliarDialogPage.getModalTitle())
            .toMatch(/prosopografiaApp.relacionFamiliar.home.createOrEditLabel/);
        relacionFamiliarDialogPage.close();
    });

    it('should create and save RelacionFamiliars', () => {
        relacionFamiliarComponentsPage.clickOnCreateButton();
        relacionFamiliarDialogPage.setNombreInput('nombre');
        expect(relacionFamiliarDialogPage.getNombreInput()).toMatch('nombre');
        relacionFamiliarDialogPage.save();
        expect(relacionFamiliarDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RelacionFamiliarComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-relacion-familiar-pr div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RelacionFamiliarDialogPage {
    modalTitle = element(by.css('h4#myRelacionFamiliarLabel'));
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
