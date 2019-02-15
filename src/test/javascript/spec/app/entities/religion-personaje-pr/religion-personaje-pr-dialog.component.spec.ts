/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProsopografiaTestModule } from '../../../test.module';
import { ReligionPersonajePrDialogComponent } from '../../../../../../main/webapp/app/entities/religion-personaje-pr/religion-personaje-pr-dialog.component';
import { ReligionPersonajePrService } from '../../../../../../main/webapp/app/entities/religion-personaje-pr/religion-personaje-pr.service';
import { ReligionPersonajePr } from '../../../../../../main/webapp/app/entities/religion-personaje-pr/religion-personaje-pr.model';
import { ReligionPrService } from '../../../../../../main/webapp/app/entities/religion-pr';
import { PersonajePrService } from '../../../../../../main/webapp/app/entities/personaje-pr';

describe('Component Tests', () => {

    describe('ReligionPersonajePr Management Dialog Component', () => {
        let comp: ReligionPersonajePrDialogComponent;
        let fixture: ComponentFixture<ReligionPersonajePrDialogComponent>;
        let service: ReligionPersonajePrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [ReligionPersonajePrDialogComponent],
                providers: [
                    ReligionPrService,
                    PersonajePrService,
                    ReligionPersonajePrService
                ]
            })
            .overrideTemplate(ReligionPersonajePrDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReligionPersonajePrDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReligionPersonajePrService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ReligionPersonajePr(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.religionPersonaje = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'religionPersonajeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ReligionPersonajePr();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.religionPersonaje = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'religionPersonajeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
