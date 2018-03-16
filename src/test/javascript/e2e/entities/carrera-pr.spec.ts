import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Carrera e2e test', () => {

    let navBarPage: NavBarPage;
    let carreraDialogPage: CarreraDialogPage;
    let carreraComponentsPage: CarreraComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Carreras', () => {
        navBarPage.goToEntity('carrera-pr');
        carreraComponentsPage = new CarreraComponentsPage();
        expect(carreraComponentsPage.getTitle())
            .toMatch(/prosopografiaApp.carrera.home.title/);

    });

    it('should load create Carrera dialog', () => {
        carreraComponentsPage.clickOnCreateButton();
        carreraDialogPage = new CarreraDialogPage();
        expect(carreraDialogPage.getModalTitle())
            .toMatch(/prosopografiaApp.carrera.home.createOrEditLabel/);
        carreraDialogPage.close();
    });

    it('should create and save Carreras', () => {
        carreraComponentsPage.clickOnCreateButton();
        carreraDialogPage.setNombreInput('nombre');
        expect(carreraDialogPage.getNombreInput()).toMatch('nombre');
        carreraDialogPage.setTituloInput('titulo');
        expect(carreraDialogPage.getTituloInput()).toMatch('titulo');
        carreraDialogPage.setDuracionInput('5');
        expect(carreraDialogPage.getDuracionInput()).toMatch('5');
        carreraDialogPage.save();
        expect(carreraDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CarreraComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-carrera-pr div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CarreraDialogPage {
    modalTitle = element(by.css('h4#myCarreraLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nombreInput = element(by.css('input#field_nombre'));
    tituloInput = element(by.css('input#field_titulo'));
    duracionInput = element(by.css('input#field_duracion'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNombreInput = function(nombre) {
        this.nombreInput.sendKeys(nombre);
    };

    getNombreInput = function() {
        return this.nombreInput.getAttribute('value');
    };

    setTituloInput = function(titulo) {
        this.tituloInput.sendKeys(titulo);
    };

    getTituloInput = function() {
        return this.tituloInput.getAttribute('value');
    };

    setDuracionInput = function(duracion) {
        this.duracionInput.sendKeys(duracion);
    };

    getDuracionInput = function() {
        return this.duracionInput.getAttribute('value');
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
