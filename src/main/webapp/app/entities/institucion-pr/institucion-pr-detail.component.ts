import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { InstitucionPr } from './institucion-pr.model';
import { InstitucionPrService } from './institucion-pr.service';

@Component({
    selector: 'jhi-institucion-pr-detail',
    templateUrl: './institucion-pr-detail.component.html'
})
export class InstitucionPrDetailComponent implements OnInit, OnDestroy {

    institucion: InstitucionPr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private institucionService: InstitucionPrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInstitucions();
    }

    load(id) {
        this.institucionService.find(id)
            .subscribe((institucionResponse: HttpResponse<InstitucionPr>) => {
                this.institucion = institucionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInstitucions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'institucionListModification',
            (response) => this.load(this.institucion.id)
        );
    }
}
