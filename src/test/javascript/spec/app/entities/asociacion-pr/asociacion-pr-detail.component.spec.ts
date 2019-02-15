/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProsopografiaTestModule } from '../../../test.module';
import { AsociacionPrDetailComponent } from '../../../../../../main/webapp/app/entities/asociacion-pr/asociacion-pr-detail.component';
import { AsociacionPrService } from '../../../../../../main/webapp/app/entities/asociacion-pr/asociacion-pr.service';
import { AsociacionPr } from '../../../../../../main/webapp/app/entities/asociacion-pr/asociacion-pr.model';

describe('Component Tests', () => {

    describe('AsociacionPr Management Detail Component', () => {
        let comp: AsociacionPrDetailComponent;
        let fixture: ComponentFixture<AsociacionPrDetailComponent>;
        let service: AsociacionPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [AsociacionPrDetailComponent],
                providers: [
                    AsociacionPrService
                ]
            })
            .overrideTemplate(AsociacionPrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AsociacionPrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AsociacionPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AsociacionPr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.asociacion).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
