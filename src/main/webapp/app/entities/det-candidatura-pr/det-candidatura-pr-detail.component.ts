import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DetCandidaturaPr } from './det-candidatura-pr.model';
import { DetCandidaturaPrService } from './det-candidatura-pr.service';

@Component({
    selector: 'jhi-det-candidatura-pr-detail',
    templateUrl: './det-candidatura-pr-detail.component.html'
})
export class DetCandidaturaPrDetailComponent implements OnInit, OnDestroy {

    detCandidatura: DetCandidaturaPr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private detCandidaturaService: DetCandidaturaPrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDetCandidaturas();
    }

    load(id) {
        this.detCandidaturaService.find(id)
            .subscribe((detCandidaturaResponse: HttpResponse<DetCandidaturaPr>) => {
                this.detCandidatura = detCandidaturaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDetCandidaturas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'detCandidaturaListModification',
            (response) => this.load(this.detCandidatura.id)
        );
    }
}
