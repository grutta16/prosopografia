import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { FamiliarPersonajePrComponent } from './familiar-personaje-pr.component';
import { FamiliarPersonajePrDetailComponent } from './familiar-personaje-pr-detail.component';
import { FamiliarPersonajePrPopupComponent } from './familiar-personaje-pr-dialog.component';
import { FamiliarPersonajePrDeletePopupComponent } from './familiar-personaje-pr-delete-dialog.component';

@Injectable()
export class FamiliarPersonajePrResolvePagingParams implements Resolve<any> {

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

export const familiarPersonajeRoute: Routes = [
    {
        path: 'familiar-personaje-pr',
        component: FamiliarPersonajePrComponent,
        resolve: {
            'pagingParams': FamiliarPersonajePrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.familiarPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'familiar-personaje-pr/:id',
        component: FamiliarPersonajePrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.familiarPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const familiarPersonajePopupRoute: Routes = [
    {
        path: 'familiar-personaje-pr-new',
        component: FamiliarPersonajePrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.familiarPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'familiar-personaje-pr/:id/edit',
        component: FamiliarPersonajePrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.familiarPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'familiar-personaje-pr/:id/delete',
        component: FamiliarPersonajePrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.familiarPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
