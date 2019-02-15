import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { AsociacionPrComponent } from './asociacion-pr.component';
import { AsociacionPrDetailComponent } from './asociacion-pr-detail.component';
import { AsociacionPrPopupComponent } from './asociacion-pr-dialog.component';
import { AsociacionPrDeletePopupComponent } from './asociacion-pr-delete-dialog.component';

@Injectable()
export class AsociacionPrResolvePagingParams implements Resolve<any> {

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

export const asociacionRoute: Routes = [
    {
        path: 'asociacion-pr',
        component: AsociacionPrComponent,
        resolve: {
            'pagingParams': AsociacionPrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.asociacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'asociacion-pr/:id',
        component: AsociacionPrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.asociacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const asociacionPopupRoute: Routes = [
    {
        path: 'asociacion-pr-new',
        component: AsociacionPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.asociacion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'asociacion-pr/:id/edit',
        component: AsociacionPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.asociacion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'asociacion-pr/:id/delete',
        component: AsociacionPrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.asociacion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
