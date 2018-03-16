/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProsopografiaTestModule } from '../../../test.module';
import { AsociacionPersonajePrDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/asociacion-personaje-pr/asociacion-personaje-pr-delete-dialog.component';
import { AsociacionPersonajePrService } from '../../../../../../main/webapp/app/entities/asociacion-personaje-pr/asociacion-personaje-pr.service';

describe('Component Tests', () => {

    describe('AsociacionPersonajePr Management Delete Component', () => {
        let comp: AsociacionPersonajePrDeleteDialogComponent;
        let fixture: ComponentFixture<AsociacionPersonajePrDeleteDialogComponent>;
        let service: AsociacionPersonajePrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [AsociacionPersonajePrDeleteDialogComponent],
                providers: [
                    AsociacionPersonajePrService
                ]
            })
            .overrideTemplate(AsociacionPersonajePrDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AsociacionPersonajePrDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AsociacionPersonajePrService);
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
