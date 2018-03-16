import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DetCandidaturaPr } from './det-candidatura-pr.model';
import { DetCandidaturaPrPopupService } from './det-candidatura-pr-popup.service';
import { DetCandidaturaPrService } from './det-candidatura-pr.service';

@Component({
    selector: 'jhi-det-candidatura-pr-delete-dialog',
    templateUrl: './det-candidatura-pr-delete-dialog.component.html'
})
export class DetCandidaturaPrDeleteDialogComponent {

    detCandidatura: DetCandidaturaPr;

    constructor(
        private detCandidaturaService: DetCandidaturaPrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.detCandidaturaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'detCandidaturaListModification',
                content: 'Deleted an detCandidatura'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-det-candidatura-pr-delete-popup',
    template: ''
})
export class DetCandidaturaPrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private detCandidaturaPopupService: DetCandidaturaPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.detCandidaturaPopupService
                .open(DetCandidaturaPrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
