import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProsopografiaSharedModule } from '../../shared';
import {
    TipoProfesionPrService,
    TipoProfesionPrPopupService,
    TipoProfesionPrComponent,
    TipoProfesionPrDetailComponent,
    TipoProfesionPrDialogComponent,
    TipoProfesionPrPopupComponent,
    TipoProfesionPrDeletePopupComponent,
    TipoProfesionPrDeleteDialogComponent,
    tipoProfesionRoute,
    tipoProfesionPopupRoute,
    TipoProfesionPrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...tipoProfesionRoute,
    ...tipoProfesionPopupRoute,
];

@NgModule({
    imports: [
        ProsopografiaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TipoProfesionPrComponent,
        TipoProfesionPrDetailComponent,
        TipoProfesionPrDialogComponent,
        TipoProfesionPrDeleteDialogComponent,
        TipoProfesionPrPopupComponent,
        TipoProfesionPrDeletePopupComponent,
    ],
    entryComponents: [
        TipoProfesionPrComponent,
        TipoProfesionPrDialogComponent,
        TipoProfesionPrPopupComponent,
        TipoProfesionPrDeleteDialogComponent,
        TipoProfesionPrDeletePopupComponent,
    ],
    providers: [
        TipoProfesionPrService,
        TipoProfesionPrPopupService,
        TipoProfesionPrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProsopografiaTipoProfesionPrModule {}
