/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProsopografiaTestModule } from '../../../test.module';
import { CandidaturaPrDetailComponent } from '../../../../../../main/webapp/app/entities/candidatura-pr/candidatura-pr-detail.component';
import { CandidaturaPrService } from '../../../../../../main/webapp/app/entities/candidatura-pr/candidatura-pr.service';
import { CandidaturaPr } from '../../../../../../main/webapp/app/entities/candidatura-pr/candidatura-pr.model';

describe('Component Tests', () => {

    describe('CandidaturaPr Management Detail Component', () => {
        let comp: CandidaturaPrDetailComponent;
        let fixture: ComponentFixture<CandidaturaPrDetailComponent>;
        let service: CandidaturaPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [CandidaturaPrDetailComponent],
                providers: [
                    CandidaturaPrService
                ]
            })
            .overrideTemplate(CandidaturaPrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CandidaturaPrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CandidaturaPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CandidaturaPr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.candidatura).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
