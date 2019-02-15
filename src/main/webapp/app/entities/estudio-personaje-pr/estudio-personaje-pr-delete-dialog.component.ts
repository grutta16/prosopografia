import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EstudioPersonajePr } from './estudio-personaje-pr.model';
import { EstudioPersonajePrPopupService } from './estudio-personaje-pr-popup.service';
import { EstudioPersonajePrService } from './estudio-personaje-pr.service';

@Component({
    selector: 'jhi-estudio-personaje-pr-delete-dialog',
    templateUrl: './estudio-personaje-pr-delete-dialog.component.html'
})
export class EstudioPersonajePrDeleteDialogComponent {

    estudioPersonaje: EstudioPersonajePr;

    constructor(
        private estudioPersonajeService: EstudioPersonajePrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.estudioPersonajeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'estudioPersonajeListModification',
                content: 'Deleted an estudioPersonaje'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-estudio-personaje-pr-delete-popup',
    template: ''
})
export class EstudioPersonajePrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estudioPersonajePopupService: EstudioPersonajePrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.estudioPersonajePopupService
                .open(EstudioPersonajePrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
