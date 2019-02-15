/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProsopografiaTestModule } from '../../../test.module';
import { InstitucionPrDetailComponent } from '../../../../../../main/webapp/app/entities/institucion-pr/institucion-pr-detail.component';
import { InstitucionPrService } from '../../../../../../main/webapp/app/entities/institucion-pr/institucion-pr.service';
import { InstitucionPr } from '../../../../../../main/webapp/app/entities/institucion-pr/institucion-pr.model';

describe('Component Tests', () => {

    describe('InstitucionPr Management Detail Component', () => {
        let comp: InstitucionPrDetailComponent;
        let fixture: ComponentFixture<InstitucionPrDetailComponent>;
        let service: InstitucionPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [InstitucionPrDetailComponent],
                providers: [
                    InstitucionPrService
                ]
            })
            .overrideTemplate(InstitucionPrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InstitucionPrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InstitucionPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new InstitucionPr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.institucion).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
