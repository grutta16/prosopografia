import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProsopografiaSharedModule } from '../../shared';
import {
    CargoPersonajePrService,
    CargoPersonajePrPopupService,
    CargoPersonajePrComponent,
    CargoPersonajePrDetailComponent,
    CargoPersonajePrDialogComponent,
    CargoPersonajePrPopupComponent,
    CargoPersonajePrDeletePopupComponent,
    CargoPersonajePrDeleteDialogComponent,
    cargoPersonajeRoute,
    cargoPersonajePopupRoute,
    CargoPersonajePrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...cargoPersonajeRoute,
    ...cargoPersonajePopupRoute,
];

@NgModule({
    imports: [
        ProsopografiaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CargoPersonajePrComponent,
        CargoPersonajePrDetailComponent,
        CargoPersonajePrDialogComponent,
        CargoPersonajePrDeleteDialogComponent,
        CargoPersonajePrPopupComponent,
        CargoPersonajePrDeletePopupComponent,
    ],
    entryComponents: [
        CargoPersonajePrComponent,
        CargoPersonajePrDialogComponent,
        CargoPersonajePrPopupComponent,
        CargoPersonajePrDeleteDialogComponent,
        CargoPersonajePrDeletePopupComponent,
    ],
    providers: [
        CargoPersonajePrService,
        CargoPersonajePrPopupService,
        CargoPersonajePrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProsopografiaCargoPersonajePrModule {}
