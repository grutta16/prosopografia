import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AsociacionPersonajePr } from './asociacion-personaje-pr.model';
import { AsociacionPersonajePrService } from './asociacion-personaje-pr.service';

@Component({
    selector: 'jhi-asociacion-personaje-pr-detail',
    templateUrl: './asociacion-personaje-pr-detail.component.html'
})
export class AsociacionPersonajePrDetailComponent implements OnInit, OnDestroy {

    asociacionPersonaje: AsociacionPersonajePr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private asociacionPersonajeService: AsociacionPersonajePrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAsociacionPersonajes();
    }

    load(id) {
        this.asociacionPersonajeService.find(id)
            .subscribe((asociacionPersonajeResponse: HttpResponse<AsociacionPersonajePr>) => {
                this.asociacionPersonaje = asociacionPersonajeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAsociacionPersonajes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'asociacionPersonajeListModification',
            (response) => this.load(this.asociacionPersonaje.id)
        );
    }
}
