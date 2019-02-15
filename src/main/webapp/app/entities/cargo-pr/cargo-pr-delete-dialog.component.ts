import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CargoPr } from './cargo-pr.model';
import { CargoPrPopupService } from './cargo-pr-popup.service';
import { CargoPrService } from './cargo-pr.service';

@Component({
    selector: 'jhi-cargo-pr-delete-dialog',
    templateUrl: './cargo-pr-delete-dialog.component.html'
})
export class CargoPrDeleteDialogComponent {

    cargo: CargoPr;

    constructor(
        private cargoService: CargoPrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cargoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cargoListModification',
                content: 'Deleted an cargo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cargo-pr-delete-popup',
    template: ''
})
export class CargoPrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cargoPopupService: CargoPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cargoPopupService
                .open(CargoPrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
