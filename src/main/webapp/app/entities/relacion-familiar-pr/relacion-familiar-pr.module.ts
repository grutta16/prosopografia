import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProsopografiaSharedModule } from '../../shared';
import {
    RelacionFamiliarPrService,
    RelacionFamiliarPrPopupService,
    RelacionFamiliarPrComponent,
    RelacionFamiliarPrDetailComponent,
    RelacionFamiliarPrDialogComponent,
    RelacionFamiliarPrPopupComponent,
    RelacionFamiliarPrDeletePopupComponent,
    RelacionFamiliarPrDeleteDialogComponent,
    relacionFamiliarRoute,
    relacionFamiliarPopupRoute,
    RelacionFamiliarPrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...relacionFamiliarRoute,
    ...relacionFamiliarPopupRoute,
];

@NgModule({
    imports: [
        ProsopografiaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RelacionFamiliarPrComponent,
        RelacionFamiliarPrDetailComponent,
        RelacionFamiliarPrDialogComponent,
        RelacionFamiliarPrDeleteDialogComponent,
        RelacionFamiliarPrPopupComponent,
        RelacionFamiliarPrDeletePopupComponent,
    ],
    entryComponents: [
        RelacionFamiliarPrComponent,
        RelacionFamiliarPrDialogComponent,
        RelacionFamiliarPrPopupComponent,
        RelacionFamiliarPrDeleteDialogComponent,
        RelacionFamiliarPrDeletePopupComponent,
    ],
    providers: [
        RelacionFamiliarPrService,
        RelacionFamiliarPrPopupService,
        RelacionFamiliarPrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProsopografiaRelacionFamiliarPrModule {}
