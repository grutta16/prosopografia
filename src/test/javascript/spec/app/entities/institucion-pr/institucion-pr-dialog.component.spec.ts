/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProsopografiaTestModule } from '../../../test.module';
import { InstitucionPrDialogComponent } from '../../../../../../main/webapp/app/entities/institucion-pr/institucion-pr-dialog.component';
import { InstitucionPrService } from '../../../../../../main/webapp/app/entities/institucion-pr/institucion-pr.service';
import { InstitucionPr } from '../../../../../../main/webapp/app/entities/institucion-pr/institucion-pr.model';
import { LugarPrService } from '../../../../../../main/webapp/app/entities/lugar-pr';
import { CarreraPrService } from '../../../../../../main/webapp/app/entities/carrera-pr';

describe('Component Tests', () => {

    describe('InstitucionPr Management Dialog Component', () => {
        let comp: InstitucionPrDialogComponent;
        let fixture: ComponentFixture<InstitucionPrDialogComponent>;
        let service: InstitucionPrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [InstitucionPrDialogComponent],
                providers: [
                    LugarPrService,
                    CarreraPrService,
                    InstitucionPrService
                ]
            })
            .overrideTemplate(InstitucionPrDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InstitucionPrDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InstitucionPrService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new InstitucionPr(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.institucion = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'institucionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new InstitucionPr();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.institucion = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'institucionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
