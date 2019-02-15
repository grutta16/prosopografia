/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProsopografiaTestModule } from '../../../test.module';
import { RelacionFamiliarPrDetailComponent } from '../../../../../../main/webapp/app/entities/relacion-familiar-pr/relacion-familiar-pr-detail.component';
import { RelacionFamiliarPrService } from '../../../../../../main/webapp/app/entities/relacion-familiar-pr/relacion-familiar-pr.service';
import { RelacionFamiliarPr } from '../../../../../../main/webapp/app/entities/relacion-familiar-pr/relacion-familiar-pr.model';

describe('Component Tests', () => {

    describe('RelacionFamiliarPr Management Detail Component', () => {
        let comp: RelacionFamiliarPrDetailComponent;
        let fixture: ComponentFixture<RelacionFamiliarPrDetailComponent>;
        let service: RelacionFamiliarPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [RelacionFamiliarPrDetailComponent],
                providers: [
                    RelacionFamiliarPrService
                ]
            })
            .overrideTemplate(RelacionFamiliarPrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RelacionFamiliarPrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RelacionFamiliarPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RelacionFamiliarPr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.relacionFamiliar).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
