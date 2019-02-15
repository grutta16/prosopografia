/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProsopografiaTestModule } from '../../../test.module';
import { AsociacionPersonajePrDetailComponent } from '../../../../../../main/webapp/app/entities/asociacion-personaje-pr/asociacion-personaje-pr-detail.component';
import { AsociacionPersonajePrService } from '../../../../../../main/webapp/app/entities/asociacion-personaje-pr/asociacion-personaje-pr.service';
import { AsociacionPersonajePr } from '../../../../../../main/webapp/app/entities/asociacion-personaje-pr/asociacion-personaje-pr.model';

describe('Component Tests', () => {

    describe('AsociacionPersonajePr Management Detail Component', () => {
        let comp: AsociacionPersonajePrDetailComponent;
        let fixture: ComponentFixture<AsociacionPersonajePrDetailComponent>;
        let service: AsociacionPersonajePrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [AsociacionPersonajePrDetailComponent],
                providers: [
                    AsociacionPersonajePrService
                ]
            })
            .overrideTemplate(AsociacionPersonajePrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AsociacionPersonajePrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AsociacionPersonajePrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AsociacionPersonajePr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.asociacionPersonaje).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
