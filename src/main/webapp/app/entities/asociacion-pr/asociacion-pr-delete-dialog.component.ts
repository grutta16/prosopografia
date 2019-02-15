import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AsociacionPr } from './asociacion-pr.model';
import { AsociacionPrPopupService } from './asociacion-pr-popup.service';
import { AsociacionPrService } from './asociacion-pr.service';

@Component({
    selector: 'jhi-asociacion-pr-delete-dialog',
    templateUrl: './asociacion-pr-delete-dialog.component.html'
})
export class AsociacionPrDeleteDialogComponent {

    asociacion: AsociacionPr;

    constructor(
        private asociacionService: AsociacionPrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.asociacionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'asociacionListModification',
                content: 'Deleted an asociacion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-asociacion-pr-delete-popup',
    template: ''
})
export class AsociacionPrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private asociacionPopupService: AsociacionPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.asociacionPopupService
                .open(AsociacionPrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
