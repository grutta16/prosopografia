/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProsopografiaTestModule } from '../../../test.module';
import { AsociacionPrDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/asociacion-pr/asociacion-pr-delete-dialog.component';
import { AsociacionPrService } from '../../../../../../main/webapp/app/entities/asociacion-pr/asociacion-pr.service';

describe('Component Tests', () => {

    describe('AsociacionPr Management Delete Component', () => {
        let comp: AsociacionPrDeleteDialogComponent;
        let fixture: ComponentFixture<AsociacionPrDeleteDialogComponent>;
        let service: AsociacionPrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [AsociacionPrDeleteDialogComponent],
                providers: [
                    AsociacionPrService
                ]
            })
            .overrideTemplate(AsociacionPrDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AsociacionPrDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AsociacionPrService);
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
