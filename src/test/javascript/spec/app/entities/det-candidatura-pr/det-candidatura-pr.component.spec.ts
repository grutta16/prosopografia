/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProsopografiaTestModule } from '../../../test.module';
import { DetCandidaturaPrComponent } from '../../../../../../main/webapp/app/entities/det-candidatura-pr/det-candidatura-pr.component';
import { DetCandidaturaPrService } from '../../../../../../main/webapp/app/entities/det-candidatura-pr/det-candidatura-pr.service';
import { DetCandidaturaPr } from '../../../../../../main/webapp/app/entities/det-candidatura-pr/det-candidatura-pr.model';

describe('Component Tests', () => {

    describe('DetCandidaturaPr Management Component', () => {
        let comp: DetCandidaturaPrComponent;
        let fixture: ComponentFixture<DetCandidaturaPrComponent>;
        let service: DetCandidaturaPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [DetCandidaturaPrComponent],
                providers: [
                    DetCandidaturaPrService
                ]
            })
            .overrideTemplate(DetCandidaturaPrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DetCandidaturaPrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DetCandidaturaPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DetCandidaturaPr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.detCandidaturas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
