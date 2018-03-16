/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProsopografiaTestModule } from '../../../test.module';
import { ParejaPersonajePrComponent } from '../../../../../../main/webapp/app/entities/pareja-personaje-pr/pareja-personaje-pr.component';
import { ParejaPersonajePrService } from '../../../../../../main/webapp/app/entities/pareja-personaje-pr/pareja-personaje-pr.service';
import { ParejaPersonajePr } from '../../../../../../main/webapp/app/entities/pareja-personaje-pr/pareja-personaje-pr.model';

describe('Component Tests', () => {

    describe('ParejaPersonajePr Management Component', () => {
        let comp: ParejaPersonajePrComponent;
        let fixture: ComponentFixture<ParejaPersonajePrComponent>;
        let service: ParejaPersonajePrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [ParejaPersonajePrComponent],
                providers: [
                    ParejaPersonajePrService
                ]
            })
            .overrideTemplate(ParejaPersonajePrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ParejaPersonajePrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParejaPersonajePrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ParejaPersonajePr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.parejaPersonajes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
