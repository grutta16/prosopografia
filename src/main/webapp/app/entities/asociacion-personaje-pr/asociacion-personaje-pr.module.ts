import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProsopografiaSharedModule } from '../../shared';
import {
    AsociacionPersonajePrService,
    AsociacionPersonajePrPopupService,
    AsociacionPersonajePrComponent,
    AsociacionPersonajePrDetailComponent,
    AsociacionPersonajePrDialogComponent,
    AsociacionPersonajePrPopupComponent,
    AsociacionPersonajePrDeletePopupComponent,
    AsociacionPersonajePrDeleteDialogComponent,
    asociacionPersonajeRoute,
    asociacionPersonajePopupRoute,
    AsociacionPersonajePrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...asociacionPersonajeRoute,
    ...asociacionPersonajePopupRoute,
];

@NgModule({
    imports: [
        ProsopografiaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AsociacionPersonajePrComponent,
        AsociacionPersonajePrDetailComponent,
        AsociacionPersonajePrDialogComponent,
        AsociacionPersonajePrDeleteDialogComponent,
        AsociacionPersonajePrPopupComponent,
        AsociacionPersonajePrDeletePopupComponent,
    ],
    entryComponents: [
        AsociacionPersonajePrComponent,
        AsociacionPersonajePrDialogComponent,
        AsociacionPersonajePrPopupComponent,
        AsociacionPersonajePrDeleteDialogComponent,
        AsociacionPersonajePrDeletePopupComponent,
    ],
    providers: [
        AsociacionPersonajePrService,
        AsociacionPersonajePrPopupService,
        AsociacionPersonajePrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProsopografiaAsociacionPersonajePrModule {}
