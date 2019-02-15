import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ParejaPersonajePr } from './pareja-personaje-pr.model';
import { ParejaPersonajePrService } from './pareja-personaje-pr.service';

@Component({
    selector: 'jhi-pareja-personaje-pr-detail',
    templateUrl: './pareja-personaje-pr-detail.component.html'
})
export class ParejaPersonajePrDetailComponent implements OnInit, OnDestroy {

    parejaPersonaje: ParejaPersonajePr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private parejaPersonajeService: ParejaPersonajePrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInParejaPersonajes();
    }

    load(id) {
        this.parejaPersonajeService.find(id)
            .subscribe((parejaPersonajeResponse: HttpResponse<ParejaPersonajePr>) => {
                this.parejaPersonaje = parejaPersonajeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInParejaPersonajes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'parejaPersonajeListModification',
            (response) => this.load(this.parejaPersonaje.id)
        );
    }
}
