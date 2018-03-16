/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProsopografiaTestModule } from '../../../test.module';
import { ParejaPersonajePrDialogComponent } from '../../../../../../main/webapp/app/entities/pareja-personaje-pr/pareja-personaje-pr-dialog.component';
import { ParejaPersonajePrService } from '../../../../../../main/webapp/app/entities/pareja-personaje-pr/pareja-personaje-pr.service';
import { ParejaPersonajePr } from '../../../../../../main/webapp/app/entities/pareja-personaje-pr/pareja-personaje-pr.model';
import { PersonaPrService } from '../../../../../../main/webapp/app/entities/persona-pr';
import { PersonajePrService } from '../../../../../../main/webapp/app/entities/personaje-pr';

describe('Component Tests', () => {

    describe('ParejaPersonajePr Management Dialog Component', () => {
        let comp: ParejaPersonajePrDialogComponent;
        let fixture: ComponentFixture<ParejaPersonajePrDialogComponent>;
        let service: ParejaPersonajePrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [ParejaPersonajePrDialogComponent],
                providers: [
                    PersonaPrService,
                    PersonajePrService,
                    ParejaPersonajePrService
                ]
            })
            .overrideTemplate(ParejaPersonajePrDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ParejaPersonajePrDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParejaPersonajePrService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ParejaPersonajePr(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.parejaPersonaje = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'parejaPersonajeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ParejaPersonajePr();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.parejaPersonaje = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'parejaPersonajeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
