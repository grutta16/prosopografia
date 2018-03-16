import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CargoPr } from './cargo-pr.model';
import { CargoPrService } from './cargo-pr.service';

@Component({
    selector: 'jhi-cargo-pr-detail',
    templateUrl: './cargo-pr-detail.component.html'
})
export class CargoPrDetailComponent implements OnInit, OnDestroy {

    cargo: CargoPr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cargoService: CargoPrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCargos();
    }

    load(id) {
        this.cargoService.find(id)
            .subscribe((cargoResponse: HttpResponse<CargoPr>) => {
                this.cargo = cargoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCargos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cargoListModification',
            (response) => this.load(this.cargo.id)
        );
    }
}
