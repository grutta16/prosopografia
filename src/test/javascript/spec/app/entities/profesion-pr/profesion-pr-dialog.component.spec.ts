/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProsopografiaTestModule } from '../../../test.module';
import { ProfesionPrDialogComponent } from '../../../../../../main/webapp/app/entities/profesion-pr/profesion-pr-dialog.component';
import { ProfesionPrService } from '../../../../../../main/webapp/app/entities/profesion-pr/profesion-pr.service';
import { ProfesionPr } from '../../../../../../main/webapp/app/entities/profesion-pr/profesion-pr.model';
import { TipoProfesionPrService } from '../../../../../../main/webapp/app/entities/tipo-profesion-pr';

describe('Component Tests', () => {

    describe('ProfesionPr Management Dialog Component', () => {
        let comp: ProfesionPrDialogComponent;
        let fixture: ComponentFixture<ProfesionPrDialogComponent>;
        let service: ProfesionPrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [ProfesionPrDialogComponent],
                providers: [
                    TipoProfesionPrService,
                    ProfesionPrService
                ]
            })
            .overrideTemplate(ProfesionPrDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProfesionPrDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProfesionPrService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProfesionPr(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.profesion = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'profesionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProfesionPr();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.profesion = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'profesionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
