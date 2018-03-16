import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { TipoProfesionPrComponent } from './tipo-profesion-pr.component';
import { TipoProfesionPrDetailComponent } from './tipo-profesion-pr-detail.component';
import { TipoProfesionPrPopupComponent } from './tipo-profesion-pr-dialog.component';
import { TipoProfesionPrDeletePopupComponent } from './tipo-profesion-pr-delete-dialog.component';

@Injectable()
export class TipoProfesionPrResolvePagingParams implements Resolve<any> {

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

export const tipoProfesionRoute: Routes = [
    {
        path: 'tipo-profesion-pr',
        component: TipoProfesionPrComponent,
        resolve: {
            'pagingParams': TipoProfesionPrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.tipoProfesion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipo-profesion-pr/:id',
        component: TipoProfesionPrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.tipoProfesion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoProfesionPopupRoute: Routes = [
    {
        path: 'tipo-profesion-pr-new',
        component: TipoProfesionPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.tipoProfesion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-profesion-pr/:id/edit',
        component: TipoProfesionPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.tipoProfesion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-profesion-pr/:id/delete',
        component: TipoProfesionPrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.tipoProfesion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
