import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RelacionFamiliarPr } from './relacion-familiar-pr.model';
import { RelacionFamiliarPrPopupService } from './relacion-familiar-pr-popup.service';
import { RelacionFamiliarPrService } from './relacion-familiar-pr.service';

@Component({
    selector: 'jhi-relacion-familiar-pr-delete-dialog',
    templateUrl: './relacion-familiar-pr-delete-dialog.component.html'
})
export class RelacionFamiliarPrDeleteDialogComponent {

    relacionFamiliar: RelacionFamiliarPr;

    constructor(
        private relacionFamiliarService: RelacionFamiliarPrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.relacionFamiliarService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'relacionFamiliarListModification',
                content: 'Deleted an relacionFamiliar'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-relacion-familiar-pr-delete-popup',
    template: ''
})
export class RelacionFamiliarPrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private relacionFamiliarPopupService: RelacionFamiliarPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.relacionFamiliarPopupService
                .open(RelacionFamiliarPrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
