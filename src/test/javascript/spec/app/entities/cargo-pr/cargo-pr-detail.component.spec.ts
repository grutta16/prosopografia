/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProsopografiaTestModule } from '../../../test.module';
import { CargoPrDetailComponent } from '../../../../../../main/webapp/app/entities/cargo-pr/cargo-pr-detail.component';
import { CargoPrService } from '../../../../../../main/webapp/app/entities/cargo-pr/cargo-pr.service';
import { CargoPr } from '../../../../../../main/webapp/app/entities/cargo-pr/cargo-pr.model';

describe('Component Tests', () => {

    describe('CargoPr Management Detail Component', () => {
        let comp: CargoPrDetailComponent;
        let fixture: ComponentFixture<CargoPrDetailComponent>;
        let service: CargoPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [CargoPrDetailComponent],
                providers: [
                    CargoPrService
                ]
            })
            .overrideTemplate(CargoPrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CargoPrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CargoPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CargoPr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cargo).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
