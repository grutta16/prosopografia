import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Religion e2e test', () => {

    let navBarPage: NavBarPage;
    let religionDialogPage: ReligionDialogPage;
    let religionComponentsPage: ReligionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Religions', () => {
        navBarPage.goToEntity('religion-pr');
        religionComponentsPage = new ReligionComponentsPage();
        expect(religionComponentsPage.getTitle())
            .toMatch(/prosopografiaApp.religion.home.title/);

    });

    it('should load create Religion dialog', () => {
        religionComponentsPage.clickOnCreateButton();
        religionDialogPage = new ReligionDialogPage();
        expect(religionDialogPage.getModalTitle())
            .toMatch(/prosopografiaApp.religion.home.createOrEditLabel/);
        religionDialogPage.close();
    });

    it('should create and save Religions', () => {
        religionComponentsPage.clickOnCreateButton();
        religionDialogPage.setNombreInput('nombre');
        expect(religionDialogPage.getNombreInput()).toMatch('nombre');
        religionDialogPage.save();
        expect(religionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ReligionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-religion-pr div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ReligionDialogPage {
    modalTitle = element(by.css('h4#myReligionLabel'));
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
