/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProsopografiaTestModule } from '../../../test.module';
import { AsociacionPersonajePrComponent } from '../../../../../../main/webapp/app/entities/asociacion-personaje-pr/asociacion-personaje-pr.component';
import { AsociacionPersonajePrService } from '../../../../../../main/webapp/app/entities/asociacion-personaje-pr/asociacion-personaje-pr.service';
import { AsociacionPersonajePr } from '../../../../../../main/webapp/app/entities/asociacion-personaje-pr/asociacion-personaje-pr.model';

describe('Component Tests', () => {

    describe('AsociacionPersonajePr Management Component', () => {
        let comp: AsociacionPersonajePrComponent;
        let fixture: ComponentFixture<AsociacionPersonajePrComponent>;
        let service: AsociacionPersonajePrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [AsociacionPersonajePrComponent],
                providers: [
                    AsociacionPersonajePrService
                ]
            })
            .overrideTemplate(AsociacionPersonajePrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AsociacionPersonajePrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AsociacionPersonajePrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AsociacionPersonajePr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.asociacionPersonajes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
