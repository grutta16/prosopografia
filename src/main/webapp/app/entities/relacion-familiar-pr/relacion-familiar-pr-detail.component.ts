import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RelacionFamiliarPr } from './relacion-familiar-pr.model';
import { RelacionFamiliarPrService } from './relacion-familiar-pr.service';

@Component({
    selector: 'jhi-relacion-familiar-pr-detail',
    templateUrl: './relacion-familiar-pr-detail.component.html'
})
export class RelacionFamiliarPrDetailComponent implements OnInit, OnDestroy {

    relacionFamiliar: RelacionFamiliarPr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private relacionFamiliarService: RelacionFamiliarPrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRelacionFamiliars();
    }

    load(id) {
        this.relacionFamiliarService.find(id)
            .subscribe((relacionFamiliarResponse: HttpResponse<RelacionFamiliarPr>) => {
                this.relacionFamiliar = relacionFamiliarResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRelacionFamiliars() {
        this.eventSubscriber = this.eventManager.subscribe(
            'relacionFamiliarListModification',
            (response) => this.load(this.relacionFamiliar.id)
        );
    }
}
