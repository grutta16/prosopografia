/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProsopografiaTestModule } from '../../../test.module';
import { CandidaturaPrComponent } from '../../../../../../main/webapp/app/entities/candidatura-pr/candidatura-pr.component';
import { CandidaturaPrService } from '../../../../../../main/webapp/app/entities/candidatura-pr/candidatura-pr.service';
import { CandidaturaPr } from '../../../../../../main/webapp/app/entities/candidatura-pr/candidatura-pr.model';

describe('Component Tests', () => {

    describe('CandidaturaPr Management Component', () => {
        let comp: CandidaturaPrComponent;
        let fixture: ComponentFixture<CandidaturaPrComponent>;
        let service: CandidaturaPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [CandidaturaPrComponent],
                providers: [
                    CandidaturaPrService
                ]
            })
            .overrideTemplate(CandidaturaPrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CandidaturaPrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CandidaturaPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CandidaturaPr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.candidaturas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
