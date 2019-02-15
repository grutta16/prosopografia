import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Cargo e2e test', () => {

    let navBarPage: NavBarPage;
    let cargoDialogPage: CargoDialogPage;
    let cargoComponentsPage: CargoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Cargos', () => {
        navBarPage.goToEntity('cargo-pr');
        cargoComponentsPage = new CargoComponentsPage();
        expect(cargoComponentsPage.getTitle())
            .toMatch(/prosopografiaApp.cargo.home.title/);

    });

    it('should load create Cargo dialog', () => {
        cargoComponentsPage.clickOnCreateButton();
        cargoDialogPage = new CargoDialogPage();
        expect(cargoDialogPage.getModalTitle())
            .toMatch(/prosopografiaApp.cargo.home.createOrEditLabel/);
        cargoDialogPage.close();
    });

    it('should create and save Cargos', () => {
        cargoComponentsPage.clickOnCreateButton();
        cargoDialogPage.setNombreInput('nombre');
        expect(cargoDialogPage.getNombreInput()).toMatch('nombre');
        cargoDialogPage.ambitoSelectLastOption();
        cargoDialogPage.save();
        expect(cargoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CargoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-cargo-pr div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CargoDialogPage {
    modalTitle = element(by.css('h4#myCargoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nombreInput = element(by.css('input#field_nombre'));
    ambitoSelect = element(by.css('select#field_ambito'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNombreInput = function(nombre) {
        this.nombreInput.sendKeys(nombre);
    };

    getNombreInput = function() {
        return this.nombreInput.getAttribute('value');
    };

    setAmbitoSelect = function(ambito) {
        this.ambitoSelect.sendKeys(ambito);
    };

    getAmbitoSelect = function() {
        return this.ambitoSelect.element(by.css('option:checked')).getText();
    };

    ambitoSelectLastOption = function() {
        this.ambitoSelect.all(by.tagName('option')).last().click();
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
