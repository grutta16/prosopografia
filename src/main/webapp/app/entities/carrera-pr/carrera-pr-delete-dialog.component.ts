import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CarreraPr } from './carrera-pr.model';
import { CarreraPrPopupService } from './carrera-pr-popup.service';
import { CarreraPrService } from './carrera-pr.service';

@Component({
    selector: 'jhi-carrera-pr-delete-dialog',
    templateUrl: './carrera-pr-delete-dialog.component.html'
})
export class CarreraPrDeleteDialogComponent {

    carrera: CarreraPr;

    constructor(
        private carreraService: CarreraPrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.carreraService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'carreraListModification',
                content: 'Deleted an carrera'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-carrera-pr-delete-popup',
    template: ''
})
export class CarreraPrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private carreraPopupService: CarreraPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.carreraPopupService
                .open(CarreraPrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
