/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProsopografiaTestModule } from '../../../test.module';
import { RelacionFamiliarPrDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/relacion-familiar-pr/relacion-familiar-pr-delete-dialog.component';
import { RelacionFamiliarPrService } from '../../../../../../main/webapp/app/entities/relacion-familiar-pr/relacion-familiar-pr.service';

describe('Component Tests', () => {

    describe('RelacionFamiliarPr Management Delete Component', () => {
        let comp: RelacionFamiliarPrDeleteDialogComponent;
        let fixture: ComponentFixture<RelacionFamiliarPrDeleteDialogComponent>;
        let service: RelacionFamiliarPrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [RelacionFamiliarPrDeleteDialogComponent],
                providers: [
                    RelacionFamiliarPrService
                ]
            })
            .overrideTemplate(RelacionFamiliarPrDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RelacionFamiliarPrDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RelacionFamiliarPrService);
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
