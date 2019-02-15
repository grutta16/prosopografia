import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProsopografiaSharedModule } from '../../shared';
import {
    CarreraPrService,
    CarreraPrPopupService,
    CarreraPrComponent,
    CarreraPrDetailComponent,
    CarreraPrDialogComponent,
    CarreraPrPopupComponent,
    CarreraPrDeletePopupComponent,
    CarreraPrDeleteDialogComponent,
    carreraRoute,
    carreraPopupRoute,
    CarreraPrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...carreraRoute,
    ...carreraPopupRoute,
];

@NgModule({
    imports: [
        ProsopografiaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CarreraPrComponent,
        CarreraPrDetailComponent,
        CarreraPrDialogComponent,
        CarreraPrDeleteDialogComponent,
        CarreraPrPopupComponent,
        CarreraPrDeletePopupComponent,
    ],
    entryComponents: [
        CarreraPrComponent,
        CarreraPrDialogComponent,
        CarreraPrPopupComponent,
        CarreraPrDeleteDialogComponent,
        CarreraPrDeletePopupComponent,
    ],
    providers: [
        CarreraPrService,
        CarreraPrPopupService,
        CarreraPrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProsopografiaCarreraPrModule {}
