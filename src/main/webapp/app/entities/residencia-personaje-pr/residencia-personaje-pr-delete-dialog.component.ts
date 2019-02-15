import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ResidenciaPersonajePr } from './residencia-personaje-pr.model';
import { ResidenciaPersonajePrPopupService } from './residencia-personaje-pr-popup.service';
import { ResidenciaPersonajePrService } from './residencia-personaje-pr.service';

@Component({
    selector: 'jhi-residencia-personaje-pr-delete-dialog',
    templateUrl: './residencia-personaje-pr-delete-dialog.component.html'
})
export class ResidenciaPersonajePrDeleteDialogComponent {

    residenciaPersonaje: ResidenciaPersonajePr;

    constructor(
        private residenciaPersonajeService: ResidenciaPersonajePrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.residenciaPersonajeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'residenciaPersonajeListModification',
                content: 'Deleted an residenciaPersonaje'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-residencia-personaje-pr-delete-popup',
    template: ''
})
export class ResidenciaPersonajePrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private residenciaPersonajePopupService: ResidenciaPersonajePrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.residenciaPersonajePopupService
                .open(ResidenciaPersonajePrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
