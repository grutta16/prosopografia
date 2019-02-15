import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PartidoPersonajePr } from './partido-personaje-pr.model';
import { PartidoPersonajePrService } from './partido-personaje-pr.service';

@Component({
    selector: 'jhi-partido-personaje-pr-detail',
    templateUrl: './partido-personaje-pr-detail.component.html'
})
export class PartidoPersonajePrDetailComponent implements OnInit, OnDestroy {

    partidoPersonaje: PartidoPersonajePr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private partidoPersonajeService: PartidoPersonajePrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPartidoPersonajes();
    }

    load(id) {
        this.partidoPersonajeService.find(id)
            .subscribe((partidoPersonajeResponse: HttpResponse<PartidoPersonajePr>) => {
                this.partidoPersonaje = partidoPersonajeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPartidoPersonajes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'partidoPersonajeListModification',
            (response) => this.load(this.partidoPersonaje.id)
        );
    }
}
