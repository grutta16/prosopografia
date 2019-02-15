import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { AsociacionPersonajePrComponent } from './asociacion-personaje-pr.component';
import { AsociacionPersonajePrDetailComponent } from './asociacion-personaje-pr-detail.component';
import { AsociacionPersonajePrPopupComponent } from './asociacion-personaje-pr-dialog.component';
import { AsociacionPersonajePrDeletePopupComponent } from './asociacion-personaje-pr-delete-dialog.component';

@Injectable()
export class AsociacionPersonajePrResolvePagingParams implements Resolve<any> {

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

export const asociacionPersonajeRoute: Routes = [
    {
        path: 'asociacion-personaje-pr',
        component: AsociacionPersonajePrComponent,
        resolve: {
            'pagingParams': AsociacionPersonajePrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.asociacionPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'asociacion-personaje-pr/:id',
        component: AsociacionPersonajePrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.asociacionPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const asociacionPersonajePopupRoute: Routes = [
    {
        path: 'asociacion-personaje-pr-new',
        component: AsociacionPersonajePrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.asociacionPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'asociacion-personaje-pr/:id/edit',
        component: AsociacionPersonajePrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.asociacionPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'asociacion-personaje-pr/:id/delete',
        component: AsociacionPersonajePrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.asociacionPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
