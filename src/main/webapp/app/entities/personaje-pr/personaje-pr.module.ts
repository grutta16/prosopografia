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
    ],
    entryComponents: [
        PersonajePrComponent,
        PersonajePrDialogComponent,
        PersonajePrPopupComponent,
        PersonajePrDeleteDialogComponent,
        PersonajePrDeletePopupComponent,
    ],
    providers: [
        PersonajePrService,
        PersonajePrPopupService,
        PersonajePrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProsopografiaPersonajePrModule {}
