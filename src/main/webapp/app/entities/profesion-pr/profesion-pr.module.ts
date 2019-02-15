import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProsopografiaSharedModule } from '../../shared';
import {
    ProfesionPrService,
    ProfesionPrPopupService,
    ProfesionPrComponent,
    ProfesionPrDetailComponent,
    ProfesionPrDialogComponent,
    ProfesionPrPopupComponent,
    ProfesionPrDeletePopupComponent,
    ProfesionPrDeleteDialogComponent,
    profesionRoute,
    profesionPopupRoute,
    ProfesionPrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...profesionRoute,
    ...profesionPopupRoute,
];

@NgModule({
    imports: [
        ProsopografiaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProfesionPrComponent,
        ProfesionPrDetailComponent,
        ProfesionPrDialogComponent,
        ProfesionPrDeleteDialogComponent,
        ProfesionPrPopupComponent,
        ProfesionPrDeletePopupComponent,
    ],
    entryComponents: [
        ProfesionPrComponent,
        ProfesionPrDialogComponent,
        ProfesionPrPopupComponent,
        ProfesionPrDeleteDialogComponent,
        ProfesionPrDeletePopupComponent,
    ],
    providers: [
        ProfesionPrService,
        ProfesionPrPopupService,
        ProfesionPrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProsopografiaProfesionPrModule {}
