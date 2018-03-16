/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProsopografiaTestModule } from '../../../test.module';
import { EleccionPrDetailComponent } from '../../../../../../main/webapp/app/entities/eleccion-pr/eleccion-pr-detail.component';
import { EleccionPrService } from '../../../../../../main/webapp/app/entities/eleccion-pr/eleccion-pr.service';
import { EleccionPr } from '../../../../../../main/webapp/app/entities/eleccion-pr/eleccion-pr.model';

describe('Component Tests', () => {

    describe('EleccionPr Management Detail Component', () => {
        let comp: EleccionPrDetailComponent;
        let fixture: ComponentFixture<EleccionPrDetailComponent>;
        let service: EleccionPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [EleccionPrDetailComponent],
                providers: [
                    EleccionPrService
                ]
            })
            .overrideTemplate(EleccionPrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EleccionPrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EleccionPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new EleccionPr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.eleccion).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
