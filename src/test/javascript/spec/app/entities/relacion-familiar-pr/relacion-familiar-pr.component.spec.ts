/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProsopografiaTestModule } from '../../../test.module';
import { RelacionFamiliarPrComponent } from '../../../../../../main/webapp/app/entities/relacion-familiar-pr/relacion-familiar-pr.component';
import { RelacionFamiliarPrService } from '../../../../../../main/webapp/app/entities/relacion-familiar-pr/relacion-familiar-pr.service';
import { RelacionFamiliarPr } from '../../../../../../main/webapp/app/entities/relacion-familiar-pr/relacion-familiar-pr.model';

describe('Component Tests', () => {

    describe('RelacionFamiliarPr Management Component', () => {
        let comp: RelacionFamiliarPrComponent;
        let fixture: ComponentFixture<RelacionFamiliarPrComponent>;
        let service: RelacionFamiliarPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [RelacionFamiliarPrComponent],
                providers: [
                    RelacionFamiliarPrService
                ]
            })
            .overrideTemplate(RelacionFamiliarPrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RelacionFamiliarPrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RelacionFamiliarPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RelacionFamiliarPr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.relacionFamiliars[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
