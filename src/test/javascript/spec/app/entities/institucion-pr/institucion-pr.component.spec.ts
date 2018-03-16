/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProsopografiaTestModule } from '../../../test.module';
import { InstitucionPrComponent } from '../../../../../../main/webapp/app/entities/institucion-pr/institucion-pr.component';
import { InstitucionPrService } from '../../../../../../main/webapp/app/entities/institucion-pr/institucion-pr.service';
import { InstitucionPr } from '../../../../../../main/webapp/app/entities/institucion-pr/institucion-pr.model';

describe('Component Tests', () => {

    describe('InstitucionPr Management Component', () => {
        let comp: InstitucionPrComponent;
        let fixture: ComponentFixture<InstitucionPrComponent>;
        let service: InstitucionPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [InstitucionPrComponent],
                providers: [
                    InstitucionPrService
                ]
            })
            .overrideTemplate(InstitucionPrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InstitucionPrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InstitucionPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new InstitucionPr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.institucions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
