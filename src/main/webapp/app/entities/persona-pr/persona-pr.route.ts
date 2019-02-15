import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PersonaPrComponent } from './persona-pr.component';
import { PersonaPrDetailComponent } from './persona-pr-detail.component';
import { PersonaPrPopupComponent } from './persona-pr-dialog.component';
import { PersonaPrDeletePopupComponent } from './persona-pr-delete-dialog.component';

@Injectable()
export class PersonaPrResolvePagingParams implements Resolve<any> {

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

export const personaRoute: Routes = [
    {
        path: 'persona-pr',
        component: PersonaPrComponent,
        resolve: {
            'pagingParams': PersonaPrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.persona.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'persona-pr/:id',
        component: PersonaPrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.persona.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const personaPopupRoute: Routes = [
    {
        path: 'persona-pr-new',
        component: PersonaPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.persona.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'persona-pr/:id/edit',
        component: PersonaPrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.persona.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'persona-pr/:id/delete',
        component: PersonaPrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.persona.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
