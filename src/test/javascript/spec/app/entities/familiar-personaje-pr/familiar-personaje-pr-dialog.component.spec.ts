/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProsopografiaTestModule } from '../../../test.module';
import { FamiliarPersonajePrDialogComponent } from '../../../../../../main/webapp/app/entities/familiar-personaje-pr/familiar-personaje-pr-dialog.component';
import { FamiliarPersonajePrService } from '../../../../../../main/webapp/app/entities/familiar-personaje-pr/familiar-personaje-pr.service';
import { FamiliarPersonajePr } from '../../../../../../main/webapp/app/entities/familiar-personaje-pr/familiar-personaje-pr.model';
import { PersonaPrService } from '../../../../../../main/webapp/app/entities/persona-pr';
import { RelacionFamiliarPrService } from '../../../../../../main/webapp/app/entities/relacion-familiar-pr';
import { PersonajePrService } from '../../../../../../main/webapp/app/entities/personaje-pr';

describe('Component Tests', () => {

    describe('FamiliarPersonajePr Management Dialog Component', () => {
        let comp: FamiliarPersonajePrDialogComponent;
        let fixture: ComponentFixture<FamiliarPersonajePrDialogComponent>;
        let service: FamiliarPersonajePrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [FamiliarPersonajePrDialogComponent],
                providers: [
                    PersonaPrService,
                    RelacionFamiliarPrService,
                    PersonajePrService,
                    FamiliarPersonajePrService
                ]
            })
            .overrideTemplate(FamiliarPersonajePrDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FamiliarPersonajePrDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FamiliarPersonajePrService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FamiliarPersonajePr(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.familiarPersonaje = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'familiarPersonajeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FamiliarPersonajePr();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.familiarPersonaje = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'familiarPersonajeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
