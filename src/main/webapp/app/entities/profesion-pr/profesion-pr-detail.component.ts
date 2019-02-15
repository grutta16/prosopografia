import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ProfesionPr } from './profesion-pr.model';
import { ProfesionPrService } from './profesion-pr.service';

@Component({
    selector: 'jhi-profesion-pr-detail',
    templateUrl: './profesion-pr-detail.component.html'
})
export class ProfesionPrDetailComponent implements OnInit, OnDestroy {

    profesion: ProfesionPr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private profesionService: ProfesionPrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProfesions();
    }

    load(id) {
        this.profesionService.find(id)
            .subscribe((profesionResponse: HttpResponse<ProfesionPr>) => {
                this.profesion = profesionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProfesions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'profesionListModification',
            (response) => this.load(this.profesion.id)
        );
    }
}
