import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProsopografiaSharedModule } from '../../shared';
import {
    PartidoPersonajePrService,
    PartidoPersonajePrPopupService,
    PartidoPersonajePrComponent,
    PartidoPersonajePrDetailComponent,
    PartidoPersonajePrDialogComponent,
    PartidoPersonajePrPopupComponent,
    PartidoPersonajePrDeletePopupComponent,
    PartidoPersonajePrDeleteDialogComponent,
    partidoPersonajeRoute,
    partidoPersonajePopupRoute,
    PartidoPersonajePrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...partidoPersonajeRoute,
    ...partidoPersonajePopupRoute,
];

@NgModule({
    imports: [
        ProsopografiaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PartidoPersonajePrComponent,
        PartidoPersonajePrDetailComponent,
        PartidoPersonajePrDialogComponent,
        PartidoPersonajePrDeleteDialogComponent,
        PartidoPersonajePrPopupComponent,
        PartidoPersonajePrDeletePopupComponent,
    ],
    entryComponents: [
        PartidoPersonajePrComponent,
        PartidoPersonajePrDialogComponent,
        PartidoPersonajePrPopupComponent,
        PartidoPersonajePrDeleteDialogComponent,
        PartidoPersonajePrDeletePopupComponent,
    ],
    providers: [
        PartidoPersonajePrService,
        PartidoPersonajePrPopupService,
        PartidoPersonajePrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProsopografiaPartidoPersonajePrModule {}
