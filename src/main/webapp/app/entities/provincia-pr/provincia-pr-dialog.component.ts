import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProvinciaPr } from './provincia-pr.model';
import { ProvinciaPrPopupService } from './provincia-pr-popup.service';
import { ProvinciaPrService } from './provincia-pr.service';
import { PaisPr, PaisPrService } from '../pais-pr';

@Component({
    selector: 'jhi-provincia-pr-dialog',
    templateUrl: './provincia-pr-dialog.component.html'
})
export class ProvinciaPrDialogComponent implements OnInit {

    provincia: ProvinciaPr;
    isSaving: boolean;

    pais: PaisPr[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private provinciaService: ProvinciaPrService,
        private paisService: PaisPrService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.paisService.query()
            .subscribe((res: HttpResponse<PaisPr[]>) => { this.pais = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.provincia.id !== undefined) {
            this.subscribeToSaveResponse(
                this.provinciaService.update(this.provincia));
        } else {
            this.subscribeToSaveResponse(
                this.provinciaService.create(this.provincia));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ProvinciaPr>>) {
        result.subscribe((res: HttpResponse<ProvinciaPr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ProvinciaPr) {
        this.eventManager.broadcast({ name: 'provinciaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPaisById(index: number, item: PaisPr) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-provincia-pr-popup',
    template: ''
})
export class ProvinciaPrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private provinciaPopupService: ProvinciaPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.provinciaPopupService
                    .open(ProvinciaPrDialogComponent as Component, params['id']);
            } else {
                this.provinciaPopupService
                    .open(ProvinciaPrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
