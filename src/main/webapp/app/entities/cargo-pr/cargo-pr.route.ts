import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CargoPrComponent } from './cargo-pr.component';
import { CargoPrDetailComponent } from './cargo-pr-detail.component';
import { CargoPrPopupComponent } from './cargo-pr-dialog.component';
import { CargoPrDeletePopupComponent } from './cargo-pr-delete-dialog.component';

@Injectable()
export class CargoPrResolvePagingParams implements Resolve<any> {

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

export const cargoRoute: Routes = [
    {
        path: 'cargo-pr',
        component: CargoPrComponent,
        resolve: {
            'pagingParams': CargoPrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.cargo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cargo-pr/:id',
        component: CargoPrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.cargo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cargoPopupRoute: Routes = [
    {
        path: 'cargo-pr-new',
        component: CargoPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.cargo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cargo-pr/:id/edit',
        component: CargoPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.cargo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cargo-pr/:id/delete',
        component: CargoPrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.cargo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
