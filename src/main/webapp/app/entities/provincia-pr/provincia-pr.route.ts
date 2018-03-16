import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ProvinciaPrComponent } from './provincia-pr.component';
import { ProvinciaPrDetailComponent } from './provincia-pr-detail.component';
import { ProvinciaPrPopupComponent } from './provincia-pr-dialog.component';
import { ProvinciaPrDeletePopupComponent } from './provincia-pr-delete-dialog.component';

@Injectable()
export class ProvinciaPrResolvePagingParams implements Resolve<any> {

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

export const provinciaRoute: Routes = [
    {
        path: 'provincia-pr',
        component: ProvinciaPrComponent,
        resolve: {
            'pagingParams': ProvinciaPrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.provincia.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'provincia-pr/:id',
        component: ProvinciaPrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.provincia.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const provinciaPopupRoute: Routes = [
    {
        path: 'provincia-pr-new',
        component: ProvinciaPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.provincia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'provincia-pr/:id/edit',
        component: ProvinciaPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.provincia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'provincia-pr/:id/delete',
        component: ProvinciaPrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.provincia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
