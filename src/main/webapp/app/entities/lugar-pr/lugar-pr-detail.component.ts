import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { LugarPr } from './lugar-pr.model';
import { LugarPrService } from './lugar-pr.service';

@Component({
    selector: 'jhi-lugar-pr-detail',
    templateUrl: './lugar-pr-detail.component.html'
})
export class LugarPrDetailComponent implements OnInit, OnDestroy {

    lugar: LugarPr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private lugarService: LugarPrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLugars();
    }

    load(id) {
        this.lugarService.find(id)
            .subscribe((lugarResponse: HttpResponse<LugarPr>) => {
                this.lugar = lugarResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLugars() {
        this.eventSubscriber = this.eventManager.subscribe(
            'lugarListModification',
            (response) => this.load(this.lugar.id)
        );
    }
}
