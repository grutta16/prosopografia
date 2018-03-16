import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FamiliarPersonajePr } from './familiar-personaje-pr.model';
import { FamiliarPersonajePrPopupService } from './familiar-personaje-pr-popup.service';
import { FamiliarPersonajePrService } from './familiar-personaje-pr.service';

@Component({
    selector: 'jhi-familiar-personaje-pr-delete-dialog',
    templateUrl: './familiar-personaje-pr-delete-dialog.component.html'
})
export class FamiliarPersonajePrDeleteDialogComponent {

    familiarPersonaje: FamiliarPersonajePr;

    constructor(
        private familiarPersonajeService: FamiliarPersonajePrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.familiarPersonajeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'familiarPersonajeListModification',
                content: 'Deleted an familiarPersonaje'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-familiar-personaje-pr-delete-popup',
    template: ''
})
export class FamiliarPersonajePrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private familiarPersonajePopupService: FamiliarPersonajePrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.familiarPersonajePopupService
                .open(FamiliarPersonajePrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
