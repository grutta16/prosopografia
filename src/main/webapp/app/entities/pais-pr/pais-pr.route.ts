import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PaisPrComponent } from './pais-pr.component';
import { PaisPrDetailComponent } from './pais-pr-detail.component';
import { PaisPrPopupComponent } from './pais-pr-dialog.component';
import { PaisPrDeletePopupComponent } from './pais-pr-delete-dialog.component';

@Injectable()
export class PaisPrResolvePagingParams implements Resolve<any> {

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

export const paisRoute: Routes = [
    {
        path: 'pais-pr',
        component: PaisPrComponent,
        resolve: {
            'pagingParams': PaisPrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.pais.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pais-pr/:id',
        component: PaisPrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.pais.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const paisPopupRoute: Routes = [
    {
        path: 'pais-pr-new',
        component: PaisPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.pais.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pais-pr/:id/edit',
        component: PaisPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.pais.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pais-pr/:id/delete',
        component: PaisPrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.pais.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
