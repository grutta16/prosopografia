import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PersonajePr } from './personaje-pr.model';
import { PersonajePrPopupService } from './personaje-pr-popup.service';
import { PersonajePrService } from './personaje-pr.service';

@Component({
    selector: 'jhi-personaje-pr-delete-dialog',
    templateUrl: './personaje-pr-delete-dialog.component.html'
})
export class PersonajePrDeleteDialogComponent {

    personaje: PersonajePr;

    constructor(
        private personajeService: PersonajePrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.personajeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'personajeListModification',
                content: 'Deleted an personaje'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-personaje-pr-delete-popup',
    template: ''
})
export class PersonajePrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personajePopupService: PersonajePrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.personajePopupService
                .open(PersonajePrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
