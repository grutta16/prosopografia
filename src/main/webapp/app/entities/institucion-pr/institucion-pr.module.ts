import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProsopografiaSharedModule } from '../../shared';
import {
    InstitucionPrService,
    InstitucionPrPopupService,
    InstitucionPrComponent,
    InstitucionPrDetailComponent,
    InstitucionPrDialogComponent,
    InstitucionPrPopupComponent,
    InstitucionPrDeletePopupComponent,
    InstitucionPrDeleteDialogComponent,
    institucionRoute,
    institucionPopupRoute,
    InstitucionPrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...institucionRoute,
    ...institucionPopupRoute,
];

@NgModule({
    imports: [
        ProsopografiaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InstitucionPrComponent,
        InstitucionPrDetailComponent,
        InstitucionPrDialogComponent,
        InstitucionPrDeleteDialogComponent,
        InstitucionPrPopupComponent,
        InstitucionPrDeletePopupComponent,
    ],
    entryComponents: [
        InstitucionPrComponent,
        InstitucionPrDialogComponent,
        InstitucionPrPopupComponent,
        InstitucionPrDeleteDialogComponent,
        InstitucionPrDeletePopupComponent,
    ],
    providers: [
        InstitucionPrService,
        InstitucionPrPopupService,
        InstitucionPrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProsopografiaInstitucionPrModule {}
