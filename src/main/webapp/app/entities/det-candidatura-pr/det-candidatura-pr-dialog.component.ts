import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DetCandidaturaPr } from './det-candidatura-pr.model';
import { DetCandidaturaPrPopupService } from './det-candidatura-pr-popup.service';
import { DetCandidaturaPrService } from './det-candidatura-pr.service';
import { CandidaturaPr, CandidaturaPrService } from '../candidatura-pr';

@Component({
    selector: 'jhi-det-candidatura-pr-dialog',
    templateUrl: './det-candidatura-pr-dialog.component.html'
})
export class DetCandidaturaPrDialogComponent implements OnInit {

    detCandidatura: DetCandidaturaPr;
    isSaving: boolean;

    candidaturas: CandidaturaPr[];
    fechaInicioDp: any;
    fechaFinDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private detCandidaturaService: DetCandidaturaPrService,
        private candidaturaService: CandidaturaPrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.candidaturaService.query()
            .subscribe((res: HttpResponse<CandidaturaPr[]>) => { this.candidaturas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.detCandidatura.id !== undefined) {
            this.subscribeToSaveResponse(
                this.detCandidaturaService.update(this.detCandidatura));
        } else {
            this.subscribeToSaveResponse(
                this.detCandidaturaService.create(this.detCandidatura));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DetCandidaturaPr>>) {
        result.subscribe((res: HttpResponse<DetCandidaturaPr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DetCandidaturaPr) {
        this.eventManager.broadcast({ name: 'detCandidaturaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCandidaturaById(index: number, item: CandidaturaPr) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-det-candidatura-pr-popup',
    template: ''
})
export class DetCandidaturaPrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private detCandidaturaPopupService: DetCandidaturaPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.detCandidaturaPopupService
                    .open(DetCandidaturaPrDialogComponent as Component, params['id']);
            } else {
                this.detCandidaturaPopupService
                    .open(DetCandidaturaPrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
