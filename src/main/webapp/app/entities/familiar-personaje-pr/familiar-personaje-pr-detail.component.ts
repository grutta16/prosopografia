import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { FamiliarPersonajePr } from './familiar-personaje-pr.model';
import { FamiliarPersonajePrService } from './familiar-personaje-pr.service';

@Component({
    selector: 'jhi-familiar-personaje-pr-detail',
    templateUrl: './familiar-personaje-pr-detail.component.html'
})
export class FamiliarPersonajePrDetailComponent implements OnInit, OnDestroy {

    familiarPersonaje: FamiliarPersonajePr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private familiarPersonajeService: FamiliarPersonajePrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFamiliarPersonajes();
    }

    load(id) {
        this.familiarPersonajeService.find(id)
            .subscribe((familiarPersonajeResponse: HttpResponse<FamiliarPersonajePr>) => {
                this.familiarPersonaje = familiarPersonajeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFamiliarPersonajes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'familiarPersonajeListModification',
            (response) => this.load(this.familiarPersonaje.id)
        );
    }
}
