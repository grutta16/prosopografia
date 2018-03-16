import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EleccionPr } from './eleccion-pr.model';
import { EleccionPrPopupService } from './eleccion-pr-popup.service';
import { EleccionPrService } from './eleccion-pr.service';

@Component({
    selector: 'jhi-eleccion-pr-delete-dialog',
    templateUrl: './eleccion-pr-delete-dialog.component.html'
})
export class EleccionPrDeleteDialogComponent {

    eleccion: EleccionPr;

    constructor(
        private eleccionService: EleccionPrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.eleccionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'eleccionListModification',
                content: 'Deleted an eleccion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-eleccion-pr-delete-popup',
    template: ''
})
export class EleccionPrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eleccionPopupService: EleccionPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.eleccionPopupService
                .open(EleccionPrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
