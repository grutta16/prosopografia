/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProsopografiaTestModule } from '../../../test.module';
import { PaisPrComponent } from '../../../../../../main/webapp/app/entities/pais-pr/pais-pr.component';
import { PaisPrService } from '../../../../../../main/webapp/app/entities/pais-pr/pais-pr.service';
import { PaisPr } from '../../../../../../main/webapp/app/entities/pais-pr/pais-pr.model';

describe('Component Tests', () => {

    describe('PaisPr Management Component', () => {
        let comp: PaisPrComponent;
        let fixture: ComponentFixture<PaisPrComponent>;
        let service: PaisPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [PaisPrComponent],
                providers: [
                    PaisPrService
                ]
            })
            .overrideTemplate(PaisPrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PaisPrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaisPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PaisPr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.pais[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
