import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PaisPr } from './pais-pr.model';
import { PaisPrPopupService } from './pais-pr-popup.service';
import { PaisPrService } from './pais-pr.service';

@Component({
    selector: 'jhi-pais-pr-delete-dialog',
    templateUrl: './pais-pr-delete-dialog.component.html'
})
export class PaisPrDeleteDialogComponent {

    pais: PaisPr;

    constructor(
        private paisService: PaisPrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.paisService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'paisListModification',
                content: 'Deleted an pais'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pais-pr-delete-popup',
    template: ''
})
export class PaisPrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private paisPopupService: PaisPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.paisPopupService
                .open(PaisPrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
