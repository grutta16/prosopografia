/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProsopografiaTestModule } from '../../../test.module';
import { DetCandidaturaPrDialogComponent } from '../../../../../../main/webapp/app/entities/det-candidatura-pr/det-candidatura-pr-dialog.component';
import { DetCandidaturaPrService } from '../../../../../../main/webapp/app/entities/det-candidatura-pr/det-candidatura-pr.service';
import { DetCandidaturaPr } from '../../../../../../main/webapp/app/entities/det-candidatura-pr/det-candidatura-pr.model';
import { CandidaturaPrService } from '../../../../../../main/webapp/app/entities/candidatura-pr';

describe('Component Tests', () => {

    describe('DetCandidaturaPr Management Dialog Component', () => {
        let comp: DetCandidaturaPrDialogComponent;
        let fixture: ComponentFixture<DetCandidaturaPrDialogComponent>;
        let service: DetCandidaturaPrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [DetCandidaturaPrDialogComponent],
                providers: [
                    CandidaturaPrService,
                    DetCandidaturaPrService
                ]
            })
            .overrideTemplate(DetCandidaturaPrDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DetCandidaturaPrDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DetCandidaturaPrService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DetCandidaturaPr(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.detCandidatura = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'detCandidaturaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DetCandidaturaPr();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.detCandidatura = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'detCandidaturaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
