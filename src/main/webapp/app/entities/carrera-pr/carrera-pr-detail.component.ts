import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CarreraPr } from './carrera-pr.model';
import { CarreraPrService } from './carrera-pr.service';

@Component({
    selector: 'jhi-carrera-pr-detail',
    templateUrl: './carrera-pr-detail.component.html'
})
export class CarreraPrDetailComponent implements OnInit, OnDestroy {

    carrera: CarreraPr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private carreraService: CarreraPrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCarreras();
    }

    load(id) {
        this.carreraService.find(id)
            .subscribe((carreraResponse: HttpResponse<CarreraPr>) => {
                this.carrera = carreraResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCarreras() {
        this.eventSubscriber = this.eventManager.subscribe(
            'carreraListModification',
            (response) => this.load(this.carrera.id)
        );
    }
}
