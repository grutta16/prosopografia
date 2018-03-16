/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProsopografiaTestModule } from '../../../test.module';
import { PaisPrDetailComponent } from '../../../../../../main/webapp/app/entities/pais-pr/pais-pr-detail.component';
import { PaisPrService } from '../../../../../../main/webapp/app/entities/pais-pr/pais-pr.service';
import { PaisPr } from '../../../../../../main/webapp/app/entities/pais-pr/pais-pr.model';

describe('Component Tests', () => {

    describe('PaisPr Management Detail Component', () => {
        let comp: PaisPrDetailComponent;
        let fixture: ComponentFixture<PaisPrDetailComponent>;
        let service: PaisPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [PaisPrDetailComponent],
                providers: [
                    PaisPrService
                ]
            })
            .overrideTemplate(PaisPrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PaisPrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaisPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PaisPr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.pais).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
