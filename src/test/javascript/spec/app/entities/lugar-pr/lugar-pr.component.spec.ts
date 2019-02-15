/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProsopografiaTestModule } from '../../../test.module';
import { LugarPrComponent } from '../../../../../../main/webapp/app/entities/lugar-pr/lugar-pr.component';
import { LugarPrService } from '../../../../../../main/webapp/app/entities/lugar-pr/lugar-pr.service';
import { LugarPr } from '../../../../../../main/webapp/app/entities/lugar-pr/lugar-pr.model';

describe('Component Tests', () => {

    describe('LugarPr Management Component', () => {
        let comp: LugarPrComponent;
        let fixture: ComponentFixture<LugarPrComponent>;
        let service: LugarPrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [LugarPrComponent],
                providers: [
                    LugarPrService
                ]
            })
            .overrideTemplate(LugarPrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LugarPrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LugarPrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new LugarPr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.lugars[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
