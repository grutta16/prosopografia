import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ReligionPersonajePr } from './religion-personaje-pr.model';
import { ReligionPersonajePrPopupService } from './religion-personaje-pr-popup.service';
import { ReligionPersonajePrService } from './religion-personaje-pr.service';

@Component({
    selector: 'jhi-religion-personaje-pr-delete-dialog',
    templateUrl: './religion-personaje-pr-delete-dialog.component.html'
})
export class ReligionPersonajePrDeleteDialogComponent {

    religionPersonaje: ReligionPersonajePr;

    constructor(
        private religionPersonajeService: ReligionPersonajePrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.religionPersonajeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'religionPersonajeListModification',
                content: 'Deleted an religionPersonaje'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-religion-personaje-pr-delete-popup',
    template: ''
})
export class ReligionPersonajePrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private religionPersonajePopupService: ReligionPersonajePrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.religionPersonajePopupService
                .open(ReligionPersonajePrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
