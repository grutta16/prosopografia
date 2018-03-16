import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CargoPersonajePr } from './cargo-personaje-pr.model';
import { CargoPersonajePrService } from './cargo-personaje-pr.service';

@Component({
    selector: 'jhi-cargo-personaje-pr-detail',
    templateUrl: './cargo-personaje-pr-detail.component.html'
})
export class CargoPersonajePrDetailComponent implements OnInit, OnDestroy {

    cargoPersonaje: CargoPersonajePr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cargoPersonajeService: CargoPersonajePrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCargoPersonajes();
    }

    load(id) {
        this.cargoPersonajeService.find(id)
            .subscribe((cargoPersonajeResponse: HttpResponse<CargoPersonajePr>) => {
                this.cargoPersonaje = cargoPersonajeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCargoPersonajes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cargoPersonajeListModification',
            (response) => this.load(this.cargoPersonaje.id)
        );
    }
}
