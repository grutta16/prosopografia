import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ParejaPersonajePr } from './pareja-personaje-pr.model';
import { ParejaPersonajePrPopupService } from './pareja-personaje-pr-popup.service';
import { ParejaPersonajePrService } from './pareja-personaje-pr.service';
import { PersonaPr, PersonaPrService } from '../persona-pr';
import { PersonajePr, PersonajePrService } from '../personaje-pr';

@Component({
    selector: 'jhi-pareja-personaje-pr-dialog',
    templateUrl: './pareja-personaje-pr-dialog.component.html'
})
export class ParejaPersonajePrDialogComponent implements OnInit {

    parejaPersonaje: ParejaPersonajePr;
    isSaving: boolean;

    personas: PersonaPr[];

    personajes: PersonajePr[];
    fechaDesdeDp: any;
    fechaHastaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private parejaPersonajeService: ParejaPersonajePrService,
        private personaService: PersonaPrService,
        private personajeService: PersonajePrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.personaService.query()
            .subscribe((res: HttpResponse<PersonaPr[]>) => { this.personas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.personajeService.query()
            .subscribe((res: HttpResponse<PersonajePr[]>) => { this.personajes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.parejaPersonaje.id !== undefined) {
            this.subscribeToSaveResponse(
                this.parejaPersonajeService.update(this.parejaPersonaje));
        } else {
            this.subscribeToSaveResponse(
                this.parejaPersonajeService.create(this.parejaPersonaje));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ParejaPersonajePr>>) {
        result.subscribe((res: HttpResponse<ParejaPersonajePr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ParejaPersonajePr) {
        this.eventManager.broadcast({ name: 'parejaPersonajeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPersonaById(index: number, item: PersonaPr) {
        return item.id;
    }

    trackPersonajeById(index: number, item: PersonajePr) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-pareja-personaje-pr-popup',
    template: ''
})
export class ParejaPersonajePrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private parejaPersonajePopupService: ParejaPersonajePrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.parejaPersonajePopupService
                    .open(ParejaPersonajePrDialogComponent as Component, params['id']);
            } else {
                this.parejaPersonajePopupService
                    .open(ParejaPersonajePrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
