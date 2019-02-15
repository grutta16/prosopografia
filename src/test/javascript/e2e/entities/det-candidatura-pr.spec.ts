import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('DetCandidatura e2e test', () => {

    let navBarPage: NavBarPage;
    let detCandidaturaDialogPage: DetCandidaturaDialogPage;
    let detCandidaturaComponentsPage: DetCandidaturaComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load DetCandidaturas', () => {
        navBarPage.goToEntity('det-candidatura-pr');
        detCandidaturaComponentsPage = new DetCandidaturaComponentsPage();
        expect(detCandidaturaComponentsPage.getTitle())
            .toMatch(/prosopografiaApp.detCandidatura.home.title/);

    });

    it('should load create DetCandidatura dialog', () => {
        detCandidaturaComponentsPage.clickOnCreateButton();
        detCandidaturaDialogPage = new DetCandidaturaDialogPage();
        expect(detCandidaturaDialogPage.getModalTitle())
            .toMatch(/prosopografiaApp.detCandidatura.home.createOrEditLabel/);
        detCandidaturaDialogPage.close();
    });

   /* it('should create and save DetCandidaturas', () => {
        detCandidaturaComponentsPage.clickOnCreateButton();
        detCandidaturaDialogPage.setFechaInicioInput('2000-12-31');
        expect(detCandidaturaDialogPage.getFechaInicioInput()).toMatch('2000-12-31');
        detCandidaturaDialogPage.setFechaFinInput('2000-12-31');
        expect(detCandidaturaDialogPage.getFechaFinInput()).toMatch('2000-12-31');
        detCandidaturaDialogPage.setObservacionesInput('observaciones');
        expect(detCandidaturaDialogPage.getObservacionesInput()).toMatch('observaciones');
        detCandidaturaDialogPage.candidaturaSelectLastOption();
        detCandidaturaDialogPage.save();
        expect(detCandidaturaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DetCandidaturaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-det-candidatura-pr div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DetCandidaturaDialogPage {
    modalTitle = element(by.css('h4#myDetCandidaturaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fechaInicioInput = element(by.css('input#field_fechaInicio'));
    fechaFinInput = element(by.css('input#field_fechaFin'));
    observacionesInput = element(by.css('input#field_observaciones'));
    candidaturaSelect = element(by.css('select#field_candidatura'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setFechaInicioInput = function(fechaInicio) {
        this.fechaInicioInput.sendKeys(fechaInicio);
    };

    getFechaInicioInput = function() {
        return this.fechaInicioInput.getAttribute('value');
    };

    setFechaFinInput = function(fechaFin) {
        this.fechaFinInput.sendKeys(fechaFin);
    };

    getFechaFinInput = function() {
        return this.fechaFinInput.getAttribute('value');
    };

    setObservacionesInput = function(observaciones) {
        this.observacionesInput.sendKeys(observaciones);
    };

    getObservacionesInput = function() {
        return this.observacionesInput.getAttribute('value');
    };

    candidaturaSelectLastOption = function() {
        this.candidaturaSelect.all(by.tagName('option')).last().click();
    };

    candidaturaSelectOption = function(option) {
        this.candidaturaSelect.sendKeys(option);
    };

    getCandidaturaSelect = function() {
        return this.candidaturaSelect;
    };

    getCandidaturaSelectedOption = function() {
        return this.candidaturaSelect.element(by.css('option:checked')).getText();
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
