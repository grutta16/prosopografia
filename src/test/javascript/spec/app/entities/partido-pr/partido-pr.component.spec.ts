/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProsopografiaTestModule } from '../../../test.module';
import { PartidoPrComponent } from '../../../../../../main/webapp/app/entities/partido-pr/partido-pr.component';
import { PartidoPrService } from '../../../../../../main/webapp/app/entities/partido-pr/partido-pr.service';
import { PartidoPr } from '../../../../../../main/webapp/app/entities/partido-pr/partido-pr.model';

describe('Component Tests', () => {

    describe('PartidoPr Management Component', () => {
        let comp: PartidoPrComponent;
        let fixture: ComponentFixture<PartidoPrComponent>;
        let service: PartidoPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [PartidoPrComponent],
                providers: [
                    PartidoPrService
                ]
            })
            .overrideTemplate(PartidoPrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PartidoPrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PartidoPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PartidoPr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.partidos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
