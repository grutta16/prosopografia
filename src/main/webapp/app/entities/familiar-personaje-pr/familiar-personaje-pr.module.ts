import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProsopografiaSharedModule } from '../../shared';
import {
    FamiliarPersonajePrService,
    FamiliarPersonajePrPopupService,
    FamiliarPersonajePrComponent,
    FamiliarPersonajePrDetailComponent,
    FamiliarPersonajePrDialogComponent,
    FamiliarPersonajePrPopupComponent,
    FamiliarPersonajePrDeletePopupComponent,
    FamiliarPersonajePrDeleteDialogComponent,
    familiarPersonajeRoute,
    familiarPersonajePopupRoute,
    FamiliarPersonajePrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...familiarPersonajeRoute,
    ...familiarPersonajePopupRoute,
];

@NgModule({
    imports: [
        ProsopografiaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FamiliarPersonajePrComponent,
        FamiliarPersonajePrDetailComponent,
        FamiliarPersonajePrDialogComponent,
        FamiliarPersonajePrDeleteDialogComponent,
        FamiliarPersonajePrPopupComponent,
        FamiliarPersonajePrDeletePopupComponent,
    ],
    entryComponents: [
        FamiliarPersonajePrComponent,
        FamiliarPersonajePrDialogComponent,
        FamiliarPersonajePrPopupComponent,
        FamiliarPersonajePrDeleteDialogComponent,
        FamiliarPersonajePrDeletePopupComponent,
    ],
    providers: [
        FamiliarPersonajePrService,
        FamiliarPersonajePrPopupService,
        FamiliarPersonajePrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProsopografiaFamiliarPersonajePrModule {}
