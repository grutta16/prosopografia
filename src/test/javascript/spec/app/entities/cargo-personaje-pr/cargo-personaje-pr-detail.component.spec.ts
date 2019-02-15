/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProsopografiaTestModule } from '../../../test.module';
import { CargoPersonajePrDetailComponent } from '../../../../../../main/webapp/app/entities/cargo-personaje-pr/cargo-personaje-pr-detail.component';
import { CargoPersonajePrService } from '../../../../../../main/webapp/app/entities/cargo-personaje-pr/cargo-personaje-pr.service';
import { CargoPersonajePr } from '../../../../../../main/webapp/app/entities/cargo-personaje-pr/cargo-personaje-pr.model';

describe('Component Tests', () => {

    describe('CargoPersonajePr Management Detail Component', () => {
        let comp: CargoPersonajePrDetailComponent;
        let fixture: ComponentFixture<CargoPersonajePrDetailComponent>;
        let service: CargoPersonajePrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [CargoPersonajePrDetailComponent],
                providers: [
                    CargoPersonajePrService
                ]
            })
            .overrideTemplate(CargoPersonajePrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CargoPersonajePrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CargoPersonajePrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CargoPersonajePr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cargoPersonaje).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
