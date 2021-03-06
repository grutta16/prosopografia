/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProsopografiaTestModule } from '../../../test.module';
import { PersonaPrComponent } from '../../../../../../main/webapp/app/entities/persona-pr/persona-pr.component';
import { PersonaPrService } from '../../../../../../main/webapp/app/entities/persona-pr/persona-pr.service';
import { PersonaPr } from '../../../../../../main/webapp/app/entities/persona-pr/persona-pr.model';

describe('Component Tests', () => {

    describe('PersonaPr Management Component', () => {
        let comp: PersonaPrComponent;
        let fixture: ComponentFixture<PersonaPrComponent>;
        let service: PersonaPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [PersonaPrComponent],
                providers: [
                    PersonaPrService
                ]
            })
            .overrideTemplate(PersonaPrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonaPrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonaPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PersonaPr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.personas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
