import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ParejaPersonajePr } from './pareja-personaje-pr.model';
import { ParejaPersonajePrPopupService } from './pareja-personaje-pr-popup.service';
import { ParejaPersonajePrService } from './pareja-personaje-pr.service';

@Component({
    selector: 'jhi-pareja-personaje-pr-delete-dialog',
    templateUrl: './pareja-personaje-pr-delete-dialog.component.html'
})
export class ParejaPersonajePrDeleteDialogComponent {

    parejaPersonaje: ParejaPersonajePr;

    constructor(
        private parejaPersonajeService: ParejaPersonajePrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.parejaPersonajeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'parejaPersonajeListModification',
                content: 'Deleted an parejaPersonaje'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pareja-personaje-pr-delete-popup',
    template: ''
})
export class ParejaPersonajePrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private parejaPersonajePopupService: ParejaPersonajePrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.parejaPersonajePopupService
                .open(ParejaPersonajePrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
