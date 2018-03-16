/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProsopografiaTestModule } from '../../../test.module';
import { CandidaturaPrDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/candidatura-pr/candidatura-pr-delete-dialog.component';
import { CandidaturaPrService } from '../../../../../../main/webapp/app/entities/candidatura-pr/candidatura-pr.service';

describe('Component Tests', () => {

    describe('CandidaturaPr Management Delete Component', () => {
        let comp: CandidaturaPrDeleteDialogComponent;
        let fixture: ComponentFixture<CandidaturaPrDeleteDialogComponent>;
        let service: CandidaturaPrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [CandidaturaPrDeleteDialogComponent],
                providers: [
                    CandidaturaPrService
                ]
            })
            .overrideTemplate(CandidaturaPrDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CandidaturaPrDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CandidaturaPrService);
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
