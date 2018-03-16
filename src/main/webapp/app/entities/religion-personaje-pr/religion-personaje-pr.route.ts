import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ReligionPersonajePrComponent } from './religion-personaje-pr.component';
import { ReligionPersonajePrDetailComponent } from './religion-personaje-pr-detail.component';
import { ReligionPersonajePrPopupComponent } from './religion-personaje-pr-dialog.component';
import { ReligionPersonajePrDeletePopupComponent } from './religion-personaje-pr-delete-dialog.component';

@Injectable()
export class ReligionPersonajePrResolvePagingParams implements Resolve<any> {

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

export const religionPersonajeRoute: Routes = [
    {
        path: 'religion-personaje-pr',
        component: ReligionPersonajePrComponent,
        resolve: {
            'pagingParams': ReligionPersonajePrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.religionPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'religion-personaje-pr/:id',
        component: ReligionPersonajePrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.religionPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const religionPersonajePopupRoute: Routes = [
    {
        path: 'religion-personaje-pr-new',
        component: ReligionPersonajePrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.religionPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'religion-personaje-pr/:id/edit',
        component: ReligionPersonajePrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.religionPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'religion-personaje-pr/:id/delete',
        component: ReligionPersonajePrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.religionPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
