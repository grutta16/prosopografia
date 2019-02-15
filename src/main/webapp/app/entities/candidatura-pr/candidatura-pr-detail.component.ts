import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CandidaturaPr } from './candidatura-pr.model';
import { CandidaturaPrService } from './candidatura-pr.service';

@Component({
    selector: 'jhi-candidatura-pr-detail',
    templateUrl: './candidatura-pr-detail.component.html'
})
export class CandidaturaPrDetailComponent implements OnInit, OnDestroy {

    candidatura: CandidaturaPr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private candidaturaService: CandidaturaPrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCandidaturas();
    }

    load(id) {
        this.candidaturaService.find(id)
            .subscribe((candidaturaResponse: HttpResponse<CandidaturaPr>) => {
                this.candidatura = candidaturaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCandidaturas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'candidaturaListModification',
            (response) => this.load(this.candidatura.id)
        );
    }
}
