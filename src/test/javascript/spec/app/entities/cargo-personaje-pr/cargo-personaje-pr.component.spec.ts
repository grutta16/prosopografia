/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProsopografiaTestModule } from '../../../test.module';
import { CargoPersonajePrComponent } from '../../../../../../main/webapp/app/entities/cargo-personaje-pr/cargo-personaje-pr.component';
import { CargoPersonajePrService } from '../../../../../../main/webapp/app/entities/cargo-personaje-pr/cargo-personaje-pr.service';
import { CargoPersonajePr } from '../../../../../../main/webapp/app/entities/cargo-personaje-pr/cargo-personaje-pr.model';

describe('Component Tests', () => {

    describe('CargoPersonajePr Management Component', () => {
        let comp: CargoPersonajePrComponent;
        let fixture: ComponentFixture<CargoPersonajePrComponent>;
        let service: CargoPersonajePrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [CargoPersonajePrComponent],
                providers: [
                    CargoPersonajePrService
                ]
            })
            .overrideTemplate(CargoPersonajePrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CargoPersonajePrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CargoPersonajePrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CargoPersonajePr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cargoPersonajes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
