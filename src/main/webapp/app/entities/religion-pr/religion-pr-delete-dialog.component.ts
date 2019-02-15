import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ReligionPr } from './religion-pr.model';
import { ReligionPrPopupService } from './religion-pr-popup.service';
import { ReligionPrService } from './religion-pr.service';

@Component({
    selector: 'jhi-religion-pr-delete-dialog',
    templateUrl: './religion-pr-delete-dialog.component.html'
})
export class ReligionPrDeleteDialogComponent {

    religion: ReligionPr;

    constructor(
        private religionService: ReligionPrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.religionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'religionListModification',
                content: 'Deleted an religion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-religion-pr-delete-popup',
    template: ''
})
export class ReligionPrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private religionPopupService: ReligionPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.religionPopupService
                .open(ReligionPrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
