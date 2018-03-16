import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Partido e2e test', () => {

    let navBarPage: NavBarPage;
    let partidoDialogPage: PartidoDialogPage;
    let partidoComponentsPage: PartidoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Partidos', () => {
        navBarPage.goToEntity('partido-pr');
        partidoComponentsPage = new PartidoComponentsPage();
        expect(partidoComponentsPage.getTitle())
            .toMatch(/prosopografiaApp.partido.home.title/);

    });

    it('should load create Partido dialog', () => {
        partidoComponentsPage.clickOnCreateButton();
        partidoDialogPage = new PartidoDialogPage();
        expect(partidoDialogPage.getModalTitle())
            .toMatch(/prosopografiaApp.partido.home.createOrEditLabel/);
        partidoDialogPage.close();
    });

    it('should create and save Partidos', () => {
        partidoComponentsPage.clickOnCreateButton();
        partidoDialogPage.setNombreInput('nombre');
        expect(partidoDialogPage.getNombreInput()).toMatch('nombre');
        partidoDialogPage.setAbreviacionInput('abreviacion');
        expect(partidoDialogPage.getAbreviacionInput()).toMatch('abreviacion');
        partidoDialogPage.save();
        expect(partidoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PartidoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-partido-pr div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PartidoDialogPage {
    modalTitle = element(by.css('h4#myPartidoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nombreInput = element(by.css('input#field_nombre'));
    abreviacionInput = element(by.css('input#field_abreviacion'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNombreInput = function(nombre) {
        this.nombreInput.sendKeys(nombre);
    };

    getNombreInput = function() {
        return this.nombreInput.getAttribute('value');
    };

    setAbreviacionInput = function(abreviacion) {
        this.abreviacionInput.sendKeys(abreviacion);
    };

    getAbreviacionInput = function() {
        return this.abreviacionInput.getAttribute('value');
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
