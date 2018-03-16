import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PaisPr } from './pais-pr.model';
import { PaisPrPopupService } from './pais-pr-popup.service';
import { PaisPrService } from './pais-pr.service';

@Component({
    selector: 'jhi-pais-pr-dialog',
    templateUrl: './pais-pr-dialog.component.html'
})
export class PaisPrDialogComponent implements OnInit {

    pais: PaisPr;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private paisService: PaisPrService,
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
        if (this.pais.id !== undefined) {
            this.subscribeToSaveResponse(
                this.paisService.update(this.pais));
        } else {
            this.subscribeToSaveResponse(
                this.paisService.create(this.pais));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PaisPr>>) {
        result.subscribe((res: HttpResponse<PaisPr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PaisPr) {
        this.eventManager.broadcast({ name: 'paisListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-pais-pr-popup',
    template: ''
})
export class PaisPrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private paisPopupService: PaisPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.paisPopupService
                    .open(PaisPrDialogComponent as Component, params['id']);
            } else {
                this.paisPopupService
                    .open(PaisPrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
