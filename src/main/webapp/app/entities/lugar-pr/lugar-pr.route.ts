import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { LugarPrComponent } from './lugar-pr.component';
import { LugarPrDetailComponent } from './lugar-pr-detail.component';
import { LugarPrPopupComponent } from './lugar-pr-dialog.component';
import { LugarPrDeletePopupComponent } from './lugar-pr-delete-dialog.component';

@Injectable()
export class LugarPrResolvePagingParams implements Resolve<any> {

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

export const lugarRoute: Routes = [
    {
        path: 'lugar-pr',
        component: LugarPrComponent,
        resolve: {
            'pagingParams': LugarPrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.lugar.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'lugar-pr/:id',
        component: LugarPrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.lugar.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const lugarPopupRoute: Routes = [
    {
        path: 'lugar-pr-new',
        component: LugarPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.lugar.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lugar-pr/:id/edit',
        component: LugarPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.lugar.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lugar-pr/:id/delete',
        component: LugarPrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.lugar.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
