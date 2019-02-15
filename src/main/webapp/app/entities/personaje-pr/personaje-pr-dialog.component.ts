import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PersonajePr } from './personaje-pr.model';
import { PersonajePrPopupService } from './personaje-pr-popup.service';
import { PersonajePrService } from './personaje-pr.service';
import { LugarPr, LugarPrService } from '../lugar-pr';
import { ProfesionPr, ProfesionPrService } from '../profesion-pr';

@Component({
    selector: 'jhi-personaje-pr-dialog',
    templateUrl: './personaje-pr-dialog.component.html'
})
export class PersonajePrDialogComponent implements OnInit {

    personaje: PersonajePr;
    isSaving: boolean;

    lugars: LugarPr[];

    profesions: ProfesionPr[];
    fechaNacimientoDp: any;
    fechaDefuncionDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private personajeService: PersonajePrService,
        private lugarService: LugarPrService,
        private profesionService: ProfesionPrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.lugarService.query()
            .subscribe((res: HttpResponse<LugarPr[]>) => { this.lugars = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.profesionService.query()
            .subscribe((res: HttpResponse<ProfesionPr[]>) => { this.profesions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.personaje.id !== undefined) {
            this.subscribeToSaveResponse(
                this.personajeService.update(this.personaje));
        } else {
            this.subscribeToSaveResponse(
                this.personajeService.create(this.personaje));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PersonajePr>>) {
        result.subscribe((res: HttpResponse<PersonajePr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PersonajePr) {
        this.eventManager.broadcast({ name: 'personajeListModification', content: 'OK'});
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

    trackProfesionById(index: number, item: ProfesionPr) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-personaje-pr-popup',
    template: ''
})
export class PersonajePrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personajePopupService: PersonajePrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.personajePopupService
                    .open(PersonajePrDialogComponent as Component, params['id']);
            } else {
                this.personajePopupService
                    .open(PersonajePrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
