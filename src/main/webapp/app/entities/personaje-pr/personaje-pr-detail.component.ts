import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PersonajePr } from './personaje-pr.model';
import { PersonajePrService } from './personaje-pr.service';

@Component({
    selector: 'jhi-personaje-pr-detail',
    templateUrl: './personaje-pr-detail.component.html'
})
export class PersonajePrDetailComponent implements OnInit, OnDestroy {

    personaje: PersonajePr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private personajeService: PersonajePrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPersonajes();
    }

    load(id) {
        this.personajeService.find(id)
            .subscribe((personajeResponse: HttpResponse<PersonajePr>) => {
                this.personaje = personajeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPersonajes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'personajeListModification',
            (response) => this.load(this.personaje.id)
        );
    }
}
