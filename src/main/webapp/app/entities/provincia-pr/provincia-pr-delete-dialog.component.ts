import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProvinciaPr } from './provincia-pr.model';
import { ProvinciaPrPopupService } from './provincia-pr-popup.service';
import { ProvinciaPrService } from './provincia-pr.service';

@Component({
    selector: 'jhi-provincia-pr-delete-dialog',
    templateUrl: './provincia-pr-delete-dialog.component.html'
})
export class ProvinciaPrDeleteDialogComponent {

    provincia: ProvinciaPr;

    constructor(
        private provinciaService: ProvinciaPrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.provinciaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'provinciaListModification',
                content: 'Deleted an provincia'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-provincia-pr-delete-popup',
    template: ''
})
export class ProvinciaPrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private provinciaPopupService: ProvinciaPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.provinciaPopupService
                .open(ProvinciaPrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
