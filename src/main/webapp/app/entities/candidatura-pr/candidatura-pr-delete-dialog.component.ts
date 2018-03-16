import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CandidaturaPr } from './candidatura-pr.model';
import { CandidaturaPrPopupService } from './candidatura-pr-popup.service';
import { CandidaturaPrService } from './candidatura-pr.service';

@Component({
    selector: 'jhi-candidatura-pr-delete-dialog',
    templateUrl: './candidatura-pr-delete-dialog.component.html'
})
export class CandidaturaPrDeleteDialogComponent {

    candidatura: CandidaturaPr;

    constructor(
        private candidaturaService: CandidaturaPrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.candidaturaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'candidaturaListModification',
                content: 'Deleted an candidatura'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-candidatura-pr-delete-popup',
    template: ''
})
export class CandidaturaPrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private candidaturaPopupService: CandidaturaPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.candidaturaPopupService
                .open(CandidaturaPrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
