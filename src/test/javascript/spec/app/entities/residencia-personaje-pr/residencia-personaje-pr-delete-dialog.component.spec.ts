/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProsopografiaTestModule } from '../../../test.module';
import { ResidenciaPersonajePrDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/residencia-personaje-pr/residencia-personaje-pr-delete-dialog.component';
import { ResidenciaPersonajePrService } from '../../../../../../main/webapp/app/entities/residencia-personaje-pr/residencia-personaje-pr.service';

describe('Component Tests', () => {

    describe('ResidenciaPersonajePr Management Delete Component', () => {
        let comp: ResidenciaPersonajePrDeleteDialogComponent;
        let fixture: ComponentFixture<ResidenciaPersonajePrDeleteDialogComponent>;
        let service: ResidenciaPersonajePrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [ResidenciaPersonajePrDeleteDialogComponent],
                providers: [
                    ResidenciaPersonajePrService
                ]
            })
            .overrideTemplate(ResidenciaPersonajePrDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ResidenciaPersonajePrDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResidenciaPersonajePrService);
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
