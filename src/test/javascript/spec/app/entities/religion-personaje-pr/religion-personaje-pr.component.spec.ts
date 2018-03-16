/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProsopografiaTestModule } from '../../../test.module';
import { ReligionPersonajePrComponent } from '../../../../../../main/webapp/app/entities/religion-personaje-pr/religion-personaje-pr.component';
import { ReligionPersonajePrService } from '../../../../../../main/webapp/app/entities/religion-personaje-pr/religion-personaje-pr.service';
import { ReligionPersonajePr } from '../../../../../../main/webapp/app/entities/religion-personaje-pr/religion-personaje-pr.model';

describe('Component Tests', () => {

    describe('ReligionPersonajePr Management Component', () => {
        let comp: ReligionPersonajePrComponent;
        let fixture: ComponentFixture<ReligionPersonajePrComponent>;
        let service: ReligionPersonajePrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [ReligionPersonajePrComponent],
                providers: [
                    ReligionPersonajePrService
                ]
            })
            .overrideTemplate(ReligionPersonajePrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReligionPersonajePrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReligionPersonajePrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ReligionPersonajePr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.religionPersonajes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
