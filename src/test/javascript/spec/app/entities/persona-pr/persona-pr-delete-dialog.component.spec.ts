/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProsopografiaTestModule } from '../../../test.module';
import { PersonaPrDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/persona-pr/persona-pr-delete-dialog.component';
import { PersonaPrService } from '../../../../../../main/webapp/app/entities/persona-pr/persona-pr.service';

describe('Component Tests', () => {

    describe('PersonaPr Management Delete Component', () => {
        let comp: PersonaPrDeleteDialogComponent;
        let fixture: ComponentFixture<PersonaPrDeleteDialogComponent>;
        let service: PersonaPrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [PersonaPrDeleteDialogComponent],
                providers: [
                    PersonaPrService
                ]
            })
            .overrideTemplate(PersonaPrDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonaPrDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonaPrService);
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
