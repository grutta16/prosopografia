import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AsociacionPr } from './asociacion-pr.model';
import { AsociacionPrPopupService } from './asociacion-pr-popup.service';
import { AsociacionPrService } from './asociacion-pr.service';

@Component({
    selector: 'jhi-asociacion-pr-dialog',
    templateUrl: './asociacion-pr-dialog.component.html'
})
export class AsociacionPrDialogComponent implements OnInit {

    asociacion: AsociacionPr;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private asociacionService: AsociacionPrService,
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
        if (this.asociacion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.asociacionService.update(this.asociacion));
        } else {
            this.subscribeToSaveResponse(
                this.asociacionService.create(this.asociacion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AsociacionPr>>) {
        result.subscribe((res: HttpResponse<AsociacionPr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AsociacionPr) {
        this.eventManager.broadcast({ name: 'asociacionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-asociacion-pr-popup',
    template: ''
})
export class AsociacionPrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private asociacionPopupService: AsociacionPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.asociacionPopupService
                    .open(AsociacionPrDialogComponent as Component, params['id']);
            } else {
                this.asociacionPopupService
                    .open(AsociacionPrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
