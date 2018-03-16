import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ReligionPersonajePr } from './religion-personaje-pr.model';
import { ReligionPersonajePrService } from './religion-personaje-pr.service';

@Component({
    selector: 'jhi-religion-personaje-pr-detail',
    templateUrl: './religion-personaje-pr-detail.component.html'
})
export class ReligionPersonajePrDetailComponent implements OnInit, OnDestroy {

    religionPersonaje: ReligionPersonajePr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private religionPersonajeService: ReligionPersonajePrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInReligionPersonajes();
    }

    load(id) {
        this.religionPersonajeService.find(id)
            .subscribe((religionPersonajeResponse: HttpResponse<ReligionPersonajePr>) => {
                this.religionPersonaje = religionPersonajeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInReligionPersonajes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'religionPersonajeListModification',
            (response) => this.load(this.religionPersonaje.id)
        );
    }
}
