/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProsopografiaTestModule } from '../../../test.module';
import { TipoProfesionPrDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/tipo-profesion-pr/tipo-profesion-pr-delete-dialog.component';
import { TipoProfesionPrService } from '../../../../../../main/webapp/app/entities/tipo-profesion-pr/tipo-profesion-pr.service';

describe('Component Tests', () => {

    describe('TipoProfesionPr Management Delete Component', () => {
        let comp: TipoProfesionPrDeleteDialogComponent;
        let fixture: ComponentFixture<TipoProfesionPrDeleteDialogComponent>;
        let service: TipoProfesionPrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [TipoProfesionPrDeleteDialogComponent],
                providers: [
                    TipoProfesionPrService
                ]
            })
            .overrideTemplate(TipoProfesionPrDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoProfesionPrDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoProfesionPrService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
