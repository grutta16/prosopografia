import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CarreraPrComponent } from './carrera-pr.component';
import { CarreraPrDetailComponent } from './carrera-pr-detail.component';
import { CarreraPrPopupComponent } from './carrera-pr-dialog.component';
import { CarreraPrDeletePopupComponent } from './carrera-pr-delete-dialog.component';

@Injectable()
export class CarreraPrResolvePagingParams implements Resolve<any> {

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

export const carreraRoute: Routes = [
    {
        path: 'carrera-pr',
        component: CarreraPrComponent,
        resolve: {
            'pagingParams': CarreraPrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.carrera.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'carrera-pr/:id',
        component: CarreraPrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.carrera.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const carreraPopupRoute: Routes = [
    {
        path: 'carrera-pr-new',
        component: CarreraPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.carrera.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'carrera-pr/:id/edit',
        component: CarreraPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.carrera.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'carrera-pr/:id/delete',
        component: CarreraPrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.carrera.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
