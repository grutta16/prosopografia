import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProsopografiaSharedModule } from '../../shared';
import {
    CargoPrService,
    CargoPrPopupService,
    CargoPrComponent,
    CargoPrDetailComponent,
    CargoPrDialogComponent,
    CargoPrPopupComponent,
    CargoPrDeletePopupComponent,
    CargoPrDeleteDialogComponent,
    cargoRoute,
    cargoPopupRoute,
    CargoPrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...cargoRoute,
    ...cargoPopupRoute,
];

@NgModule({
    imports: [
        ProsopografiaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CargoPrComponent,
        CargoPrDetailComponent,
        CargoPrDialogComponent,
        CargoPrDeleteDialogComponent,
        CargoPrPopupComponent,
        CargoPrDeletePopupComponent,
    ],
    entryComponents: [
        CargoPrComponent,
        CargoPrDialogComponent,
        CargoPrPopupComponent,
        CargoPrDeleteDialogComponent,
        CargoPrDeletePopupComponent,
    ],
    providers: [
        CargoPrService,
        CargoPrPopupService,
        CargoPrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProsopografiaCargoPrModule {}
