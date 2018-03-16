/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProsopografiaTestModule } from '../../../test.module';
import { PersonajePrDetailComponent } from '../../../../../../main/webapp/app/entities/personaje-pr/personaje-pr-detail.component';
import { PersonajePrService } from '../../../../../../main/webapp/app/entities/personaje-pr/personaje-pr.service';
import { PersonajePr } from '../../../../../../main/webapp/app/entities/personaje-pr/personaje-pr.model';

describe('Component Tests', () => {

    describe('PersonajePr Management Detail Component', () => {
        let comp: PersonajePrDetailComponent;
        let fixture: ComponentFixture<PersonajePrDetailComponent>;
        let service: PersonajePrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [PersonajePrDetailComponent],
                providers: [
                    PersonajePrService
                ]
            })
            .overrideTemplate(PersonajePrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonajePrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonajePrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PersonajePr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.personaje).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
