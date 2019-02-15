import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PaisPr } from './pais-pr.model';
import { PaisPrService } from './pais-pr.service';

@Component({
    selector: 'jhi-pais-pr-detail',
    templateUrl: './pais-pr-detail.component.html'
})
export class PaisPrDetailComponent implements OnInit, OnDestroy {

    pais: PaisPr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private paisService: PaisPrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPais();
    }

    load(id) {
        this.paisService.find(id)
            .subscribe((paisResponse: HttpResponse<PaisPr>) => {
                this.pais = paisResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPais() {
        this.eventSubscriber = this.eventManager.subscribe(
            'paisListModification',
            (response) => this.load(this.pais.id)
        );
    }
}
