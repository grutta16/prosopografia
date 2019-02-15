import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PartidoPr } from './partido-pr.model';
import { PartidoPrPopupService } from './partido-pr-popup.service';
import { PartidoPrService } from './partido-pr.service';

@Component({
    selector: 'jhi-partido-pr-delete-dialog',
    templateUrl: './partido-pr-delete-dialog.component.html'
})
export class PartidoPrDeleteDialogComponent {

    partido: PartidoPr;

    constructor(
        private partidoService: PartidoPrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.partidoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'partidoListModification',
                content: 'Deleted an partido'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-partido-pr-delete-popup',
    template: ''
})
export class PartidoPrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private partidoPopupService: PartidoPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.partidoPopupService
                .open(PartidoPrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
