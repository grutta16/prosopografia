import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PartidoPrComponent } from './partido-pr.component';
import { PartidoPrDetailComponent } from './partido-pr-detail.component';
import { PartidoPrPopupComponent } from './partido-pr-dialog.component';
import { PartidoPrDeletePopupComponent } from './partido-pr-delete-dialog.component';

@Injectable()
export class PartidoPrResolvePagingParams implements Resolve<any> {

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

export const partidoRoute: Routes = [
    {
        path: 'partido-pr',
        component: PartidoPrComponent,
        resolve: {
            'pagingParams': PartidoPrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.partido.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'partido-pr/:id',
        component: PartidoPrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.partido.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const partidoPopupRoute: Routes = [
    {
        path: 'partido-pr-new',
        component: PartidoPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.partido.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'partido-pr/:id/edit',
        component: PartidoPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.partido.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'partido-pr/:id/delete',
        component: PartidoPrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.partido.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
