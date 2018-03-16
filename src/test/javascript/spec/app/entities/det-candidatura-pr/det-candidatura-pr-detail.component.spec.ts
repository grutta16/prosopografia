/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProsopografiaTestModule } from '../../../test.module';
import { DetCandidaturaPrDetailComponent } from '../../../../../../main/webapp/app/entities/det-candidatura-pr/det-candidatura-pr-detail.component';
import { DetCandidaturaPrService } from '../../../../../../main/webapp/app/entities/det-candidatura-pr/det-candidatura-pr.service';
import { DetCandidaturaPr } from '../../../../../../main/webapp/app/entities/det-candidatura-pr/det-candidatura-pr.model';

describe('Component Tests', () => {

    describe('DetCandidaturaPr Management Detail Component', () => {
        let comp: DetCandidaturaPrDetailComponent;
        let fixture: ComponentFixture<DetCandidaturaPrDetailComponent>;
        let service: DetCandidaturaPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [DetCandidaturaPrDetailComponent],
                providers: [
                    DetCandidaturaPrService
                ]
            })
            .overrideTemplate(DetCandidaturaPrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DetCandidaturaPrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DetCandidaturaPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DetCandidaturaPr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.detCandidatura).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
