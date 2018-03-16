import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { RelacionFamiliarPrComponent } from './relacion-familiar-pr.component';
import { RelacionFamiliarPrDetailComponent } from './relacion-familiar-pr-detail.component';
import { RelacionFamiliarPrPopupComponent } from './relacion-familiar-pr-dialog.component';
import { RelacionFamiliarPrDeletePopupComponent } from './relacion-familiar-pr-delete-dialog.component';

@Injectable()
export class RelacionFamiliarPrResolvePagingParams implements Resolve<any> {

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

export const relacionFamiliarRoute: Routes = [
    {
        path: 'relacion-familiar-pr',
        component: RelacionFamiliarPrComponent,
        resolve: {
            'pagingParams': RelacionFamiliarPrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.relacionFamiliar.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'relacion-familiar-pr/:id',
        component: RelacionFamiliarPrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.relacionFamiliar.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const relacionFamiliarPopupRoute: Routes = [
    {
        path: 'relacion-familiar-pr-new',
        component: RelacionFamiliarPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.relacionFamiliar.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'relacion-familiar-pr/:id/edit',
        component: RelacionFamiliarPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.relacionFamiliar.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'relacion-familiar-pr/:id/delete',
        component: RelacionFamiliarPrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.relacionFamiliar.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
