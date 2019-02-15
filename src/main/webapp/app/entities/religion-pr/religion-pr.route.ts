import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ReligionPrComponent } from './religion-pr.component';
import { ReligionPrDetailComponent } from './religion-pr-detail.component';
import { ReligionPrPopupComponent } from './religion-pr-dialog.component';
import { ReligionPrDeletePopupComponent } from './religion-pr-delete-dialog.component';

@Injectable()
export class ReligionPrResolvePagingParams implements Resolve<any> {

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

export const religionRoute: Routes = [
    {
        path: 'religion-pr',
        component: ReligionPrComponent,
        resolve: {
            'pagingParams': ReligionPrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.religion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'religion-pr/:id',
        component: ReligionPrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.religion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const religionPopupRoute: Routes = [
    {
        path: 'religion-pr-new',
        component: ReligionPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.religion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'religion-pr/:id/edit',
        component: ReligionPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.religion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'religion-pr/:id/delete',
        component: ReligionPrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.religion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
