import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { EstudioPersonajePrComponent } from './estudio-personaje-pr.component';
import { EstudioPersonajePrDetailComponent } from './estudio-personaje-pr-detail.component';
import { EstudioPersonajePrPopupComponent } from './estudio-personaje-pr-dialog.component';
import { EstudioPersonajePrDeletePopupComponent } from './estudio-personaje-pr-delete-dialog.component';

@Injectable()
export class EstudioPersonajePrResolvePagingParams implements Resolve<any> {

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

export const estudioPersonajeRoute: Routes = [
    {
        path: 'estudio-personaje-pr',
        component: EstudioPersonajePrComponent,
        resolve: {
            'pagingParams': EstudioPersonajePrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.estudioPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'estudio-personaje-pr/:id',
        component: EstudioPersonajePrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.estudioPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const estudioPersonajePopupRoute: Routes = [
    {
        path: 'estudio-personaje-pr-new',
        component: EstudioPersonajePrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.estudioPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estudio-personaje-pr/:id/edit',
        component: EstudioPersonajePrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.estudioPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estudio-personaje-pr/:id/delete',
        component: EstudioPersonajePrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prosopografiaApp.estudioPersonaje.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
