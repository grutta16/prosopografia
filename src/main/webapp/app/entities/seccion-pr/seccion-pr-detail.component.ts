import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SeccionPr } from './seccion-pr.model';
import { SeccionPrService } from './seccion-pr.service';

@Component({
    selector: 'jhi-seccion-pr-detail',
    templateUrl: './seccion-pr-detail.component.html'
})
export class SeccionPrDetailComponent implements OnInit, OnDestroy {

    seccion: SeccionPr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private seccionService: SeccionPrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSeccions();
    }

    load(id) {
        this.seccionService.find(id)
            .subscribe((seccionResponse: HttpResponse<SeccionPr>) => {
                this.seccion = seccionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSeccions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'seccionListModification',
            (response) => this.load(this.seccion.id)
        );
    }
}
