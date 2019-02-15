import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EstudioPersonajePr } from './estudio-personaje-pr.model';
import { EstudioPersonajePrPopupService } from './estudio-personaje-pr-popup.service';
import { EstudioPersonajePrService } from './estudio-personaje-pr.service';
import { InstitucionPr, InstitucionPrService } from '../institucion-pr';
import { CarreraPr, CarreraPrService } from '../carrera-pr';
import { PersonajePr, PersonajePrService } from '../personaje-pr';

@Component({
    selector: 'jhi-estudio-personaje-pr-dialog',
    templateUrl: './estudio-personaje-pr-dialog.component.html'
})
export class EstudioPersonajePrDialogComponent implements OnInit {

    estudioPersonaje: EstudioPersonajePr;
    isSaving: boolean;

    institucions: InstitucionPr[];

    carreras: CarreraPr[];

    personajes: PersonajePr[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private estudioPersonajeService: EstudioPersonajePrService,
        private institucionService: InstitucionPrService,
        private carreraService: CarreraPrService,
        private personajeService: PersonajePrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.institucionService.query()
            .subscribe((res: HttpResponse<InstitucionPr[]>) => { this.institucions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.carreraService.query()
            .subscribe((res: HttpResponse<CarreraPr[]>) => { this.carreras = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.personajeService.query()
            .subscribe((res: HttpResponse<PersonajePr[]>) => { this.personajes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.estudioPersonaje.id !== undefined) {
            this.subscribeToSaveResponse(
                this.estudioPersonajeService.update(this.estudioPersonaje));
        } else {
            this.subscribeToSaveResponse(
                this.estudioPersonajeService.create(this.estudioPersonaje));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<EstudioPersonajePr>>) {
        result.subscribe((res: HttpResponse<EstudioPersonajePr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: EstudioPersonajePr) {
        this.eventManager.broadcast({ name: 'estudioPersonajeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackInstitucionById(index: number, item: InstitucionPr) {
        return item.id;
    }

    trackCarreraById(index: number, item: CarreraPr) {
        return item.id;
    }

    trackPersonajeById(index: number, item: PersonajePr) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-estudio-personaje-pr-popup',
    template: ''
})
export class EstudioPersonajePrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estudioPersonajePopupService: EstudioPersonajePrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.estudioPersonajePopupService
                    .open(EstudioPersonajePrDialogComponent as Component, params['id']);
            } else {
                this.estudioPersonajePopupService
                    .open(EstudioPersonajePrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
