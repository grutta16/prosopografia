/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProsopografiaTestModule } from '../../../test.module';
import { ProvinciaPrDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/provincia-pr/provincia-pr-delete-dialog.component';
import { ProvinciaPrService } from '../../../../../../main/webapp/app/entities/provincia-pr/provincia-pr.service';

describe('Component Tests', () => {

    describe('ProvinciaPr Management Delete Component', () => {
        let comp: ProvinciaPrDeleteDialogComponent;
        let fixture: ComponentFixture<ProvinciaPrDeleteDialogComponent>;
        let service: ProvinciaPrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [ProvinciaPrDeleteDialogComponent],
                providers: [
                    ProvinciaPrService
                ]
            })
            .overrideTemplate(ProvinciaPrDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProvinciaPrDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProvinciaPrService);
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
