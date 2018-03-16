/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProsopografiaTestModule } from '../../../test.module';
import { LugarPrDetailComponent } from '../../../../../../main/webapp/app/entities/lugar-pr/lugar-pr-detail.component';
import { LugarPrService } from '../../../../../../main/webapp/app/entities/lugar-pr/lugar-pr.service';
import { LugarPr } from '../../../../../../main/webapp/app/entities/lugar-pr/lugar-pr.model';

describe('Component Tests', () => {

    describe('LugarPr Management Detail Component', () => {
        let comp: LugarPrDetailComponent;
        let fixture: ComponentFixture<LugarPrDetailComponent>;
        let service: LugarPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [LugarPrDetailComponent],
                providers: [
                    LugarPrService
                ]
            })
            .overrideTemplate(LugarPrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LugarPrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LugarPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new LugarPr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.lugar).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
