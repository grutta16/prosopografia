/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProsopografiaTestModule } from '../../../test.module';
import { EstudioPersonajePrDetailComponent } from '../../../../../../main/webapp/app/entities/estudio-personaje-pr/estudio-personaje-pr-detail.component';
import { EstudioPersonajePrService } from '../../../../../../main/webapp/app/entities/estudio-personaje-pr/estudio-personaje-pr.service';
import { EstudioPersonajePr } from '../../../../../../main/webapp/app/entities/estudio-personaje-pr/estudio-personaje-pr.model';

describe('Component Tests', () => {

    describe('EstudioPersonajePr Management Detail Component', () => {
        let comp: EstudioPersonajePrDetailComponent;
        let fixture: ComponentFixture<EstudioPersonajePrDetailComponent>;
        let service: EstudioPersonajePrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [EstudioPersonajePrDetailComponent],
                providers: [
                    EstudioPersonajePrService
                ]
            })
            .overrideTemplate(EstudioPersonajePrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EstudioPersonajePrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstudioPersonajePrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new EstudioPersonajePr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.estudioPersonaje).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
