/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProsopografiaTestModule } from '../../../test.module';
import { SeccionPrComponent } from '../../../../../../main/webapp/app/entities/seccion-pr/seccion-pr.component';
import { SeccionPrService } from '../../../../../../main/webapp/app/entities/seccion-pr/seccion-pr.service';
import { SeccionPr } from '../../../../../../main/webapp/app/entities/seccion-pr/seccion-pr.model';

describe('Component Tests', () => {

    describe('SeccionPr Management Component', () => {
        let comp: SeccionPrComponent;
        let fixture: ComponentFixture<SeccionPrComponent>;
        let service: SeccionPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [SeccionPrComponent],
                providers: [
                    SeccionPrService
                ]
            })
            .overrideTemplate(SeccionPrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SeccionPrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SeccionPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SeccionPr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.seccions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
