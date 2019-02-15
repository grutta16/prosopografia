import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PersonaPr } from './persona-pr.model';
import { PersonaPrPopupService } from './persona-pr-popup.service';
import { PersonaPrService } from './persona-pr.service';

@Component({
    selector: 'jhi-persona-pr-dialog',
    templateUrl: './persona-pr-dialog.component.html'
})
export class PersonaPrDialogComponent implements OnInit {

    persona: PersonaPr;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private personaService: PersonaPrService,
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
        if (this.persona.id !== undefined) {
            this.subscribeToSaveResponse(
                this.personaService.update(this.persona));
        } else {
            this.subscribeToSaveResponse(
                this.personaService.create(this.persona));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PersonaPr>>) {
        result.subscribe((res: HttpResponse<PersonaPr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PersonaPr) {
        this.eventManager.broadcast({ name: 'personaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-persona-pr-popup',
    template: ''
})
export class PersonaPrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personaPopupService: PersonaPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.personaPopupService
                    .open(PersonaPrDialogComponent as Component, params['id']);
            } else {
                this.personaPopupService
                    .open(PersonaPrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
