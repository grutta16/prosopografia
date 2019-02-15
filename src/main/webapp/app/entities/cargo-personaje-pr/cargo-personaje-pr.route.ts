import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CargoPersonajePrComponent } from './cargo-personaje-pr.component';
import { CargoPersonajePrDetailComponent } from './cargo-personaje-pr-detail.component';
import { CargoPersonajePrPopupComponent } from './cargo-personaje-pr-dialog.component';
import { CargoPersonajePrDeletePopupComponent } from './cargo-personaje-pr-delete-dialog.component';

@Injectable()
export class CargoPersonajePrResolvePagingParams implements Resolve<any> {

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

export const cargoPersonajeRoute: Routes = [
    {
        path: 'cargo-personaje-pr',
        component: CargoPersonajePrComponent,
        resolve: {
            'pagingParams': CargoPersonajePrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.cargoPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cargo-personaje-pr/:id',
        component: CargoPersonajePrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.cargoPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cargoPersonajePopupRoute: Routes = [
    {
        path: 'cargo-personaje-pr-new',
        component: CargoPersonajePrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.cargoPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cargo-personaje-pr/:id/edit',
        component: CargoPersonajePrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.cargoPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cargo-personaje-pr/:id/delete',
        component: CargoPersonajePrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.cargoPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
