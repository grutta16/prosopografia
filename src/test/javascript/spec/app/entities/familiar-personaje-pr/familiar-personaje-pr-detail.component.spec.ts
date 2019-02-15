/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProsopografiaTestModule } from '../../../test.module';
import { FamiliarPersonajePrDetailComponent } from '../../../../../../main/webapp/app/entities/familiar-personaje-pr/familiar-personaje-pr-detail.component';
import { FamiliarPersonajePrService } from '../../../../../../main/webapp/app/entities/familiar-personaje-pr/familiar-personaje-pr.service';
import { FamiliarPersonajePr } from '../../../../../../main/webapp/app/entities/familiar-personaje-pr/familiar-personaje-pr.model';

describe('Component Tests', () => {

    describe('FamiliarPersonajePr Management Detail Component', () => {
        let comp: FamiliarPersonajePrDetailComponent;
        let fixture: ComponentFixture<FamiliarPersonajePrDetailComponent>;
        let service: FamiliarPersonajePrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [FamiliarPersonajePrDetailComponent],
                providers: [
                    FamiliarPersonajePrService
                ]
            })
            .overrideTemplate(FamiliarPersonajePrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FamiliarPersonajePrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FamiliarPersonajePrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new FamiliarPersonajePr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.familiarPersonaje).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
