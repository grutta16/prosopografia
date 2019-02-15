/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProsopografiaTestModule } from '../../../test.module';
import { CarreraPrDetailComponent } from '../../../../../../main/webapp/app/entities/carrera-pr/carrera-pr-detail.component';
import { CarreraPrService } from '../../../../../../main/webapp/app/entities/carrera-pr/carrera-pr.service';
import { CarreraPr } from '../../../../../../main/webapp/app/entities/carrera-pr/carrera-pr.model';

describe('Component Tests', () => {

    describe('CarreraPr Management Detail Component', () => {
        let comp: CarreraPrDetailComponent;
        let fixture: ComponentFixture<CarreraPrDetailComponent>;
        let service: CarreraPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [CarreraPrDetailComponent],
                providers: [
                    CarreraPrService
                ]
            })
            .overrideTemplate(CarreraPrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CarreraPrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CarreraPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CarreraPr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.carrera).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
