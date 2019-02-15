import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EstudioPersonajePr } from './estudio-personaje-pr.model';
import { EstudioPersonajePrService } from './estudio-personaje-pr.service';

@Component({
    selector: 'jhi-estudio-personaje-pr-detail',
    templateUrl: './estudio-personaje-pr-detail.component.html'
})
export class EstudioPersonajePrDetailComponent implements OnInit, OnDestroy {

    estudioPersonaje: EstudioPersonajePr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private estudioPersonajeService: EstudioPersonajePrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEstudioPersonajes();
    }

    load(id) {
        this.estudioPersonajeService.find(id)
            .subscribe((estudioPersonajeResponse: HttpResponse<EstudioPersonajePr>) => {
                this.estudioPersonaje = estudioPersonajeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEstudioPersonajes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'estudioPersonajeListModification',
            (response) => this.load(this.estudioPersonaje.id)
        );
    }
}
