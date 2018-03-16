import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ProfesionPrComponent } from './profesion-pr.component';
import { ProfesionPrDetailComponent } from './profesion-pr-detail.component';
import { ProfesionPrPopupComponent } from './profesion-pr-dialog.component';
import { ProfesionPrDeletePopupComponent } from './profesion-pr-delete-dialog.component';

@Injectable()
export class ProfesionPrResolvePagingParams implements Resolve<any> {

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

export const profesionRoute: Routes = [
    {
        path: 'profesion-pr',
        component: ProfesionPrComponent,
        resolve: {
            'pagingParams': ProfesionPrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.profesion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'profesion-pr/:id',
        component: ProfesionPrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.profesion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const profesionPopupRoute: Routes = [
    {
        path: 'profesion-pr-new',
        component: ProfesionPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.profesion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'profesion-pr/:id/edit',
        component: ProfesionPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.profesion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'profesion-pr/:id/delete',
        component: ProfesionPrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.profesion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
