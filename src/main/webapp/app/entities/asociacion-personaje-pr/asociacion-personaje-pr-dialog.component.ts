import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AsociacionPersonajePr } from './asociacion-personaje-pr.model';
import { AsociacionPersonajePrPopupService } from './asociacion-personaje-pr-popup.service';
import { AsociacionPersonajePrService } from './asociacion-personaje-pr.service';
import { AsociacionPr, AsociacionPrService } from '../asociacion-pr';
import { PersonajePr, PersonajePrService } from '../personaje-pr';

@Component({
    selector: 'jhi-asociacion-personaje-pr-dialog',
    templateUrl: './asociacion-personaje-pr-dialog.component.html'
})
export class AsociacionPersonajePrDialogComponent implements OnInit {

    asociacionPersonaje: AsociacionPersonajePr;
    isSaving: boolean;

    asociacions: AsociacionPr[];

    personajes: PersonajePr[];
    fechaDesdeDp: any;
    fechaHastaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private asociacionPersonajeService: AsociacionPersonajePrService,
        private asociacionService: AsociacionPrService,
        private personajeService: PersonajePrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.asociacionService.query()
            .subscribe((res: HttpResponse<AsociacionPr[]>) => { this.asociacions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.personajeService.query()
            .subscribe((res: HttpResponse<PersonajePr[]>) => { this.personajes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.asociacionPersonaje.id !== undefined) {
            this.subscribeToSaveResponse(
                this.asociacionPersonajeService.update(this.asociacionPersonaje));
        } else {
            this.subscribeToSaveResponse(
                this.asociacionPersonajeService.create(this.asociacionPersonaje));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AsociacionPersonajePr>>) {
        result.subscribe((res: HttpResponse<AsociacionPersonajePr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AsociacionPersonajePr) {
        this.eventManager.broadcast({ name: 'asociacionPersonajeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAsociacionById(index: number, item: AsociacionPr) {
        return item.id;
    }

    trackPersonajeById(index: number, item: PersonajePr) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-asociacion-personaje-pr-popup',
    template: ''
})
export class AsociacionPersonajePrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private asociacionPersonajePopupService: AsociacionPersonajePrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.asociacionPersonajePopupService
                    .open(AsociacionPersonajePrDialogComponent as Component, params['id']);
            } else {
                this.asociacionPersonajePopupService
                    .open(AsociacionPersonajePrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
