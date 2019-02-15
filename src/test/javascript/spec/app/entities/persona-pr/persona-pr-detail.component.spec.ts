/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProsopografiaTestModule } from '../../../test.module';
import { PersonaPrDetailComponent } from '../../../../../../main/webapp/app/entities/persona-pr/persona-pr-detail.component';
import { PersonaPrService } from '../../../../../../main/webapp/app/entities/persona-pr/persona-pr.service';
import { PersonaPr } from '../../../../../../main/webapp/app/entities/persona-pr/persona-pr.model';

describe('Component Tests', () => {

    describe('PersonaPr Management Detail Component', () => {
        let comp: PersonaPrDetailComponent;
        let fixture: ComponentFixture<PersonaPrDetailComponent>;
        let service: PersonaPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [PersonaPrDetailComponent],
                providers: [
                    PersonaPrService
                ]
            })
            .overrideTemplate(PersonaPrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonaPrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonaPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PersonaPr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.persona).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
