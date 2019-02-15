import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RelacionFamiliarPr } from './relacion-familiar-pr.model';
import { RelacionFamiliarPrPopupService } from './relacion-familiar-pr-popup.service';
import { RelacionFamiliarPrService } from './relacion-familiar-pr.service';

@Component({
    selector: 'jhi-relacion-familiar-pr-dialog',
    templateUrl: './relacion-familiar-pr-dialog.component.html'
})
export class RelacionFamiliarPrDialogComponent implements OnInit {

    relacionFamiliar: RelacionFamiliarPr;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private relacionFamiliarService: RelacionFamiliarPrService,
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
        if (this.relacionFamiliar.id !== undefined) {
            this.subscribeToSaveResponse(
                this.relacionFamiliarService.update(this.relacionFamiliar));
        } else {
            this.subscribeToSaveResponse(
                this.relacionFamiliarService.create(this.relacionFamiliar));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RelacionFamiliarPr>>) {
        result.subscribe((res: HttpResponse<RelacionFamiliarPr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RelacionFamiliarPr) {
        this.eventManager.broadcast({ name: 'relacionFamiliarListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-relacion-familiar-pr-popup',
    template: ''
})
export class RelacionFamiliarPrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private relacionFamiliarPopupService: RelacionFamiliarPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.relacionFamiliarPopupService
                    .open(RelacionFamiliarPrDialogComponent as Component, params['id']);
            } else {
                this.relacionFamiliarPopupService
                    .open(RelacionFamiliarPrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
