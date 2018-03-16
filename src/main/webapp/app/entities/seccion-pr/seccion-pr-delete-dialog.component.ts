import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SeccionPr } from './seccion-pr.model';
import { SeccionPrPopupService } from './seccion-pr-popup.service';
import { SeccionPrService } from './seccion-pr.service';

@Component({
    selector: 'jhi-seccion-pr-delete-dialog',
    templateUrl: './seccion-pr-delete-dialog.component.html'
})
export class SeccionPrDeleteDialogComponent {

    seccion: SeccionPr;

    constructor(
        private seccionService: SeccionPrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.seccionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'seccionListModification',
                content: 'Deleted an seccion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-seccion-pr-delete-popup',
    template: ''
})
export class SeccionPrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private seccionPopupService: SeccionPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.seccionPopupService
                .open(SeccionPrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
