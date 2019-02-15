import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AsociacionPr } from './asociacion-pr.model';
import { AsociacionPrService } from './asociacion-pr.service';

@Component({
    selector: 'jhi-asociacion-pr-detail',
    templateUrl: './asociacion-pr-detail.component.html'
})
export class AsociacionPrDetailComponent implements OnInit, OnDestroy {

    asociacion: AsociacionPr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private asociacionService: AsociacionPrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAsociacions();
    }

    load(id) {
        this.asociacionService.find(id)
            .subscribe((asociacionResponse: HttpResponse<AsociacionPr>) => {
                this.asociacion = asociacionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAsociacions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'asociacionListModification',
            (response) => this.load(this.asociacion.id)
        );
    }
}
