import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CarreraPr } from './carrera-pr.model';
import { CarreraPrPopupService } from './carrera-pr-popup.service';
import { CarreraPrService } from './carrera-pr.service';

@Component({
    selector: 'jhi-carrera-pr-dialog',
    templateUrl: './carrera-pr-dialog.component.html'
})
export class CarreraPrDialogComponent implements OnInit {

    carrera: CarreraPr;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private carreraService: CarreraPrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.carrera.id !== undefined) {
            this.subscribeToSaveResponse(
                this.carreraService.update(this.carrera));
        } else {
            this.subscribeToSaveResponse(
                this.carreraService.create(this.carrera));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CarreraPr>>) {
        result.subscribe((res: HttpResponse<CarreraPr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CarreraPr) {
        this.eventManager.broadcast({ name: 'carreraListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-carrera-pr-popup',
    template: ''
})
export class CarreraPrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private carreraPopupService: CarreraPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.carreraPopupService
                    .open(CarreraPrDialogComponent as Component, params['id']);
            } else {
                this.carreraPopupService
                    .open(CarreraPrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
