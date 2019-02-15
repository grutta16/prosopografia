import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LugarPr } from './lugar-pr.model';
import { LugarPrPopupService } from './lugar-pr-popup.service';
import { LugarPrService } from './lugar-pr.service';

@Component({
    selector: 'jhi-lugar-pr-delete-dialog',
    templateUrl: './lugar-pr-delete-dialog.component.html'
})
export class LugarPrDeleteDialogComponent {

    lugar: LugarPr;

    constructor(
        private lugarService: LugarPrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.lugarService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'lugarListModification',
                content: 'Deleted an lugar'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-lugar-pr-delete-popup',
    template: ''
})
export class LugarPrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lugarPopupService: LugarPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.lugarPopupService
                .open(LugarPrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
