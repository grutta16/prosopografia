/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProsopografiaTestModule } from '../../../test.module';
import { PartidoPersonajePrComponent } from '../../../../../../main/webapp/app/entities/partido-personaje-pr/partido-personaje-pr.component';
import { PartidoPersonajePrService } from '../../../../../../main/webapp/app/entities/partido-personaje-pr/partido-personaje-pr.service';
import { PartidoPersonajePr } from '../../../../../../main/webapp/app/entities/partido-personaje-pr/partido-personaje-pr.model';

describe('Component Tests', () => {

    describe('PartidoPersonajePr Management Component', () => {
        let comp: PartidoPersonajePrComponent;
        let fixture: ComponentFixture<PartidoPersonajePrComponent>;
        let service: PartidoPersonajePrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [PartidoPersonajePrComponent],
                providers: [
                    PartidoPersonajePrService
                ]
            })
            .overrideTemplate(PartidoPersonajePrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PartidoPersonajePrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PartidoPersonajePrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PartidoPersonajePr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.partidoPersonajes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
