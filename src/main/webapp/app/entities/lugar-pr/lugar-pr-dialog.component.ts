import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LugarPr } from './lugar-pr.model';
import { LugarPrPopupService } from './lugar-pr-popup.service';
import { LugarPrService } from './lugar-pr.service';
import { ProvinciaPr, ProvinciaPrService } from '../provincia-pr';

@Component({
    selector: 'jhi-lugar-pr-dialog',
    templateUrl: './lugar-pr-dialog.component.html'
})
export class LugarPrDialogComponent implements OnInit {

    lugar: LugarPr;
    isSaving: boolean;

    provincias: ProvinciaPr[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private lugarService: LugarPrService,
        private provinciaService: ProvinciaPrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.provinciaService.query()
            .subscribe((res: HttpResponse<ProvinciaPr[]>) => { this.provincias = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.lugar.id !== undefined) {
            this.subscribeToSaveResponse(
                this.lugarService.update(this.lugar));
        } else {
            this.subscribeToSaveResponse(
                this.lugarService.create(this.lugar));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<LugarPr>>) {
        result.subscribe((res: HttpResponse<LugarPr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: LugarPr) {
        this.eventManager.broadcast({ name: 'lugarListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProvinciaById(index: number, item: ProvinciaPr) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-lugar-pr-popup',
    template: ''
})
export class LugarPrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lugarPopupService: LugarPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.lugarPopupService
                    .open(LugarPrDialogComponent as Component, params['id']);
            } else {
                this.lugarPopupService
                    .open(LugarPrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
