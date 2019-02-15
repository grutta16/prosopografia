/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProsopografiaTestModule } from '../../../test.module';
import { ParejaPersonajePrDetailComponent } from '../../../../../../main/webapp/app/entities/pareja-personaje-pr/pareja-personaje-pr-detail.component';
import { ParejaPersonajePrService } from '../../../../../../main/webapp/app/entities/pareja-personaje-pr/pareja-personaje-pr.service';
import { ParejaPersonajePr } from '../../../../../../main/webapp/app/entities/pareja-personaje-pr/pareja-personaje-pr.model';

describe('Component Tests', () => {

    describe('ParejaPersonajePr Management Detail Component', () => {
        let comp: ParejaPersonajePrDetailComponent;
        let fixture: ComponentFixture<ParejaPersonajePrDetailComponent>;
        let service: ParejaPersonajePrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [ParejaPersonajePrDetailComponent],
                providers: [
                    ParejaPersonajePrService
                ]
            })
            .overrideTemplate(ParejaPersonajePrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ParejaPersonajePrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParejaPersonajePrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ParejaPersonajePr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.parejaPersonaje).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
