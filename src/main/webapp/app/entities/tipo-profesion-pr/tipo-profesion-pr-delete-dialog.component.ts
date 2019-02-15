import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TipoProfesionPr } from './tipo-profesion-pr.model';
import { TipoProfesionPrPopupService } from './tipo-profesion-pr-popup.service';
import { TipoProfesionPrService } from './tipo-profesion-pr.service';

@Component({
    selector: 'jhi-tipo-profesion-pr-delete-dialog',
    templateUrl: './tipo-profesion-pr-delete-dialog.component.html'
})
export class TipoProfesionPrDeleteDialogComponent {

    tipoProfesion: TipoProfesionPr;

    constructor(
        private tipoProfesionService: TipoProfesionPrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipoProfesionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipoProfesionListModification',
                content: 'Deleted an tipoProfesion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipo-profesion-pr-delete-popup',
    template: ''
})
export class TipoProfesionPrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoProfesionPopupService: TipoProfesionPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipoProfesionPopupService
                .open(TipoProfesionPrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
