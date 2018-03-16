import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CargoPersonajePr } from './cargo-personaje-pr.model';
import { CargoPersonajePrPopupService } from './cargo-personaje-pr-popup.service';
import { CargoPersonajePrService } from './cargo-personaje-pr.service';

@Component({
    selector: 'jhi-cargo-personaje-pr-delete-dialog',
    templateUrl: './cargo-personaje-pr-delete-dialog.component.html'
})
export class CargoPersonajePrDeleteDialogComponent {

    cargoPersonaje: CargoPersonajePr;

    constructor(
        private cargoPersonajeService: CargoPersonajePrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cargoPersonajeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cargoPersonajeListModification',
                content: 'Deleted an cargoPersonaje'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cargo-personaje-pr-delete-popup',
    template: ''
})
export class CargoPersonajePrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cargoPersonajePopupService: CargoPersonajePrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cargoPersonajePopupService
                .open(CargoPersonajePrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
