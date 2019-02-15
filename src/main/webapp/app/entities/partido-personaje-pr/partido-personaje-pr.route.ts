import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PartidoPersonajePrComponent } from './partido-personaje-pr.component';
import { PartidoPersonajePrDetailComponent } from './partido-personaje-pr-detail.component';
import { PartidoPersonajePrPopupComponent } from './partido-personaje-pr-dialog.component';
import { PartidoPersonajePrDeletePopupComponent } from './partido-personaje-pr-delete-dialog.component';

@Injectable()
export class PartidoPersonajePrResolvePagingParams implements Resolve<any> {

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

export const partidoPersonajeRoute: Routes = [
    {
        path: 'partido-personaje-pr',
        component: PartidoPersonajePrComponent,
        resolve: {
            'pagingParams': PartidoPersonajePrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.partidoPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'partido-personaje-pr/:id',
        component: PartidoPersonajePrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.partidoPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const partidoPersonajePopupRoute: Routes = [
    {
        path: 'partido-personaje-pr-new',
        component: PartidoPersonajePrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.partidoPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'partido-personaje-pr/:id/edit',
        component: PartidoPersonajePrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.partidoPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'partido-personaje-pr/:id/delete',
        component: PartidoPersonajePrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.partidoPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
