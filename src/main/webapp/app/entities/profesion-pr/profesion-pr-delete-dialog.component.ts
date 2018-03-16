import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProfesionPr } from './profesion-pr.model';
import { ProfesionPrPopupService } from './profesion-pr-popup.service';
import { ProfesionPrService } from './profesion-pr.service';

@Component({
    selector: 'jhi-profesion-pr-delete-dialog',
    templateUrl: './profesion-pr-delete-dialog.component.html'
})
export class ProfesionPrDeleteDialogComponent {

    profesion: ProfesionPr;

    constructor(
        private profesionService: ProfesionPrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.profesionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'profesionListModification',
                content: 'Deleted an profesion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-profesion-pr-delete-popup',
    template: ''
})
export class ProfesionPrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private profesionPopupService: ProfesionPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.profesionPopupService
                .open(ProfesionPrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
