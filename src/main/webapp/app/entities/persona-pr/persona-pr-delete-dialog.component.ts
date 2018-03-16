import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PersonaPr } from './persona-pr.model';
import { PersonaPrPopupService } from './persona-pr-popup.service';
import { PersonaPrService } from './persona-pr.service';

@Component({
    selector: 'jhi-persona-pr-delete-dialog',
    templateUrl: './persona-pr-delete-dialog.component.html'
})
export class PersonaPrDeleteDialogComponent {

    persona: PersonaPr;

    constructor(
        private personaService: PersonaPrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.personaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'personaListModification',
                content: 'Deleted an persona'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-persona-pr-delete-popup',
    template: ''
})
export class PersonaPrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personaPopupService: PersonaPrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.personaPopupService
                .open(PersonaPrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
