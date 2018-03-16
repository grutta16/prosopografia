import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AsociacionPersonajePr } from './asociacion-personaje-pr.model';
import { AsociacionPersonajePrPopupService } from './asociacion-personaje-pr-popup.service';
import { AsociacionPersonajePrService } from './asociacion-personaje-pr.service';

@Component({
    selector: 'jhi-asociacion-personaje-pr-delete-dialog',
    templateUrl: './asociacion-personaje-pr-delete-dialog.component.html'
})
export class AsociacionPersonajePrDeleteDialogComponent {

    asociacionPersonaje: AsociacionPersonajePr;

    constructor(
        private asociacionPersonajeService: AsociacionPersonajePrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.asociacionPersonajeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'asociacionPersonajeListModification',
                content: 'Deleted an asociacionPersonaje'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-asociacion-personaje-pr-delete-popup',
    template: ''
})
export class AsociacionPersonajePrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private asociacionPersonajePopupService: AsociacionPersonajePrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.asociacionPersonajePopupService
                .open(AsociacionPersonajePrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
