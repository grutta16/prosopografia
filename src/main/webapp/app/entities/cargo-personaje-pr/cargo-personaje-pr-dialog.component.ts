import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CargoPersonajePr } from './cargo-personaje-pr.model';
import { CargoPersonajePrPopupService } from './cargo-personaje-pr-popup.service';
import { CargoPersonajePrService } from './cargo-personaje-pr.service';
import { CargoPr, CargoPrService } from '../cargo-pr';
import { PersonajePr, PersonajePrService } from '../personaje-pr';

@Component({
    selector: 'jhi-cargo-personaje-pr-dialog',
    templateUrl: './cargo-personaje-pr-dialog.component.html'
})
export class CargoPersonajePrDialogComponent implements OnInit {

    cargoPersonaje: CargoPersonajePr;
    isSaving: boolean;

    cargos: CargoPr[];

    personajes: PersonajePr[];
    fechaInicioDp: any;
    fechaFinDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cargoPersonajeService: CargoPersonajePrService,
        private cargoService: CargoPrService,
        private personajeService: PersonajePrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cargoService.query()
            .subscribe((res: HttpResponse<CargoPr[]>) => { this.cargos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.personajeService.query()
            .subscribe((res: HttpResponse<PersonajePr[]>) => { this.personajes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cargoPersonaje.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cargoPersonajeService.update(this.cargoPersonaje));
        } else {
            this.subscribeToSaveResponse(
                this.cargoPersonajeService.create(this.cargoPersonaje));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CargoPersonajePr>>) {
        result.subscribe((res: HttpResponse<CargoPersonajePr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CargoPersonajePr) {
        this.eventManager.broadcast({ name: 'cargoPersonajeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCargoById(index: number, item: CargoPr) {
        return item.id;
    }

    trackPersonajeById(index: number, item: PersonajePr) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cargo-personaje-pr-popup',
    template: ''
})
export class CargoPersonajePrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cargoPersonajePopupService: CargoPersonajePrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cargoPersonajePopupService
                    .open(CargoPersonajePrDialogComponent as Component, params['id']);
            } else {
                this.cargoPersonajePopupService
                    .open(CargoPersonajePrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
