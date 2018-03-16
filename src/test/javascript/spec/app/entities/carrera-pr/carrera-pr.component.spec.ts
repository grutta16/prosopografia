/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProsopografiaTestModule } from '../../../test.module';
import { CarreraPrComponent } from '../../../../../../main/webapp/app/entities/carrera-pr/carrera-pr.component';
import { CarreraPrService } from '../../../../../../main/webapp/app/entities/carrera-pr/carrera-pr.service';
import { CarreraPr } from '../../../../../../main/webapp/app/entities/carrera-pr/carrera-pr.model';

describe('Component Tests', () => {

    describe('CarreraPr Management Component', () => {
        let comp: CarreraPrComponent;
        let fixture: ComponentFixture<CarreraPrComponent>;
        let service: CarreraPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [CarreraPrComponent],
                providers: [
                    CarreraPrService
                ]
            })
            .overrideTemplate(CarreraPrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CarreraPrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CarreraPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CarreraPr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.carreras[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
