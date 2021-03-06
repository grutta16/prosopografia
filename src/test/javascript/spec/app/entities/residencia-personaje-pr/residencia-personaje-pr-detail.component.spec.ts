/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProsopografiaTestModule } from '../../../test.module';
import { ResidenciaPersonajePrDetailComponent } from '../../../../../../main/webapp/app/entities/residencia-personaje-pr/residencia-personaje-pr-detail.component';
import { ResidenciaPersonajePrService } from '../../../../../../main/webapp/app/entities/residencia-personaje-pr/residencia-personaje-pr.service';
import { ResidenciaPersonajePr } from '../../../../../../main/webapp/app/entities/residencia-personaje-pr/residencia-personaje-pr.model';

describe('Component Tests', () => {

    describe('ResidenciaPersonajePr Management Detail Component', () => {
        let comp: ResidenciaPersonajePrDetailComponent;
        let fixture: ComponentFixture<ResidenciaPersonajePrDetailComponent>;
        let service: ResidenciaPersonajePrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [ResidenciaPersonajePrDetailComponent],
                providers: [
                    ResidenciaPersonajePrService
                ]
            })
            .overrideTemplate(ResidenciaPersonajePrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ResidenciaPersonajePrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResidenciaPersonajePrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ResidenciaPersonajePr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.residenciaPersonaje).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
