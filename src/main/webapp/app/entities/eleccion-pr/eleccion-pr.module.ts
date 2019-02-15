import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProsopografiaSharedModule } from '../../shared';
import {
    EleccionPrService,
    EleccionPrPopupService,
    EleccionPrComponent,
    EleccionPrDetailComponent,
    EleccionPrDialogComponent,
    EleccionPrPopupComponent,
    EleccionPrDeletePopupComponent,
    EleccionPrDeleteDialogComponent,
    eleccionRoute,
    eleccionPopupRoute,
    EleccionPrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...eleccionRoute,
    ...eleccionPopupRoute,
];

@NgModule({
    imports: [
        ProsopografiaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EleccionPrComponent,
        EleccionPrDetailComponent,
        EleccionPrDialogComponent,
        EleccionPrDeleteDialogComponent,
        EleccionPrPopupComponent,
        EleccionPrDeletePopupComponent,
    ],
    entryComponents: [
        EleccionPrComponent,
        EleccionPrDialogComponent,
        EleccionPrPopupComponent,
        EleccionPrDeleteDialogComponent,
        EleccionPrDeletePopupComponent,
    ],
    providers: [
        EleccionPrService,
        EleccionPrPopupService,
        EleccionPrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProsopografiaEleccionPrModule {}
