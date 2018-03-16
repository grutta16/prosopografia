/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProsopografiaTestModule } from '../../../test.module';
import { ProfesionPrComponent } from '../../../../../../main/webapp/app/entities/profesion-pr/profesion-pr.component';
import { ProfesionPrService } from '../../../../../../main/webapp/app/entities/profesion-pr/profesion-pr.service';
import { ProfesionPr } from '../../../../../../main/webapp/app/entities/profesion-pr/profesion-pr.model';

describe('Component Tests', () => {

    describe('ProfesionPr Management Component', () => {
        let comp: ProfesionPrComponent;
        let fixture: ComponentFixture<ProfesionPrComponent>;
        let service: ProfesionPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [ProfesionPrComponent],
                providers: [
                    ProfesionPrService
                ]
            })
            .overrideTemplate(ProfesionPrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProfesionPrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProfesionPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ProfesionPr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.profesions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
