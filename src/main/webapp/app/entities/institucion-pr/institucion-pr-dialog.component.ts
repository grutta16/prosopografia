import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { InstitucionPr } from './institucion-pr.model';
import { InstitucionPrPopupService } from './institucion-pr-popup.service';
import { InstitucionPrService } from './institucion-pr.service';
import { LugarPr, LugarPrService } from '../lugar-pr';
import { CarreraPr, CarreraPrService } from '../carrera-pr';

@Component({
    selector: 'jhi-institucion-pr-dialog',
    templateUrl: './institucion-pr-dialog.component.html'
})
export class InstitucionPrDialogComponent implements OnInit {

    institucion: InstitucionPr;
    isSaving: boolean;

    lugars: LugarPr[];

    carreras: CarreraPr[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private institucionService: InstitucionPrService,
        private lugarService: LugarPrService,
        private carreraService: CarreraPrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.lugarService.query()
            .subscribe((res: HttpResponse<LugarPr[]>) => { this.lugars = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.carreraService.query()
            .subscribe((res: HttpResponse<CarreraPr[]>) => { this.carreras = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.institucion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.institucionService.update(this.institucion));
        } else {
            this.subscribeToSaveResponse(
                this.institucionService.create(this.institucion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<InstitucionPr>>) {
        result.subscribe((res: HttpResponse<InstitucionPr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: InstitucionPr) {
        this.eventManager.broadcast({ name: 'institucionListModification', content: 'OK'});
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

    trackCarreraById(index: number, item: CarreraPr) {
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
    selector: 'jhi-institucion-pr-popup',
    template: ''
})
export class InstitucionPrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private institucionPopupService: InstitucionPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.institucionPopupService
                    .open(InstitucionPrDialogComponent as Component, params['id']);
            } else {
                this.institucionPopupService
                    .open(InstitucionPrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
