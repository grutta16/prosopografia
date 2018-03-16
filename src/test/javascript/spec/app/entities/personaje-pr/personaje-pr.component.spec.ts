/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProsopografiaTestModule } from '../../../test.module';
import { PersonajePrComponent } from '../../../../../../main/webapp/app/entities/personaje-pr/personaje-pr.component';
import { PersonajePrService } from '../../../../../../main/webapp/app/entities/personaje-pr/personaje-pr.service';
import { PersonajePr } from '../../../../../../main/webapp/app/entities/personaje-pr/personaje-pr.model';

describe('Component Tests', () => {

    describe('PersonajePr Management Component', () => {
        let comp: PersonajePrComponent;
        let fixture: ComponentFixture<PersonajePrComponent>;
        let service: PersonajePrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [PersonajePrComponent],
                providers: [
                    PersonajePrService
                ]
            })
            .overrideTemplate(PersonajePrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonajePrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonajePrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PersonajePr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.personajes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
