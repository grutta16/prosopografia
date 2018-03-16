import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ParejaPersonajePrComponent } from './pareja-personaje-pr.component';
import { ParejaPersonajePrDetailComponent } from './pareja-personaje-pr-detail.component';
import { ParejaPersonajePrPopupComponent } from './pareja-personaje-pr-dialog.component';
import { ParejaPersonajePrDeletePopupComponent } from './pareja-personaje-pr-delete-dialog.component';

@Injectable()
export class ParejaPersonajePrResolvePagingParams implements Resolve<any> {

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

export const parejaPersonajeRoute: Routes = [
    {
        path: 'pareja-personaje-pr',
        component: ParejaPersonajePrComponent,
        resolve: {
            'pagingParams': ParejaPersonajePrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.parejaPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pareja-personaje-pr/:id',
        component: ParejaPersonajePrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.parejaPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const parejaPersonajePopupRoute: Routes = [
    {
        path: 'pareja-personaje-pr-new',
        component: ParejaPersonajePrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.parejaPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pareja-personaje-pr/:id/edit',
        component: ParejaPersonajePrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.parejaPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pareja-personaje-pr/:id/delete',
        component: ParejaPersonajePrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.parejaPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
