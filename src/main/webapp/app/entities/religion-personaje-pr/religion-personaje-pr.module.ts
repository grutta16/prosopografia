import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProsopografiaSharedModule } from '../../shared';
import {
    ReligionPersonajePrService,
    ReligionPersonajePrPopupService,
    ReligionPersonajePrComponent,
    ReligionPersonajePrDetailComponent,
    ReligionPersonajePrDialogComponent,
    ReligionPersonajePrPopupComponent,
    ReligionPersonajePrDeletePopupComponent,
    ReligionPersonajePrDeleteDialogComponent,
    religionPersonajeRoute,
    religionPersonajePopupRoute,
    ReligionPersonajePrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...religionPersonajeRoute,
    ...religionPersonajePopupRoute,
];

@NgModule({
    imports: [
        ProsopografiaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReligionPersonajePrComponent,
        ReligionPersonajePrDetailComponent,
        ReligionPersonajePrDialogComponent,
        ReligionPersonajePrDeleteDialogComponent,
        ReligionPersonajePrPopupComponent,
        ReligionPersonajePrDeletePopupComponent,
    ],
    entryComponents: [
        ReligionPersonajePrComponent,
        ReligionPersonajePrDialogComponent,
        ReligionPersonajePrPopupComponent,
        ReligionPersonajePrDeleteDialogComponent,
        ReligionPersonajePrDeletePopupComponent,
    ],
    providers: [
        ReligionPersonajePrService,
        ReligionPersonajePrPopupService,
        ReligionPersonajePrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProsopografiaReligionPersonajePrModule {}
