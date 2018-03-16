import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PersonaPr } from './persona-pr.model';
import { PersonaPrService } from './persona-pr.service';

@Component({
    selector: 'jhi-persona-pr-detail',
    templateUrl: './persona-pr-detail.component.html'
})
export class PersonaPrDetailComponent implements OnInit, OnDestroy {

    persona: PersonaPr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private personaService: PersonaPrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPersonas();
    }

    load(id) {
        this.personaService.find(id)
            .subscribe((personaResponse: HttpResponse<PersonaPr>) => {
                this.persona = personaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPersonas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'personaListModification',
            (response) => this.load(this.persona.id)
        );
    }
}
