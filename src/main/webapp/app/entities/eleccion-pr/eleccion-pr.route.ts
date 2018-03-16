import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { EleccionPrComponent } from './eleccion-pr.component';
import { EleccionPrDetailComponent } from './eleccion-pr-detail.component';
import { EleccionPrPopupComponent } from './eleccion-pr-dialog.component';
import { EleccionPrDeletePopupComponent } from './eleccion-pr-delete-dialog.component';

@Injectable()
export class EleccionPrResolvePagingParams implements Resolve<any> {

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

export const eleccionRoute: Routes = [
    {
        path: 'eleccion-pr',
        component: EleccionPrComponent,
        resolve: {
            'pagingParams': EleccionPrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.eleccion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'eleccion-pr/:id',
        component: EleccionPrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.eleccion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const eleccionPopupRoute: Routes = [
    {
        path: 'eleccion-pr-new',
        component: EleccionPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.eleccion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'eleccion-pr/:id/edit',
        component: EleccionPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.eleccion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'eleccion-pr/:id/delete',
        component: EleccionPrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.eleccion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
