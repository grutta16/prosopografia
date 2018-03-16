/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProsopografiaTestModule } from '../../../test.module';
import { PartidoPersonajePrDetailComponent } from '../../../../../../main/webapp/app/entities/partido-personaje-pr/partido-personaje-pr-detail.component';
import { PartidoPersonajePrService } from '../../../../../../main/webapp/app/entities/partido-personaje-pr/partido-personaje-pr.service';
import { PartidoPersonajePr } from '../../../../../../main/webapp/app/entities/partido-personaje-pr/partido-personaje-pr.model';

describe('Component Tests', () => {

    describe('PartidoPersonajePr Management Detail Component', () => {
        let comp: PartidoPersonajePrDetailComponent;
        let fixture: ComponentFixture<PartidoPersonajePrDetailComponent>;
        let service: PartidoPersonajePrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [PartidoPersonajePrDetailComponent],
                providers: [
                    PartidoPersonajePrService
                ]
            })
            .overrideTemplate(PartidoPersonajePrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PartidoPersonajePrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PartidoPersonajePrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PartidoPersonajePr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.partidoPersonaje).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
