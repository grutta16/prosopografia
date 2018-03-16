import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Persona e2e test', () => {

    let navBarPage: NavBarPage;
    let personaDialogPage: PersonaDialogPage;
    let personaComponentsPage: PersonaComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Personas', () => {
        navBarPage.goToEntity('persona-pr');
        personaComponentsPage = new PersonaComponentsPage();
        expect(personaComponentsPage.getTitle())
            .toMatch(/prosopografiaApp.persona.home.title/);

    });

    it('should load create Persona dialog', () => {
        personaComponentsPage.clickOnCreateButton();
        personaDialogPage = new PersonaDialogPage();
        expect(personaDialogPage.getModalTitle())
            .toMatch(/prosopografiaApp.persona.home.createOrEditLabel/);
        personaDialogPage.close();
    });

    it('should create and save Personas', () => {
        personaComponentsPage.clickOnCreateButton();
        personaDialogPage.setNombresInput('nombres');
        expect(personaDialogPage.getNombresInput()).toMatch('nombres');
        personaDialogPage.setApellidosInput('apellidos');
        expect(personaDialogPage.getApellidosInput()).toMatch('apellidos');
        personaDialogPage.save();
        expect(personaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PersonaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-persona-pr div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PersonaDialogPage {
    modalTitle = element(by.css('h4#myPersonaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nombresInput = element(by.css('input#field_nombres'));
    apellidosInput = element(by.css('input#field_apellidos'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNombresInput = function(nombres) {
        this.nombresInput.sendKeys(nombres);
    };

    getNombresInput = function() {
        return this.nombresInput.getAttribute('value');
    };

    setApellidosInput = function(apellidos) {
        this.apellidosInput.sendKeys(apellidos);
    };

    getApellidosInput = function() {
        return this.apellidosInput.getAttribute('value');
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
