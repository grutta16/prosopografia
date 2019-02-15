/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProsopografiaTestModule } from '../../../test.module';
import { ReligionPrComponent } from '../../../../../../main/webapp/app/entities/religion-pr/religion-pr.component';
import { ReligionPrService } from '../../../../../../main/webapp/app/entities/religion-pr/religion-pr.service';
import { ReligionPr } from '../../../../../../main/webapp/app/entities/religion-pr/religion-pr.model';

describe('Component Tests', () => {

    describe('ReligionPr Management Component', () => {
        let comp: ReligionPrComponent;
        let fixture: ComponentFixture<ReligionPrComponent>;
        let service: ReligionPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [ReligionPrComponent],
                providers: [
                    ReligionPrService
                ]
            })
            .overrideTemplate(ReligionPrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReligionPrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReligionPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ReligionPr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.religions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
