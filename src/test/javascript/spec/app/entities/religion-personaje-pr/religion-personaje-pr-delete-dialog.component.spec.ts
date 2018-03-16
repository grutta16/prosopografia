/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProsopografiaTestModule } from '../../../test.module';
import { ReligionPersonajePrDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/religion-personaje-pr/religion-personaje-pr-delete-dialog.component';
import { ReligionPersonajePrService } from '../../../../../../main/webapp/app/entities/religion-personaje-pr/religion-personaje-pr.service';

describe('Component Tests', () => {

    describe('ReligionPersonajePr Management Delete Component', () => {
        let comp: ReligionPersonajePrDeleteDialogComponent;
        let fixture: ComponentFixture<ReligionPersonajePrDeleteDialogComponent>;
        let service: ReligionPersonajePrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [ReligionPersonajePrDeleteDialogComponent],
                providers: [
                    ReligionPersonajePrService
                ]
            })
            .overrideTemplate(ReligionPersonajePrDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReligionPersonajePrDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReligionPersonajePrService);
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
