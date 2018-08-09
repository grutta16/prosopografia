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
import { ReligionPr, ReligionPrService } from '../religion-pr';
import { ProfesionPr, ProfesionPrService } from '../profesion-pr';
import { AsociacionPr, AsociacionPrService } from '../asociacion-pr';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const now = new Date();

@Component({
    selector: 'jhi-personaje-pr-dialog',
    templateUrl: './personaje-pr-dialog.component.html'
})
export class PersonajePrDialogComponent implements OnInit {

    personaje: PersonajePr;
    isSaving: boolean;

    lugars: LugarPr[];
    religions: ReligionPr[];

    profesions: ProfesionPr[];
    asociacions: AsociacionPr[];

    fechaNacimientoDp: any;
    fechaDefuncionDp: any;

    minNacDate: NgbDateStruct;
    maxNacDate: NgbDateStruct;

    minDefDate: NgbDateStruct;
    maxDefDate: NgbDateStruct;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private personajeService: PersonajePrService,
        private lugarService: LugarPrService,
        private religionService: ReligionPrService,
        private profesionService: ProfesionPrService,
        private asociacionService: AsociacionPrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.minNacDate = {year: 1800, month: 1, day: 1};
        this.minDefDate = {year: 1800, month: 1, day: 1};
        this.maxNacDate = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
        this.maxDefDate = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
        this.isSaving = false;
        this.lugarService.query()
            .subscribe((res: HttpResponse<LugarPr[]>) => { this.lugars = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.religionService.query()
            .subscribe((res: HttpResponse<LugarPr[]>) => { this.religions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.profesionService.query()
            .subscribe((res: HttpResponse<ProfesionPr[]>) => { this.profesions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.asociacionService.query()
            .subscribe((res: HttpResponse<ProfesionPr[]>) => { this.asociacions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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

    trackReligionById(index: number, item: ReligionPr) {
        return item.id;
    }

    nacDateChange() {
        this.minDefDate = this.fechaNacimientoDp;
    }

    defDateChange() {
        this.maxNacDate = this.fechaDefuncionDp;
    }

    onSelectDate(event: any) {
        if (event.name === 'fechaNacimiento') {
            this.personaje.fechaNacimiento = event.fecha;
            this.minDefDate = event.fecha;
        } else {
            this.personaje.fechaDefuncion = event.fecha;
            this.maxNacDate = event.fecha;
        }
    }

    // trackProfesionById(index: number, item: ProfesionPr) {
    //     return item.id;
    // }
    //
    // trackAsociacionById(index: number, item: AsociacionPr) {
    //     return item.id;
    // }
    //
    // getSelected(selectedVals: Array<any>, option: any) {
    //     if (selectedVals) {
    //         for (let i = 0; i < selectedVals.length; i++) {
    //             if (option.id === selectedVals[i].id) {
    //                 return selectedVals[i];
    //             }
    //         }
    //     }
    //     return option;
    // }
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
