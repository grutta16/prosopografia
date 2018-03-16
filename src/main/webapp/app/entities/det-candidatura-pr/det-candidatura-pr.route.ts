import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { DetCandidaturaPrComponent } from './det-candidatura-pr.component';
import { DetCandidaturaPrDetailComponent } from './det-candidatura-pr-detail.component';
import { DetCandidaturaPrPopupComponent } from './det-candidatura-pr-dialog.component';
import { DetCandidaturaPrDeletePopupComponent } from './det-candidatura-pr-delete-dialog.component';

@Injectable()
export class DetCandidaturaPrResolvePagingParams implements Resolve<any> {

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

export const detCandidaturaRoute: Routes = [
    {
        path: 'det-candidatura-pr',
        component: DetCandidaturaPrComponent,
        resolve: {
            'pagingParams': DetCandidaturaPrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.detCandidatura.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'det-candidatura-pr/:id',
        component: DetCandidaturaPrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.detCandidatura.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const detCandidaturaPopupRoute: Routes = [
    {
        path: 'det-candidatura-pr-new',
        component: DetCandidaturaPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.detCandidatura.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'det-candidatura-pr/:id/edit',
        component: DetCandidaturaPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.detCandidatura.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'det-candidatura-pr/:id/delete',
        component: DetCandidaturaPrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.detCandidatura.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
