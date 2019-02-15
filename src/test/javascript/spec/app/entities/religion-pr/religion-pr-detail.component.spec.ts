/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProsopografiaTestModule } from '../../../test.module';
import { ReligionPrDetailComponent } from '../../../../../../main/webapp/app/entities/religion-pr/religion-pr-detail.component';
import { ReligionPrService } from '../../../../../../main/webapp/app/entities/religion-pr/religion-pr.service';
import { ReligionPr } from '../../../../../../main/webapp/app/entities/religion-pr/religion-pr.model';

describe('Component Tests', () => {

    describe('ReligionPr Management Detail Component', () => {
        let comp: ReligionPrDetailComponent;
        let fixture: ComponentFixture<ReligionPrDetailComponent>;
        let service: ReligionPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [ReligionPrDetailComponent],
                providers: [
                    ReligionPrService
                ]
            })
            .overrideTemplate(ReligionPrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReligionPrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReligionPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ReligionPr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.religion).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
