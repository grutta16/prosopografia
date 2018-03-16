import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SeccionPr } from './seccion-pr.model';
import { SeccionPrPopupService } from './seccion-pr-popup.service';
import { SeccionPrService } from './seccion-pr.service';

@Component({
    selector: 'jhi-seccion-pr-dialog',
    templateUrl: './seccion-pr-dialog.component.html'
})
export class SeccionPrDialogComponent implements OnInit {

    seccion: SeccionPr;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private seccionService: SeccionPrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.seccion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.seccionService.update(this.seccion));
        } else {
            this.subscribeToSaveResponse(
                this.seccionService.create(this.seccion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SeccionPr>>) {
        result.subscribe((res: HttpResponse<SeccionPr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SeccionPr) {
        this.eventManager.broadcast({ name: 'seccionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-seccion-pr-popup',
    template: ''
})
export class SeccionPrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private seccionPopupService: SeccionPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.seccionPopupService
                    .open(SeccionPrDialogComponent as Component, params['id']);
            } else {
                this.seccionPopupService
                    .open(SeccionPrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
