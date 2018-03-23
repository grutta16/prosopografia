import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FamiliarPersonajePr } from './familiar-personaje-pr.model';
import { FamiliarPersonajePrPopupService } from './familiar-personaje-pr-popup.service';
import { FamiliarPersonajePrService } from './familiar-personaje-pr.service';
import { RelacionFamiliarPr, RelacionFamiliarPrService } from '../relacion-familiar-pr';
import { PersonajePr, PersonajePrService } from '../personaje-pr';

@Component({
    selector: 'jhi-familiar-personaje-pr-dialog',
    templateUrl: './familiar-personaje-pr-dialog.component.html'
})
export class FamiliarPersonajePrDialogComponent implements OnInit {

    familiarPersonaje: FamiliarPersonajePr;
    isSaving: boolean;

    relacionfamiliars: RelacionFamiliarPr[];

    personajes: PersonajePr[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private familiarPersonajeService: FamiliarPersonajePrService,
        private relacionFamiliarService: RelacionFamiliarPrService,
        private personajeService: PersonajePrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.relacionFamiliarService.query()
            .subscribe((res: HttpResponse<RelacionFamiliarPr[]>) => { this.relacionfamiliars = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.personajeService.query()
            .subscribe((res: HttpResponse<PersonajePr[]>) => { this.personajes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.familiarPersonaje.id !== undefined) {
            this.subscribeToSaveResponse(
                this.familiarPersonajeService.update(this.familiarPersonaje));
        } else {
            this.subscribeToSaveResponse(
                this.familiarPersonajeService.create(this.familiarPersonaje));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<FamiliarPersonajePr>>) {
        result.subscribe((res: HttpResponse<FamiliarPersonajePr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: FamiliarPersonajePr) {
        this.eventManager.broadcast({ name: 'familiarPersonajeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRelacionFamiliarById(index: number, item: RelacionFamiliarPr) {
        return item.id;
    }

    trackPersonajeById(index: number, item: PersonajePr) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-familiar-personaje-pr-popup',
    template: ''
})
export class FamiliarPersonajePrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private familiarPersonajePopupService: FamiliarPersonajePrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.familiarPersonajePopupService
                    .open(FamiliarPersonajePrDialogComponent as Component, params['id']);
            } else {
                this.familiarPersonajePopupService
                    .open(FamiliarPersonajePrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
