import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ResidenciaPersonajePrComponent } from './residencia-personaje-pr.component';
import { ResidenciaPersonajePrDetailComponent } from './residencia-personaje-pr-detail.component';
import { ResidenciaPersonajePrPopupComponent } from './residencia-personaje-pr-dialog.component';
import { ResidenciaPersonajePrDeletePopupComponent } from './residencia-personaje-pr-delete-dialog.component';

@Injectable()
export class ResidenciaPersonajePrResolvePagingParams implements Resolve<any> {

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

export const residenciaPersonajeRoute: Routes = [
    {
        path: 'residencia-personaje-pr',
        component: ResidenciaPersonajePrComponent,
        resolve: {
            'pagingParams': ResidenciaPersonajePrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.residenciaPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'residencia-personaje-pr/:id',
        component: ResidenciaPersonajePrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.residenciaPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const residenciaPersonajePopupRoute: Routes = [
    {
        path: 'residencia-personaje-pr-new',
        component: ResidenciaPersonajePrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.residenciaPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'residencia-personaje-pr/:id/edit',
        component: ResidenciaPersonajePrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.residenciaPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'residencia-personaje-pr/:id/delete',
        component: ResidenciaPersonajePrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.residenciaPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
