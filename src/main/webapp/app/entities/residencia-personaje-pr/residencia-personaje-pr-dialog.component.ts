import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ResidenciaPersonajePr } from './residencia-personaje-pr.model';
import { ResidenciaPersonajePrPopupService } from './residencia-personaje-pr-popup.service';
import { ResidenciaPersonajePrService } from './residencia-personaje-pr.service';
import { LugarPr, LugarPrService } from '../lugar-pr';
import { PersonajePr, PersonajePrService } from '../personaje-pr';

@Component({
    selector: 'jhi-residencia-personaje-pr-dialog',
    templateUrl: './residencia-personaje-pr-dialog.component.html'
})
export class ResidenciaPersonajePrDialogComponent implements OnInit {

    residenciaPersonaje: ResidenciaPersonajePr;
    isSaving: boolean;

    lugars: LugarPr[];

    personajes: PersonajePr[];
    fechaDesdeDp: any;
    fechaHastaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private residenciaPersonajeService: ResidenciaPersonajePrService,
        private lugarService: LugarPrService,
        private personajeService: PersonajePrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.lugarService.query()
            .subscribe((res: HttpResponse<LugarPr[]>) => { this.lugars = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.personajeService.query()
            .subscribe((res: HttpResponse<PersonajePr[]>) => { this.personajes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.residenciaPersonaje.id !== undefined) {
            this.subscribeToSaveResponse(
                this.residenciaPersonajeService.update(this.residenciaPersonaje));
        } else {
            this.subscribeToSaveResponse(
                this.residenciaPersonajeService.create(this.residenciaPersonaje));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ResidenciaPersonajePr>>) {
        result.subscribe((res: HttpResponse<ResidenciaPersonajePr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ResidenciaPersonajePr) {
        this.eventManager.broadcast({ name: 'residenciaPersonajeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLugarById(index: number, item: LugarPr) {
        return item.id;
    }

    trackPersonajeById(index: number, item: PersonajePr) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-residencia-personaje-pr-popup',
    template: ''
})
export class ResidenciaPersonajePrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private residenciaPersonajePopupService: ResidenciaPersonajePrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.residenciaPersonajePopupService
                    .open(ResidenciaPersonajePrDialogComponent as Component, params['id']);
            } else {
                this.residenciaPersonajePopupService
                    .open(ResidenciaPersonajePrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
