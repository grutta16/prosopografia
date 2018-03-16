/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProsopografiaTestModule } from '../../../test.module';
import { EleccionPrComponent } from '../../../../../../main/webapp/app/entities/eleccion-pr/eleccion-pr.component';
import { EleccionPrService } from '../../../../../../main/webapp/app/entities/eleccion-pr/eleccion-pr.service';
import { EleccionPr } from '../../../../../../main/webapp/app/entities/eleccion-pr/eleccion-pr.model';

describe('Component Tests', () => {

    describe('EleccionPr Management Component', () => {
        let comp: EleccionPrComponent;
        let fixture: ComponentFixture<EleccionPrComponent>;
        let service: EleccionPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [EleccionPrComponent],
                providers: [
                    EleccionPrService
                ]
            })
            .overrideTemplate(EleccionPrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EleccionPrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EleccionPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new EleccionPr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.eleccions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
