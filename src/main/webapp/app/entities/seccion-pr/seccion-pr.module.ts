import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProsopografiaSharedModule } from '../../shared';
import {
    SeccionPrService,
    SeccionPrPopupService,
    SeccionPrComponent,
    SeccionPrDetailComponent,
    SeccionPrDialogComponent,
    SeccionPrPopupComponent,
    SeccionPrDeletePopupComponent,
    SeccionPrDeleteDialogComponent,
    seccionRoute,
    seccionPopupRoute,
    SeccionPrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...seccionRoute,
    ...seccionPopupRoute,
];

@NgModule({
    imports: [
        ProsopografiaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SeccionPrComponent,
        SeccionPrDetailComponent,
        SeccionPrDialogComponent,
        SeccionPrDeleteDialogComponent,
        SeccionPrPopupComponent,
        SeccionPrDeletePopupComponent,
    ],
    entryComponents: [
        SeccionPrComponent,
        SeccionPrDialogComponent,
        SeccionPrPopupComponent,
        SeccionPrDeleteDialogComponent,
        SeccionPrDeletePopupComponent,
    ],
    providers: [
        SeccionPrService,
        SeccionPrPopupService,
        SeccionPrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProsopografiaSeccionPrModule {}
