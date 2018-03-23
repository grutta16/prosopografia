/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProsopografiaTestModule } from '../../../test.module';
import { CandidaturaPrDialogComponent } from '../../../../../../main/webapp/app/entities/candidatura-pr/candidatura-pr-dialog.component';
import { CandidaturaPrService } from '../../../../../../main/webapp/app/entities/candidatura-pr/candidatura-pr.service';
import { CandidaturaPr } from '../../../../../../main/webapp/app/entities/candidatura-pr/candidatura-pr.model';
import { EleccionPrService } from '../../../../../../main/webapp/app/entities/eleccion-pr';
import { SeccionPrService } from '../../../../../../main/webapp/app/entities/seccion-pr';
import { PersonajePrService } from '../../../../../../main/webapp/app/entities/personaje-pr';
import { PartidoPrService } from '../../../../../../main/webapp/app/entities/partido-pr';

describe('Component Tests', () => {

    describe('CandidaturaPr Management Dialog Component', () => {
        let comp: CandidaturaPrDialogComponent;
        let fixture: ComponentFixture<CandidaturaPrDialogComponent>;
        let service: CandidaturaPrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [CandidaturaPrDialogComponent],
                providers: [
                    EleccionPrService,
                    SeccionPrService,
                    PersonajePrService,
                    PartidoPrService,
                    CandidaturaPrService
                ]
            })
            .overrideTemplate(CandidaturaPrDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CandidaturaPrDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CandidaturaPrService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CandidaturaPr(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.candidatura = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'candidaturaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CandidaturaPr();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.candidatura = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'candidaturaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
