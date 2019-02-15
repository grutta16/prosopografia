import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ResidenciaPersonajePr } from './residencia-personaje-pr.model';
import { ResidenciaPersonajePrService } from './residencia-personaje-pr.service';

@Component({
    selector: 'jhi-residencia-personaje-pr-detail',
    templateUrl: './residencia-personaje-pr-detail.component.html'
})
export class ResidenciaPersonajePrDetailComponent implements OnInit, OnDestroy {

    residenciaPersonaje: ResidenciaPersonajePr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private residenciaPersonajeService: ResidenciaPersonajePrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInResidenciaPersonajes();
    }

    load(id) {
        this.residenciaPersonajeService.find(id)
            .subscribe((residenciaPersonajeResponse: HttpResponse<ResidenciaPersonajePr>) => {
                this.residenciaPersonaje = residenciaPersonajeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInResidenciaPersonajes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'residenciaPersonajeListModification',
            (response) => this.load(this.residenciaPersonaje.id)
        );
    }
}
