import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProfesionPr } from './profesion-pr.model';
import { ProfesionPrPopupService } from './profesion-pr-popup.service';
import { ProfesionPrService } from './profesion-pr.service';
import { TipoProfesionPr, TipoProfesionPrService } from '../tipo-profesion-pr';

@Component({
    selector: 'jhi-profesion-pr-dialog',
    templateUrl: './profesion-pr-dialog.component.html'
})
export class ProfesionPrDialogComponent implements OnInit {

    profesion: ProfesionPr;
    isSaving: boolean;

    tipoprofesions: TipoProfesionPr[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private profesionService: ProfesionPrService,
        private tipoProfesionService: TipoProfesionPrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tipoProfesionService.query()
            .subscribe((res: HttpResponse<TipoProfesionPr[]>) => { this.tipoprofesions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.profesion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.profesionService.update(this.profesion));
        } else {
            this.subscribeToSaveResponse(
                this.profesionService.create(this.profesion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ProfesionPr>>) {
        result.subscribe((res: HttpResponse<ProfesionPr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ProfesionPr) {
        this.eventManager.broadcast({ name: 'profesionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTipoProfesionById(index: number, item: TipoProfesionPr) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-profesion-pr-popup',
    template: ''
})
export class ProfesionPrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private profesionPopupService: ProfesionPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.profesionPopupService
                    .open(ProfesionPrDialogComponent as Component, params['id']);
            } else {
                this.profesionPopupService
                    .open(ProfesionPrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
