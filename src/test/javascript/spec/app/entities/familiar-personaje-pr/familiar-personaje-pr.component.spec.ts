/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProsopografiaTestModule } from '../../../test.module';
import { FamiliarPersonajePrComponent } from '../../../../../../main/webapp/app/entities/familiar-personaje-pr/familiar-personaje-pr.component';
import { FamiliarPersonajePrService } from '../../../../../../main/webapp/app/entities/familiar-personaje-pr/familiar-personaje-pr.service';
import { FamiliarPersonajePr } from '../../../../../../main/webapp/app/entities/familiar-personaje-pr/familiar-personaje-pr.model';

describe('Component Tests', () => {

    describe('FamiliarPersonajePr Management Component', () => {
        let comp: FamiliarPersonajePrComponent;
        let fixture: ComponentFixture<FamiliarPersonajePrComponent>;
        let service: FamiliarPersonajePrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [FamiliarPersonajePrComponent],
                providers: [
                    FamiliarPersonajePrService
                ]
            })
            .overrideTemplate(FamiliarPersonajePrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FamiliarPersonajePrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FamiliarPersonajePrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new FamiliarPersonajePr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.familiarPersonajes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
