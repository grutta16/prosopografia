/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProsopografiaTestModule } from '../../../test.module';
import { TipoProfesionPrComponent } from '../../../../../../main/webapp/app/entities/tipo-profesion-pr/tipo-profesion-pr.component';
import { TipoProfesionPrService } from '../../../../../../main/webapp/app/entities/tipo-profesion-pr/tipo-profesion-pr.service';
import { TipoProfesionPr } from '../../../../../../main/webapp/app/entities/tipo-profesion-pr/tipo-profesion-pr.model';

describe('Component Tests', () => {

    describe('TipoProfesionPr Management Component', () => {
        let comp: TipoProfesionPrComponent;
        let fixture: ComponentFixture<TipoProfesionPrComponent>;
        let service: TipoProfesionPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [TipoProfesionPrComponent],
                providers: [
                    TipoProfesionPrService
                ]
            })
            .overrideTemplate(TipoProfesionPrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoProfesionPrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoProfesionPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TipoProfesionPr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tipoProfesions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
