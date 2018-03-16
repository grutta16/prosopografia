import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CargoPr } from './cargo-pr.model';
import { CargoPrPopupService } from './cargo-pr-popup.service';
import { CargoPrService } from './cargo-pr.service';

@Component({
    selector: 'jhi-cargo-pr-dialog',
    templateUrl: './cargo-pr-dialog.component.html'
})
export class CargoPrDialogComponent implements OnInit {

    cargo: CargoPr;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private cargoService: CargoPrService,
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
        if (this.cargo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cargoService.update(this.cargo));
        } else {
            this.subscribeToSaveResponse(
                this.cargoService.create(this.cargo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CargoPr>>) {
        result.subscribe((res: HttpResponse<CargoPr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CargoPr) {
        this.eventManager.broadcast({ name: 'cargoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-cargo-pr-popup',
    template: ''
})
export class CargoPrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cargoPopupService: CargoPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cargoPopupService
                    .open(CargoPrDialogComponent as Component, params['id']);
            } else {
                this.cargoPopupService
                    .open(CargoPrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
