import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CandidaturaPr } from './candidatura-pr.model';
import { CandidaturaPrPopupService } from './candidatura-pr-popup.service';
import { CandidaturaPrService } from './candidatura-pr.service';
import { EleccionPr, EleccionPrService } from '../eleccion-pr';
import { SeccionPr, SeccionPrService } from '../seccion-pr';
import { PersonajePr, PersonajePrService } from '../personaje-pr';
import { PartidoPr, PartidoPrService } from '../partido-pr';

@Component({
    selector: 'jhi-candidatura-pr-dialog',
    templateUrl: './candidatura-pr-dialog.component.html'
})
export class CandidaturaPrDialogComponent implements OnInit {

    candidatura: CandidaturaPr;
    isSaving: boolean;

    eleccions: EleccionPr[];

    seccions: SeccionPr[];

    personajes: PersonajePr[];

    partidos: PartidoPr[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private candidaturaService: CandidaturaPrService,
        private eleccionService: EleccionPrService,
        private seccionService: SeccionPrService,
        private personajeService: PersonajePrService,
        private partidoService: PartidoPrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.eleccionService.query()
            .subscribe((res: HttpResponse<EleccionPr[]>) => { this.eleccions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.seccionService.query()
            .subscribe((res: HttpResponse<SeccionPr[]>) => { this.seccions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.personajeService.query()
            .subscribe((res: HttpResponse<PersonajePr[]>) => { this.personajes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.partidoService.query()
            .subscribe((res: HttpResponse<PartidoPr[]>) => { this.partidos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.candidatura.id !== undefined) {
            this.subscribeToSaveResponse(
                this.candidaturaService.update(this.candidatura));
        } else {
            this.subscribeToSaveResponse(
                this.candidaturaService.create(this.candidatura));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CandidaturaPr>>) {
        result.subscribe((res: HttpResponse<CandidaturaPr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CandidaturaPr) {
        this.eventManager.broadcast({ name: 'candidaturaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEleccionById(index: number, item: EleccionPr) {
        return item.id;
    }

    trackSeccionById(index: number, item: SeccionPr) {
        return item.id;
    }

    trackPersonajeById(index: number, item: PersonajePr) {
        return item.id;
    }

    trackPartidoById(index: number, item: PartidoPr) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-candidatura-pr-popup',
    template: ''
})
export class CandidaturaPrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private candidaturaPopupService: CandidaturaPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.candidaturaPopupService
                    .open(CandidaturaPrDialogComponent as Component, params['id']);
            } else {
                this.candidaturaPopupService
                    .open(CandidaturaPrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
