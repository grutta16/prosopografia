import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PartidoPr } from './partido-pr.model';
import { PartidoPrPopupService } from './partido-pr-popup.service';
import { PartidoPrService } from './partido-pr.service';

@Component({
    selector: 'jhi-partido-pr-dialog',
    templateUrl: './partido-pr-dialog.component.html'
})
export class PartidoPrDialogComponent implements OnInit {

    partido: PartidoPr;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private partidoService: PartidoPrService,
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
        if (this.partido.id !== undefined) {
            this.subscribeToSaveResponse(
                this.partidoService.update(this.partido));
        } else {
            this.subscribeToSaveResponse(
                this.partidoService.create(this.partido));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PartidoPr>>) {
        result.subscribe((res: HttpResponse<PartidoPr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PartidoPr) {
        this.eventManager.broadcast({ name: 'partidoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-partido-pr-popup',
    template: ''
})
export class PartidoPrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private partidoPopupService: PartidoPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.partidoPopupService
                    .open(PartidoPrDialogComponent as Component, params['id']);
            } else {
                this.partidoPopupService
                    .open(PartidoPrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
