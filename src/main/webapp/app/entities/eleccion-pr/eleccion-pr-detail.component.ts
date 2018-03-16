import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EleccionPr } from './eleccion-pr.model';
import { EleccionPrService } from './eleccion-pr.service';

@Component({
    selector: 'jhi-eleccion-pr-detail',
    templateUrl: './eleccion-pr-detail.component.html'
})
export class EleccionPrDetailComponent implements OnInit, OnDestroy {

    eleccion: EleccionPr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private eleccionService: EleccionPrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEleccions();
    }

    load(id) {
        this.eleccionService.find(id)
            .subscribe((eleccionResponse: HttpResponse<EleccionPr>) => {
                this.eleccion = eleccionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEleccions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'eleccionListModification',
            (response) => this.load(this.eleccion.id)
        );
    }
}
