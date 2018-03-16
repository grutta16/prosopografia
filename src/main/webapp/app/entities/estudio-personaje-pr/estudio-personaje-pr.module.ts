import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProsopografiaSharedModule } from '../../shared';
import {
    EstudioPersonajePrService,
    EstudioPersonajePrPopupService,
    EstudioPersonajePrComponent,
    EstudioPersonajePrDetailComponent,
    EstudioPersonajePrDialogComponent,
    EstudioPersonajePrPopupComponent,
    EstudioPersonajePrDeletePopupComponent,
    EstudioPersonajePrDeleteDialogComponent,
    estudioPersonajeRoute,
    estudioPersonajePopupRoute,
    EstudioPersonajePrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...estudioPersonajeRoute,
    ...estudioPersonajePopupRoute,
];

@NgModule({
    imports: [
        ProsopografiaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EstudioPersonajePrComponent,
        EstudioPersonajePrDetailComponent,
        EstudioPersonajePrDialogComponent,
        EstudioPersonajePrDeleteDialogComponent,
        EstudioPersonajePrPopupComponent,
        EstudioPersonajePrDeletePopupComponent,
    ],
    entryComponents: [
        EstudioPersonajePrComponent,
        EstudioPersonajePrDialogComponent,
        EstudioPersonajePrPopupComponent,
        EstudioPersonajePrDeleteDialogComponent,
        EstudioPersonajePrDeletePopupComponent,
    ],
    providers: [
        EstudioPersonajePrService,
        EstudioPersonajePrPopupService,
        EstudioPersonajePrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProsopografiaEstudioPersonajePrModule {}
