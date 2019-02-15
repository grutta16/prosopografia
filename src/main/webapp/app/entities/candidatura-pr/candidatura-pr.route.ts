import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CandidaturaPrComponent } from './candidatura-pr.component';
import { CandidaturaPrDetailComponent } from './candidatura-pr-detail.component';
import { CandidaturaPrPopupComponent } from './candidatura-pr-dialog.component';
import { CandidaturaPrDeletePopupComponent } from './candidatura-pr-delete-dialog.component';

@Injectable()
export class CandidaturaPrResolvePagingParams implements Resolve<any> {

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

export const candidaturaRoute: Routes = [
    {
        path: 'candidatura-pr',
        component: CandidaturaPrComponent,
        resolve: {
            'pagingParams': CandidaturaPrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.candidatura.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'candidatura-pr/:id',
        component: CandidaturaPrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.candidatura.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const candidaturaPopupRoute: Routes = [
    {
        path: 'candidatura-pr-new',
        component: CandidaturaPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.candidatura.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'candidatura-pr/:id/edit',
        component: CandidaturaPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.candidatura.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'candidatura-pr/:id/delete',
        component: CandidaturaPrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.candidatura.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
