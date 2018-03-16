import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { SeccionPrComponent } from './seccion-pr.component';
import { SeccionPrDetailComponent } from './seccion-pr-detail.component';
import { SeccionPrPopupComponent } from './seccion-pr-dialog.component';
import { SeccionPrDeletePopupComponent } from './seccion-pr-delete-dialog.component';

@Injectable()
export class SeccionPrResolvePagingParams implements Resolve<any> {

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

export const seccionRoute: Routes = [
    {
        path: 'seccion-pr',
        component: SeccionPrComponent,
        resolve: {
            'pagingParams': SeccionPrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.seccion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'seccion-pr/:id',
        component: SeccionPrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.seccion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const seccionPopupRoute: Routes = [
    {
        path: 'seccion-pr-new',
        component: SeccionPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.seccion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'seccion-pr/:id/edit',
        component: SeccionPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.seccion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'seccion-pr/:id/delete',
        component: SeccionPrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.seccion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
