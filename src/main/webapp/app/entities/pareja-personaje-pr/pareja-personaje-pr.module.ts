import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProsopografiaSharedModule } from '../../shared';
import {
    ParejaPersonajePrService,
    ParejaPersonajePrPopupService,
    ParejaPersonajePrComponent,
    ParejaPersonajePrDetailComponent,
    ParejaPersonajePrDialogComponent,
    ParejaPersonajePrPopupComponent,
    ParejaPersonajePrDeletePopupComponent,
    ParejaPersonajePrDeleteDialogComponent,
    parejaPersonajeRoute,
    parejaPersonajePopupRoute,
    ParejaPersonajePrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...parejaPersonajeRoute,
    ...parejaPersonajePopupRoute,
];

@NgModule({
    imports: [
        ProsopografiaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ParejaPersonajePrComponent,
        ParejaPersonajePrDetailComponent,
        ParejaPersonajePrDialogComponent,
        ParejaPersonajePrDeleteDialogComponent,
        ParejaPersonajePrPopupComponent,
        ParejaPersonajePrDeletePopupComponent,
    ],
    entryComponents: [
        ParejaPersonajePrComponent,
        ParejaPersonajePrDialogComponent,
        ParejaPersonajePrPopupComponent,
        ParejaPersonajePrDeleteDialogComponent,
        ParejaPersonajePrDeletePopupComponent,
    ],
    providers: [
        ParejaPersonajePrService,
        ParejaPersonajePrPopupService,
        ParejaPersonajePrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProsopografiaParejaPersonajePrModule {}
