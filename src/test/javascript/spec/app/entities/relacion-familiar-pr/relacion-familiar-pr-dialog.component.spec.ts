/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProsopografiaTestModule } from '../../../test.module';
import { RelacionFamiliarPrDialogComponent } from '../../../../../../main/webapp/app/entities/relacion-familiar-pr/relacion-familiar-pr-dialog.component';
import { RelacionFamiliarPrService } from '../../../../../../main/webapp/app/entities/relacion-familiar-pr/relacion-familiar-pr.service';
import { RelacionFamiliarPr } from '../../../../../../main/webapp/app/entities/relacion-familiar-pr/relacion-familiar-pr.model';

describe('Component Tests', () => {

    describe('RelacionFamiliarPr Management Dialog Component', () => {
        let comp: RelacionFamiliarPrDialogComponent;
        let fixture: ComponentFixture<RelacionFamiliarPrDialogComponent>;
        let service: RelacionFamiliarPrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [RelacionFamiliarPrDialogComponent],
                providers: [
                    RelacionFamiliarPrService
                ]
            })
            .overrideTemplate(RelacionFamiliarPrDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RelacionFamiliarPrDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RelacionFamiliarPrService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RelacionFamiliarPr(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.relacionFamiliar = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'relacionFamiliarListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RelacionFamiliarPr();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.relacionFamiliar = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'relacionFamiliarListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
