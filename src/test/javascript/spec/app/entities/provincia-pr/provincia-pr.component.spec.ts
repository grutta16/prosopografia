/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProsopografiaTestModule } from '../../../test.module';
import { ProvinciaPrComponent } from '../../../../../../main/webapp/app/entities/provincia-pr/provincia-pr.component';
import { ProvinciaPrService } from '../../../../../../main/webapp/app/entities/provincia-pr/provincia-pr.service';
import { ProvinciaPr } from '../../../../../../main/webapp/app/entities/provincia-pr/provincia-pr.model';

describe('Component Tests', () => {

    describe('ProvinciaPr Management Component', () => {
        let comp: ProvinciaPrComponent;
        let fixture: ComponentFixture<ProvinciaPrComponent>;
        let service: ProvinciaPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [ProvinciaPrComponent],
                providers: [
                    ProvinciaPrService
                ]
            })
            .overrideTemplate(ProvinciaPrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProvinciaPrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProvinciaPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ProvinciaPr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.provincias[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
