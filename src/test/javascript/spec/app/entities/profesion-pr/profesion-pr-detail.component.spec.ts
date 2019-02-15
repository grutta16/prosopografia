/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProsopografiaTestModule } from '../../../test.module';
import { ProfesionPrDetailComponent } from '../../../../../../main/webapp/app/entities/profesion-pr/profesion-pr-detail.component';
import { ProfesionPrService } from '../../../../../../main/webapp/app/entities/profesion-pr/profesion-pr.service';
import { ProfesionPr } from '../../../../../../main/webapp/app/entities/profesion-pr/profesion-pr.model';

describe('Component Tests', () => {

    describe('ProfesionPr Management Detail Component', () => {
        let comp: ProfesionPrDetailComponent;
        let fixture: ComponentFixture<ProfesionPrDetailComponent>;
        let service: ProfesionPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [ProfesionPrDetailComponent],
                providers: [
                    ProfesionPrService
                ]
            })
            .overrideTemplate(ProfesionPrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProfesionPrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProfesionPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ProfesionPr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.profesion).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
