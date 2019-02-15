import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TipoProfesionPr } from './tipo-profesion-pr.model';
import { TipoProfesionPrService } from './tipo-profesion-pr.service';

@Component({
    selector: 'jhi-tipo-profesion-pr-detail',
    templateUrl: './tipo-profesion-pr-detail.component.html'
})
export class TipoProfesionPrDetailComponent implements OnInit, OnDestroy {

    tipoProfesion: TipoProfesionPr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipoProfesionService: TipoProfesionPrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipoProfesions();
    }

    load(id) {
        this.tipoProfesionService.find(id)
            .subscribe((tipoProfesionResponse: HttpResponse<TipoProfesionPr>) => {
                this.tipoProfesion = tipoProfesionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipoProfesions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipoProfesionListModification',
            (response) => this.load(this.tipoProfesion.id)
        );
    }
}
