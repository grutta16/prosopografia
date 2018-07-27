import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProsopografiaSharedModule } from '../../shared';
import {
    PersonajePrService,
    PersonajePrPopupService,
    PersonajePrComponent,
    PersonajePrDetailComponent,
    PersonajePrDialogComponent,
    PersonajePrPopupComponent,
    PersonajePrDeletePopupComponent,
    PersonajePrDeleteDialogComponent,
    personajeRoute,
    personajePopupRoute,
    PersonajePrResolvePagingParams,
    DatosPersonalesComponent,
} from './';

const ENTITY_STATES = [
    ...personajeRoute,
    ...personajePopupRoute,
];

@NgModule({
    imports: [
        ProsopografiaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PersonajePrComponent,
        PersonajePrDetailComponent,
        PersonajePrDialogComponent,
        PersonajePrDeleteDialogComponent,
        PersonajePrPopupComponent,
        PersonajePrDeletePopupComponent,
        DatosPersonalesComponent,
    ],
    entryComponents: [
        PersonajePrComponent,
        PersonajePrDialogComponent,
        PersonajePrPopupComponent,
        PersonajePrDeleteDialogComponent,
        PersonajePrDeletePopupComponent,
        DatosPersonalesComponent,
    ],
    providers: [
        PersonajePrService,
        PersonajePrPopupService,
        PersonajePrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProsopografiaPersonajePrModule {}
