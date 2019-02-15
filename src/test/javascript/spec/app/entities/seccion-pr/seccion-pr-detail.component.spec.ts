/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProsopografiaTestModule } from '../../../test.module';
import { SeccionPrDetailComponent } from '../../../../../../main/webapp/app/entities/seccion-pr/seccion-pr-detail.component';
import { SeccionPrService } from '../../../../../../main/webapp/app/entities/seccion-pr/seccion-pr.service';
import { SeccionPr } from '../../../../../../main/webapp/app/entities/seccion-pr/seccion-pr.model';

describe('Component Tests', () => {

    describe('SeccionPr Management Detail Component', () => {
        let comp: SeccionPrDetailComponent;
        let fixture: ComponentFixture<SeccionPrDetailComponent>;
        let service: SeccionPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [SeccionPrDetailComponent],
                providers: [
                    SeccionPrService
                ]
            })
            .overrideTemplate(SeccionPrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SeccionPrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SeccionPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SeccionPr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.seccion).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
