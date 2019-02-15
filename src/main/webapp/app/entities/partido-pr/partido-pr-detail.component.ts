import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PartidoPr } from './partido-pr.model';
import { PartidoPrService } from './partido-pr.service';

@Component({
    selector: 'jhi-partido-pr-detail',
    templateUrl: './partido-pr-detail.component.html'
})
export class PartidoPrDetailComponent implements OnInit, OnDestroy {

    partido: PartidoPr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private partidoService: PartidoPrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPartidos();
    }

    load(id) {
        this.partidoService.find(id)
            .subscribe((partidoResponse: HttpResponse<PartidoPr>) => {
                this.partido = partidoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPartidos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'partidoListModification',
            (response) => this.load(this.partido.id)
        );
    }
}
