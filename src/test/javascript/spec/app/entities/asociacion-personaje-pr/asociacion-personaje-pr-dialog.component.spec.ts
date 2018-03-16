/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProsopografiaTestModule } from '../../../test.module';
import { AsociacionPersonajePrDialogComponent } from '../../../../../../main/webapp/app/entities/asociacion-personaje-pr/asociacion-personaje-pr-dialog.component';
import { AsociacionPersonajePrService } from '../../../../../../main/webapp/app/entities/asociacion-personaje-pr/asociacion-personaje-pr.service';
import { AsociacionPersonajePr } from '../../../../../../main/webapp/app/entities/asociacion-personaje-pr/asociacion-personaje-pr.model';
import { AsociacionPrService } from '../../../../../../main/webapp/app/entities/asociacion-pr';
import { PersonajePrService } from '../../../../../../main/webapp/app/entities/personaje-pr';

describe('Component Tests', () => {

    describe('AsociacionPersonajePr Management Dialog Component', () => {
        let comp: AsociacionPersonajePrDialogComponent;
        let fixture: ComponentFixture<AsociacionPersonajePrDialogComponent>;
        let service: AsociacionPersonajePrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [AsociacionPersonajePrDialogComponent],
                providers: [
                    AsociacionPrService,
                    PersonajePrService,
                    AsociacionPersonajePrService
                ]
            })
            .overrideTemplate(AsociacionPersonajePrDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AsociacionPersonajePrDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AsociacionPersonajePrService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AsociacionPersonajePr(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.asociacionPersonaje = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'asociacionPersonajeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AsociacionPersonajePr();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.asociacionPersonaje = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'asociacionPersonajeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
