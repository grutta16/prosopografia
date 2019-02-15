import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EleccionPr } from './eleccion-pr.model';
import { EleccionPrPopupService } from './eleccion-pr-popup.service';
import { EleccionPrService } from './eleccion-pr.service';
import { CargoPr, CargoPrService } from '../cargo-pr';

@Component({
    selector: 'jhi-eleccion-pr-dialog',
    templateUrl: './eleccion-pr-dialog.component.html'
})
export class EleccionPrDialogComponent implements OnInit {

    eleccion: EleccionPr;
    isSaving: boolean;

    cargos: CargoPr[];
    fechaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private eleccionService: EleccionPrService,
        private cargoService: CargoPrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cargoService.query()
            .subscribe((res: HttpResponse<CargoPr[]>) => { this.cargos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.eleccion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.eleccionService.update(this.eleccion));
        } else {
            this.subscribeToSaveResponse(
                this.eleccionService.create(this.eleccion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<EleccionPr>>) {
        result.subscribe((res: HttpResponse<EleccionPr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: EleccionPr) {
        this.eventManager.broadcast({ name: 'eleccionListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-eleccion-pr-popup',
    template: ''
})
export class EleccionPrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eleccionPopupService: EleccionPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.eleccionPopupService
                    .open(EleccionPrDialogComponent as Component, params['id']);
            } else {
                this.eleccionPopupService
                    .open(EleccionPrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
