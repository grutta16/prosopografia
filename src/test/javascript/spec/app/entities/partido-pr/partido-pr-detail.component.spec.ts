/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProsopografiaTestModule } from '../../../test.module';
import { PartidoPrDetailComponent } from '../../../../../../main/webapp/app/entities/partido-pr/partido-pr-detail.component';
import { PartidoPrService } from '../../../../../../main/webapp/app/entities/partido-pr/partido-pr.service';
import { PartidoPr } from '../../../../../../main/webapp/app/entities/partido-pr/partido-pr.model';

describe('Component Tests', () => {

    describe('PartidoPr Management Detail Component', () => {
        let comp: PartidoPrDetailComponent;
        let fixture: ComponentFixture<PartidoPrDetailComponent>;
        let service: PartidoPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [PartidoPrDetailComponent],
                providers: [
                    PartidoPrService
                ]
            })
            .overrideTemplate(PartidoPrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PartidoPrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PartidoPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PartidoPr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.partido).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
