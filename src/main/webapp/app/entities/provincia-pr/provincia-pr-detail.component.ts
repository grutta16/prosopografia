import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ProvinciaPr } from './provincia-pr.model';
import { ProvinciaPrService } from './provincia-pr.service';

@Component({
    selector: 'jhi-provincia-pr-detail',
    templateUrl: './provincia-pr-detail.component.html'
})
export class ProvinciaPrDetailComponent implements OnInit, OnDestroy {

    provincia: ProvinciaPr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private provinciaService: ProvinciaPrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProvincias();
    }

    load(id) {
        this.provinciaService.find(id)
            .subscribe((provinciaResponse: HttpResponse<ProvinciaPr>) => {
                this.provincia = provinciaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProvincias() {
        this.eventSubscriber = this.eventManager.subscribe(
            'provinciaListModification',
            (response) => this.load(this.provincia.id)
        );
    }
}
