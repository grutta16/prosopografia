import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ReligionPersonajePr } from './religion-personaje-pr.model';
import { ReligionPersonajePrPopupService } from './religion-personaje-pr-popup.service';
import { ReligionPersonajePrService } from './religion-personaje-pr.service';
import { ReligionPr, ReligionPrService } from '../religion-pr';
import { PersonajePr, PersonajePrService } from '../personaje-pr';

@Component({
    selector: 'jhi-religion-personaje-pr-dialog',
    templateUrl: './religion-personaje-pr-dialog.component.html'
})
export class ReligionPersonajePrDialogComponent implements OnInit {

    religionPersonaje: ReligionPersonajePr;
    isSaving: boolean;

    religions: ReligionPr[];

    personajes: PersonajePr[];
    fechaDesdeDp: any;
    fechaHastaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private religionPersonajeService: ReligionPersonajePrService,
        private religionService: ReligionPrService,
        private personajeService: PersonajePrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.religionService.query()
            .subscribe((res: HttpResponse<ReligionPr[]>) => { this.religions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.personajeService.query()
            .subscribe((res: HttpResponse<PersonajePr[]>) => { this.personajes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.religionPersonaje.id !== undefined) {
            this.subscribeToSaveResponse(
                this.religionPersonajeService.update(this.religionPersonaje));
        } else {
            this.subscribeToSaveResponse(
                this.religionPersonajeService.create(this.religionPersonaje));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ReligionPersonajePr>>) {
        result.subscribe((res: HttpResponse<ReligionPersonajePr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ReligionPersonajePr) {
        this.eventManager.broadcast({ name: 'religionPersonajeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackReligionById(index: number, item: ReligionPr) {
        return item.id;
    }

    trackPersonajeById(index: number, item: PersonajePr) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-religion-personaje-pr-popup',
    template: ''
})
export class ReligionPersonajePrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private religionPersonajePopupService: ReligionPersonajePrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.religionPersonajePopupService
                    .open(ReligionPersonajePrDialogComponent as Component, params['id']);
            } else {
                this.religionPersonajePopupService
                    .open(ReligionPersonajePrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
