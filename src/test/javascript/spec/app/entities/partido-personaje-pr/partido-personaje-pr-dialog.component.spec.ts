/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProsopografiaTestModule } from '../../../test.module';
import { PartidoPersonajePrDialogComponent } from '../../../../../../main/webapp/app/entities/partido-personaje-pr/partido-personaje-pr-dialog.component';
import { PartidoPersonajePrService } from '../../../../../../main/webapp/app/entities/partido-personaje-pr/partido-personaje-pr.service';
import { PartidoPersonajePr } from '../../../../../../main/webapp/app/entities/partido-personaje-pr/partido-personaje-pr.model';
import { PartidoPrService } from '../../../../../../main/webapp/app/entities/partido-pr';
import { PersonajePrService } from '../../../../../../main/webapp/app/entities/personaje-pr';

describe('Component Tests', () => {

    describe('PartidoPersonajePr Management Dialog Component', () => {
        let comp: PartidoPersonajePrDialogComponent;
        let fixture: ComponentFixture<PartidoPersonajePrDialogComponent>;
        let service: PartidoPersonajePrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [PartidoPersonajePrDialogComponent],
                providers: [
                    PartidoPrService,
                    PersonajePrService,
                    PartidoPersonajePrService
                ]
            })
            .overrideTemplate(PartidoPersonajePrDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PartidoPersonajePrDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PartidoPersonajePrService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PartidoPersonajePr(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.partidoPersonaje = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'partidoPersonajeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PartidoPersonajePr();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.partidoPersonaje = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'partidoPersonajeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
