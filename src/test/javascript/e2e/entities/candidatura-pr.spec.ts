import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Candidatura e2e test', () => {

    let navBarPage: NavBarPage;
    let candidaturaDialogPage: CandidaturaDialogPage;
    let candidaturaComponentsPage: CandidaturaComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Candidaturas', () => {
        navBarPage.goToEntity('candidatura-pr');
        candidaturaComponentsPage = new CandidaturaComponentsPage();
        expect(candidaturaComponentsPage.getTitle())
            .toMatch(/prosopografiaApp.candidatura.home.title/);

    });

    it('should load create Candidatura dialog', () => {
        candidaturaComponentsPage.clickOnCreateButton();
        candidaturaDialogPage = new CandidaturaDialogPage();
        expect(candidaturaDialogPage.getModalTitle())
            .toMatch(/prosopografiaApp.candidatura.home.createOrEditLabel/);
        candidaturaDialogPage.close();
    });

   /* it('should create and save Candidaturas', () => {
        candidaturaComponentsPage.clickOnCreateButton();
        candidaturaDialogPage.getEsSuplenteInput().isSelected().then((selected) => {
            if (selected) {
                candidaturaDialogPage.getEsSuplenteInput().click();
                expect(candidaturaDialogPage.getEsSuplenteInput().isSelected()).toBeFalsy();
            } else {
                candidaturaDialogPage.getEsSuplenteInput().click();
                expect(candidaturaDialogPage.getEsSuplenteInput().isSelected()).toBeTruthy();
            }
        });
        candidaturaDialogPage.getResultoElectoInput().isSelected().then((selected) => {
            if (selected) {
                candidaturaDialogPage.getResultoElectoInput().click();
                expect(candidaturaDialogPage.getResultoElectoInput().isSelected()).toBeFalsy();
            } else {
                candidaturaDialogPage.getResultoElectoInput().click();
                expect(candidaturaDialogPage.getResultoElectoInput().isSelected()).toBeTruthy();
            }
        });
        candidaturaDialogPage.setObservacionesInput('observaciones');
        expect(candidaturaDialogPage.getObservacionesInput()).toMatch('observaciones');
        candidaturaDialogPage.eleccionSelectLastOption();
        candidaturaDialogPage.seccionSelectLastOption();
        candidaturaDialogPage.save();
        expect(candidaturaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CandidaturaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-candidatura-pr div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CandidaturaDialogPage {
    modalTitle = element(by.css('h4#myCandidaturaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    esSuplenteInput = element(by.css('input#field_esSuplente'));
    resultoElectoInput = element(by.css('input#field_resultoElecto'));
    observacionesInput = element(by.css('input#field_observaciones'));
    eleccionSelect = element(by.css('select#field_eleccion'));
    seccionSelect = element(by.css('select#field_seccion'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    getEsSuplenteInput = function() {
        return this.esSuplenteInput;
    };
    getResultoElectoInput = function() {
        return this.resultoElectoInput;
    };
    setObservacionesInput = function(observaciones) {
        this.observacionesInput.sendKeys(observaciones);
    };

    getObservacionesInput = function() {
        return this.observacionesInput.getAttribute('value');
    };

    eleccionSelectLastOption = function() {
        this.eleccionSelect.all(by.tagName('option')).last().click();
    };

    eleccionSelectOption = function(option) {
        this.eleccionSelect.sendKeys(option);
    };

    getEleccionSelect = function() {
        return this.eleccionSelect;
    };

    getEleccionSelectedOption = function() {
        return this.eleccionSelect.element(by.css('option:checked')).getText();
    };

    seccionSelectLastOption = function() {
        this.seccionSelect.all(by.tagName('option')).last().click();
    };

    seccionSelectOption = function(option) {
        this.seccionSelect.sendKeys(option);
    };

    getSeccionSelect = function() {
        return this.seccionSelect;
    };

    getSeccionSelectedOption = function() {
        return this.seccionSelect.element(by.css('option:checked')).getText();
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
