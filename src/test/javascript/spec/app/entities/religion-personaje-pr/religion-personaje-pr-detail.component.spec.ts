/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProsopografiaTestModule } from '../../../test.module';
import { ReligionPersonajePrDetailComponent } from '../../../../../../main/webapp/app/entities/religion-personaje-pr/religion-personaje-pr-detail.component';
import { ReligionPersonajePrService } from '../../../../../../main/webapp/app/entities/religion-personaje-pr/religion-personaje-pr.service';
import { ReligionPersonajePr } from '../../../../../../main/webapp/app/entities/religion-personaje-pr/religion-personaje-pr.model';

describe('Component Tests', () => {

    describe('ReligionPersonajePr Management Detail Component', () => {
        let comp: ReligionPersonajePrDetailComponent;
        let fixture: ComponentFixture<ReligionPersonajePrDetailComponent>;
        let service: ReligionPersonajePrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [ReligionPersonajePrDetailComponent],
                providers: [
                    ReligionPersonajePrService
                ]
            })
            .overrideTemplate(ReligionPersonajePrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReligionPersonajePrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReligionPersonajePrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ReligionPersonajePr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.religionPersonaje).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
