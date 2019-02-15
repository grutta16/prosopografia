import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PersonajePrComponent } from './personaje-pr.component';
import { PersonajePrDetailComponent } from './personaje-pr-detail.component';
import { PersonajePrPopupComponent } from './personaje-pr-dialog.component';
import { PersonajePrDeletePopupComponent } from './personaje-pr-delete-dialog.component';

@Injectable()
export class PersonajePrResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const personajeRoute: Routes = [
    {
        path: 'personaje-pr',
        component: PersonajePrComponent,
        resolve: {
            'pagingParams': PersonajePrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.personaje.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'personaje-pr/:id',
        component: PersonajePrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.personaje.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const personajePopupRoute: Routes = [
    {
        path: 'personaje-pr-new',
        component: PersonajePrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.personaje.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'personaje-pr/:id/edit',
        component: PersonajePrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.personaje.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'personaje-pr/:id/delete',
        component: PersonajePrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.personaje.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
