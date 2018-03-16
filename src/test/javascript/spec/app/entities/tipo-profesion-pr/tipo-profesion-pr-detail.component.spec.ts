/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProsopografiaTestModule } from '../../../test.module';
import { TipoProfesionPrDetailComponent } from '../../../../../../main/webapp/app/entities/tipo-profesion-pr/tipo-profesion-pr-detail.component';
import { TipoProfesionPrService } from '../../../../../../main/webapp/app/entities/tipo-profesion-pr/tipo-profesion-pr.service';
import { TipoProfesionPr } from '../../../../../../main/webapp/app/entities/tipo-profesion-pr/tipo-profesion-pr.model';

describe('Component Tests', () => {

    describe('TipoProfesionPr Management Detail Component', () => {
        let comp: TipoProfesionPrDetailComponent;
        let fixture: ComponentFixture<TipoProfesionPrDetailComponent>;
        let service: TipoProfesionPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [TipoProfesionPrDetailComponent],
                providers: [
                    TipoProfesionPrService
                ]
            })
            .overrideTemplate(TipoProfesionPrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoProfesionPrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoProfesionPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TipoProfesionPr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tipoProfesion).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
