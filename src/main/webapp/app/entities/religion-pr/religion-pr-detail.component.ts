import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ReligionPr } from './religion-pr.model';
import { ReligionPrService } from './religion-pr.service';

@Component({
    selector: 'jhi-religion-pr-detail',
    templateUrl: './religion-pr-detail.component.html'
})
export class ReligionPrDetailComponent implements OnInit, OnDestroy {

    religion: ReligionPr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private religionService: ReligionPrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInReligions();
    }

    load(id) {
        this.religionService.find(id)
            .subscribe((religionResponse: HttpResponse<ReligionPr>) => {
                this.religion = religionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInReligions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'religionListModification',
            (response) => this.load(this.religion.id)
        );
    }
}
