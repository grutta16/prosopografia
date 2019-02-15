/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProsopografiaTestModule } from '../../../test.module';
import { CarreraPrDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/carrera-pr/carrera-pr-delete-dialog.component';
import { CarreraPrService } from '../../../../../../main/webapp/app/entities/carrera-pr/carrera-pr.service';

describe('Component Tests', () => {

    describe('CarreraPr Management Delete Component', () => {
        let comp: CarreraPrDeleteDialogComponent;
        let fixture: ComponentFixture<CarreraPrDeleteDialogComponent>;
        let service: CarreraPrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [CarreraPrDeleteDialogComponent],
                providers: [
                    CarreraPrService
                ]
            })
            .overrideTemplate(CarreraPrDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CarreraPrDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CarreraPrService);
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
