/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProsopografiaTestModule } from '../../../test.module';
import { ProvinciaPrDetailComponent } from '../../../../../../main/webapp/app/entities/provincia-pr/provincia-pr-detail.component';
import { ProvinciaPrService } from '../../../../../../main/webapp/app/entities/provincia-pr/provincia-pr.service';
import { ProvinciaPr } from '../../../../../../main/webapp/app/entities/provincia-pr/provincia-pr.model';

describe('Component Tests', () => {

    describe('ProvinciaPr Management Detail Component', () => {
        let comp: ProvinciaPrDetailComponent;
        let fixture: ComponentFixture<ProvinciaPrDetailComponent>;
        let service: ProvinciaPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [ProvinciaPrDetailComponent],
                providers: [
                    ProvinciaPrService
                ]
            })
            .overrideTemplate(ProvinciaPrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProvinciaPrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProvinciaPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ProvinciaPr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.provincia).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
