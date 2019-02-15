import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ReligionPr } from './religion-pr.model';
import { ReligionPrPopupService } from './religion-pr-popup.service';
import { ReligionPrService } from './religion-pr.service';

@Component({
    selector: 'jhi-religion-pr-dialog',
    templateUrl: './religion-pr-dialog.component.html'
})
export class ReligionPrDialogComponent implements OnInit {

    religion: ReligionPr;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private religionService: ReligionPrService,
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
        if (this.religion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.religionService.update(this.religion));
        } else {
            this.subscribeToSaveResponse(
                this.religionService.create(this.religion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ReligionPr>>) {
        result.subscribe((res: HttpResponse<ReligionPr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ReligionPr) {
        this.eventManager.broadcast({ name: 'religionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-religion-pr-popup',
    template: ''
})
export class ReligionPrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private religionPopupService: ReligionPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.religionPopupService
                    .open(ReligionPrDialogComponent as Component, params['id']);
            } else {
                this.religionPopupService
                    .open(ReligionPrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
