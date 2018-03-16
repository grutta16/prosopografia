/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProsopografiaTestModule } from '../../../test.module';
import { ParejaPersonajePrDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/pareja-personaje-pr/pareja-personaje-pr-delete-dialog.component';
import { ParejaPersonajePrService } from '../../../../../../main/webapp/app/entities/pareja-personaje-pr/pareja-personaje-pr.service';

describe('Component Tests', () => {

    describe('ParejaPersonajePr Management Delete Component', () => {
        let comp: ParejaPersonajePrDeleteDialogComponent;
        let fixture: ComponentFixture<ParejaPersonajePrDeleteDialogComponent>;
        let service: ParejaPersonajePrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [ParejaPersonajePrDeleteDialogComponent],
                providers: [
                    ParejaPersonajePrService
                ]
            })
            .overrideTemplate(ParejaPersonajePrDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ParejaPersonajePrDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParejaPersonajePrService);
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
