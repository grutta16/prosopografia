import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PartidoPersonajePr } from './partido-personaje-pr.model';
import { PartidoPersonajePrPopupService } from './partido-personaje-pr-popup.service';
import { PartidoPersonajePrService } from './partido-personaje-pr.service';

@Component({
    selector: 'jhi-partido-personaje-pr-delete-dialog',
    templateUrl: './partido-personaje-pr-delete-dialog.component.html'
})
export class PartidoPersonajePrDeleteDialogComponent {

    partidoPersonaje: PartidoPersonajePr;

    constructor(
        private partidoPersonajeService: PartidoPersonajePrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.partidoPersonajeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'partidoPersonajeListModification',
                content: 'Deleted an partidoPersonaje'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-partido-personaje-pr-delete-popup',
    template: ''
})
export class PartidoPersonajePrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private partidoPersonajePopupService: PartidoPersonajePrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.partidoPersonajePopupService
                .open(PartidoPersonajePrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
