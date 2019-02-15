import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { InstitucionPrComponent } from './institucion-pr.component';
import { InstitucionPrDetailComponent } from './institucion-pr-detail.component';
import { InstitucionPrPopupComponent } from './institucion-pr-dialog.component';
import { InstitucionPrDeletePopupComponent } from './institucion-pr-delete-dialog.component';

@Injectable()
export class InstitucionPrResolvePagingParams implements Resolve<any> {

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

export const institucionRoute: Routes = [
    {
        path: 'institucion-pr',
        component: InstitucionPrComponent,
        resolve: {
            'pagingParams': InstitucionPrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.institucion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'institucion-pr/:id',
        component: InstitucionPrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.institucion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const institucionPopupRoute: Routes = [
    {
        path: 'institucion-pr-new',
        component: InstitucionPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.institucion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'institucion-pr/:id/edit',
        component: InstitucionPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.institucion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'institucion-pr/:id/delete',
        component: InstitucionPrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.institucion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
