/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProsopografiaTestModule } from '../../../test.module';
import { ResidenciaPersonajePrComponent } from '../../../../../../main/webapp/app/entities/residencia-personaje-pr/residencia-personaje-pr.component';
import { ResidenciaPersonajePrService } from '../../../../../../main/webapp/app/entities/residencia-personaje-pr/residencia-personaje-pr.service';
import { ResidenciaPersonajePr } from '../../../../../../main/webapp/app/entities/residencia-personaje-pr/residencia-personaje-pr.model';

describe('Component Tests', () => {

    describe('ResidenciaPersonajePr Management Component', () => {
        let comp: ResidenciaPersonajePrComponent;
        let fixture: ComponentFixture<ResidenciaPersonajePrComponent>;
        let service: ResidenciaPersonajePrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [ResidenciaPersonajePrComponent],
                providers: [
                    ResidenciaPersonajePrService
                ]
            })
            .overrideTemplate(ResidenciaPersonajePrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ResidenciaPersonajePrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResidenciaPersonajePrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ResidenciaPersonajePr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.residenciaPersonajes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
