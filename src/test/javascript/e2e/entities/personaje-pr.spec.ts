import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Personaje e2e test', () => {

    let navBarPage: NavBarPage;
    let personajeDialogPage: PersonajeDialogPage;
    let personajeComponentsPage: PersonajeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Personajes', () => {
        navBarPage.goToEntity('personaje-pr');
        personajeComponentsPage = new PersonajeComponentsPage();
        expect(personajeComponentsPage.getTitle())
            .toMatch(/prosopografiaApp.personaje.home.title/);

    });

    it('should load create Personaje dialog', () => {
        personajeComponentsPage.clickOnCreateButton();
        personajeDialogPage = new PersonajeDialogPage();
        expect(personajeDialogPage.getModalTitle())
            .toMatch(/prosopografiaApp.personaje.home.createOrEditLabel/);
        personajeDialogPage.close();
    });

    it('should create and save Personajes', () => {
        personajeComponentsPage.clickOnCreateButton();
        personajeDialogPage.setNombresInput('nombres');
        expect(personajeDialogPage.getNombresInput()).toMatch('nombres');
        personajeDialogPage.setApellidosInput('apellidos');
        expect(personajeDialogPage.getApellidosInput()).toMatch('apellidos');
        personajeDialogPage.setFechaNacimientoInput('2000-12-31');
        expect(personajeDialogPage.getFechaNacimientoInput()).toMatch('2000-12-31');
        personajeDialogPage.setFechaDefuncionInput('2000-12-31');
        expect(personajeDialogPage.getFechaDefuncionInput()).toMatch('2000-12-31');
        personajeDialogPage.setNombresAlternativosInput('nombresAlternativos');
        expect(personajeDialogPage.getNombresAlternativosInput()).toMatch('nombresAlternativos');
        personajeDialogPage.setApellidosAlternativosInput('apellidosAlternativos');
        expect(personajeDialogPage.getApellidosAlternativosInput()).toMatch('apellidosAlternativos');
        personajeDialogPage.getSexoInput().isSelected().then((selected) => {
            if (selected) {
                personajeDialogPage.getSexoInput().click();
                expect(personajeDialogPage.getSexoInput().isSelected()).toBeFalsy();
            } else {
                personajeDialogPage.getSexoInput().click();
                expect(personajeDialogPage.getSexoInput().isSelected()).toBeTruthy();
            }
        });
        personajeDialogPage.setObservacionesInput('observaciones');
        expect(personajeDialogPage.getObservacionesInput()).toMatch('observaciones');
        personajeDialogPage.lugarNacimientoSelectLastOption();
        personajeDialogPage.lugarDefuncionSelectLastOption();
        // personajeDialogPage.profesionesSelectLastOption();
        personajeDialogPage.save();
        expect(personajeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PersonajeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-personaje-pr div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PersonajeDialogPage {
    modalTitle = element(by.css('h4#myPersonajeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nombresInput = element(by.css('input#field_nombres'));
    apellidosInput = element(by.css('input#field_apellidos'));
    fechaNacimientoInput = element(by.css('input#field_fechaNacimiento'));
    fechaDefuncionInput = element(by.css('input#field_fechaDefuncion'));
    nombresAlternativosInput = element(by.css('input#field_nombresAlternativos'));
    apellidosAlternativosInput = element(by.css('input#field_apellidosAlternativos'));
    sexoInput = element(by.css('input#field_sexo'));
    observacionesInput = element(by.css('input#field_observaciones'));
    lugarNacimientoSelect = element(by.css('select#field_lugarNacimiento'));
    lugarDefuncionSelect = element(by.css('select#field_lugarDefuncion'));
    profesionesSelect = element(by.css('select#field_profesiones'));

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

    setFechaNacimientoInput = function(fechaNacimiento) {
        this.fechaNacimientoInput.sendKeys(fechaNacimiento);
    };

    getFechaNacimientoInput = function() {
        return this.fechaNacimientoInput.getAttribute('value');
    };

    setFechaDefuncionInput = function(fechaDefuncion) {
        this.fechaDefuncionInput.sendKeys(fechaDefuncion);
    };

    getFechaDefuncionInput = function() {
        return this.fechaDefuncionInput.getAttribute('value');
    };

    setNombresAlternativosInput = function(nombresAlternativos) {
        this.nombresAlternativosInput.sendKeys(nombresAlternativos);
    };

    getNombresAlternativosInput = function() {
        return this.nombresAlternativosInput.getAttribute('value');
    };

    setApellidosAlternativosInput = function(apellidosAlternativos) {
        this.apellidosAlternativosInput.sendKeys(apellidosAlternativos);
    };

    getApellidosAlternativosInput = function() {
        return this.apellidosAlternativosInput.getAttribute('value');
    };

    getSexoInput = function() {
        return this.sexoInput;
    };
    setObservacionesInput = function(observaciones) {
        this.observacionesInput.sendKeys(observaciones);
    };

    getObservacionesInput = function() {
        return this.observacionesInput.getAttribute('value');
    };

    lugarNacimientoSelectLastOption = function() {
        this.lugarNacimientoSelect.all(by.tagName('option')).last().click();
    };

    lugarNacimientoSelectOption = function(option) {
        this.lugarNacimientoSelect.sendKeys(option);
    };

    getLugarNacimientoSelect = function() {
        return this.lugarNacimientoSelect;
    };

    getLugarNacimientoSelectedOption = function() {
        return this.lugarNacimientoSelect.element(by.css('option:checked')).getText();
    };

    lugarDefuncionSelectLastOption = function() {
        this.lugarDefuncionSelect.all(by.tagName('option')).last().click();
    };

    lugarDefuncionSelectOption = function(option) {
        this.lugarDefuncionSelect.sendKeys(option);
    };

    getLugarDefuncionSelect = function() {
        return this.lugarDefuncionSelect;
    };

    getLugarDefuncionSelectedOption = function() {
        return this.lugarDefuncionSelect.element(by.css('option:checked')).getText();
    };

    profesionesSelectLastOption = function() {
        this.profesionesSelect.all(by.tagName('option')).last().click();
    };

    profesionesSelectOption = function(option) {
        this.profesionesSelect.sendKeys(option);
    };

    getProfesionesSelect = function() {
        return this.profesionesSelect;
    };

    getProfesionesSelectedOption = function() {
        return this.profesionesSelect.element(by.css('option:checked')).getText();
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
