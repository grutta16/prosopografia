import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TipoProfesionPr } from './tipo-profesion-pr.model';
import { TipoProfesionPrPopupService } from './tipo-profesion-pr-popup.service';
import { TipoProfesionPrService } from './tipo-profesion-pr.service';

@Component({
    selector: 'jhi-tipo-profesion-pr-dialog',
    templateUrl: './tipo-profesion-pr-dialog.component.html'
})
export class TipoProfesionPrDialogComponent implements OnInit {

    tipoProfesion: TipoProfesionPr;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private tipoProfesionService: TipoProfesionPrService,
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
        if (this.tipoProfesion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipoProfesionService.update(this.tipoProfesion));
        } else {
            this.subscribeToSaveResponse(
                this.tipoProfesionService.create(this.tipoProfesion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TipoProfesionPr>>) {
        result.subscribe((res: HttpResponse<TipoProfesionPr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TipoProfesionPr) {
        this.eventManager.broadcast({ name: 'tipoProfesionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-tipo-profesion-pr-popup',
    template: ''
})
export class TipoProfesionPrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoProfesionPopupService: TipoProfesionPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipoProfesionPopupService
                    .open(TipoProfesionPrDialogComponent as Component, params['id']);
            } else {
                this.tipoProfesionPopupService
                    .open(TipoProfesionPrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
