import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProsopografiaSharedModule } from '../../shared';
import {
    ResidenciaPersonajePrService,
    ResidenciaPersonajePrPopupService,
    ResidenciaPersonajePrComponent,
    ResidenciaPersonajePrDetailComponent,
    ResidenciaPersonajePrDialogComponent,
    ResidenciaPersonajePrPopupComponent,
    ResidenciaPersonajePrDeletePopupComponent,
    ResidenciaPersonajePrDeleteDialogComponent,
    residenciaPersonajeRoute,
    residenciaPersonajePopupRoute,
    ResidenciaPersonajePrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...residenciaPersonajeRoute,
    ...residenciaPersonajePopupRoute,
];

@NgModule({
    imports: [
        ProsopografiaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ResidenciaPersonajePrComponent,
        ResidenciaPersonajePrDetailComponent,
        ResidenciaPersonajePrDialogComponent,
        ResidenciaPersonajePrDeleteDialogComponent,
        ResidenciaPersonajePrPopupComponent,
        ResidenciaPersonajePrDeletePopupComponent,
    ],
    entryComponents: [
        ResidenciaPersonajePrComponent,
        ResidenciaPersonajePrDialogComponent,
        ResidenciaPersonajePrPopupComponent,
        ResidenciaPersonajePrDeleteDialogComponent,
        ResidenciaPersonajePrDeletePopupComponent,
    ],
    providers: [
        ResidenciaPersonajePrService,
        ResidenciaPersonajePrPopupService,
        ResidenciaPersonajePrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProsopografiaResidenciaPersonajePrModule {}
