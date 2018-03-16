/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProsopografiaTestModule } from '../../../test.module';
import { CargoPrComponent } from '../../../../../../main/webapp/app/entities/cargo-pr/cargo-pr.component';
import { CargoPrService } from '../../../../../../main/webapp/app/entities/cargo-pr/cargo-pr.service';
import { CargoPr } from '../../../../../../main/webapp/app/entities/cargo-pr/cargo-pr.model';

describe('Component Tests', () => {

    describe('CargoPr Management Component', () => {
        let comp: CargoPrComponent;
        let fixture: ComponentFixture<CargoPrComponent>;
        let service: CargoPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [CargoPrComponent],
                providers: [
                    CargoPrService
                ]
            })
            .overrideTemplate(CargoPrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CargoPrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CargoPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CargoPr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cargos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
