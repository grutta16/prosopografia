/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProsopografiaTestModule } from '../../../test.module';
import { AsociacionPrComponent } from '../../../../../../main/webapp/app/entities/asociacion-pr/asociacion-pr.component';
import { AsociacionPrService } from '../../../../../../main/webapp/app/entities/asociacion-pr/asociacion-pr.service';
import { AsociacionPr } from '../../../../../../main/webapp/app/entities/asociacion-pr/asociacion-pr.model';

describe('Component Tests', () => {

    describe('AsociacionPr Management Component', () => {
        let comp: AsociacionPrComponent;
        let fixture: ComponentFixture<AsociacionPrComponent>;
        let service: AsociacionPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [AsociacionPrComponent],
                providers: [
                    AsociacionPrService
                ]
            })
            .overrideTemplate(AsociacionPrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AsociacionPrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AsociacionPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AsociacionPr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.asociacions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
