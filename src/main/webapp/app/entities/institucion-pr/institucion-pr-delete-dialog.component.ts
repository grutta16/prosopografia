import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { InstitucionPr } from './institucion-pr.model';
import { InstitucionPrPopupService } from './institucion-pr-popup.service';
import { InstitucionPrService } from './institucion-pr.service';

@Component({
    selector: 'jhi-institucion-pr-delete-dialog',
    templateUrl: './institucion-pr-delete-dialog.component.html'
})
export class InstitucionPrDeleteDialogComponent {

    institucion: InstitucionPr;

    constructor(
        private institucionService: InstitucionPrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.institucionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'institucionListModification',
                content: 'Deleted an institucion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-institucion-pr-delete-popup',
    template: ''
})
export class InstitucionPrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private institucionPopupService: InstitucionPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.institucionPopupService
                .open(InstitucionPrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
