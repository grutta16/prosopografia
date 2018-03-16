import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PartidoPersonajePr } from './partido-personaje-pr.model';
import { PartidoPersonajePrPopupService } from './partido-personaje-pr-popup.service';
import { PartidoPersonajePrService } from './partido-personaje-pr.service';
import { PartidoPr, PartidoPrService } from '../partido-pr';
import { PersonajePr, PersonajePrService } from '../personaje-pr';

@Component({
    selector: 'jhi-partido-personaje-pr-dialog',
    templateUrl: './partido-personaje-pr-dialog.component.html'
})
export class PartidoPersonajePrDialogComponent implements OnInit {

    partidoPersonaje: PartidoPersonajePr;
    isSaving: boolean;

    partidos: PartidoPr[];

    personajes: PersonajePr[];
    fechaDesdeDp: any;
    fechaHastaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private partidoPersonajeService: PartidoPersonajePrService,
        private partidoService: PartidoPrService,
        private personajeService: PersonajePrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.partidoService.query()
            .subscribe((res: HttpResponse<PartidoPr[]>) => { this.partidos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.personajeService.query()
            .subscribe((res: HttpResponse<PersonajePr[]>) => { this.personajes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.partidoPersonaje.id !== undefined) {
            this.subscribeToSaveResponse(
                this.partidoPersonajeService.update(this.partidoPersonaje));
        } else {
            this.subscribeToSaveResponse(
                this.partidoPersonajeService.create(this.partidoPersonaje));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PartidoPersonajePr>>) {
        result.subscribe((res: HttpResponse<PartidoPersonajePr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PartidoPersonajePr) {
        this.eventManager.broadcast({ name: 'partidoPersonajeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPartidoById(index: number, item: PartidoPr) {
        return item.id;
    }

    trackPersonajeById(index: number, item: PersonajePr) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-partido-personaje-pr-popup',
    template: ''
})
export class PartidoPersonajePrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private partidoPersonajePopupService: PartidoPersonajePrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.partidoPersonajePopupService
                    .open(PartidoPersonajePrDialogComponent as Component, params['id']);
            } else {
                this.partidoPersonajePopupService
                    .open(PartidoPersonajePrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
