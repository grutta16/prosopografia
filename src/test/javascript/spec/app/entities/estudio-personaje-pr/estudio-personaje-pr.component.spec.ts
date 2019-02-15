/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProsopografiaTestModule } from '../../../test.module';
import { EstudioPersonajePrComponent } from '../../../../../../main/webapp/app/entities/estudio-personaje-pr/estudio-personaje-pr.component';
import { EstudioPersonajePrService } from '../../../../../../main/webapp/app/entities/estudio-personaje-pr/estudio-personaje-pr.service';
import { EstudioPersonajePr } from '../../../../../../main/webapp/app/entities/estudio-personaje-pr/estudio-personaje-pr.model';

describe('Component Tests', () => {

    describe('EstudioPersonajePr Management Component', () => {
        let comp: EstudioPersonajePrComponent;
        let fixture: ComponentFixture<EstudioPersonajePrComponent>;
        let service: EstudioPersonajePrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [EstudioPersonajePrComponent],
                providers: [
                    EstudioPersonajePrService
                ]
            })
            .overrideTemplate(EstudioPersonajePrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EstudioPersonajePrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstudioPersonajePrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new EstudioPersonajePr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.estudioPersonajes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
