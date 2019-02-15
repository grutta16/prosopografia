import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProsopografiaSharedModule } from '../../shared';
import {
    DetCandidaturaPrService,
    DetCandidaturaPrPopupService,
    DetCandidaturaPrComponent,
    DetCandidaturaPrDetailComponent,
    DetCandidaturaPrDialogComponent,
    DetCandidaturaPrPopupComponent,
    DetCandidaturaPrDeletePopupComponent,
    DetCandidaturaPrDeleteDialogComponent,
    detCandidaturaRoute,
    detCandidaturaPopupRoute,
    DetCandidaturaPrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...detCandidaturaRoute,
    ...detCandidaturaPopupRoute,
];

@NgModule({
    imports: [
        ProsopografiaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DetCandidaturaPrComponent,
        DetCandidaturaPrDetailComponent,
        DetCandidaturaPrDialogComponent,
        DetCandidaturaPrDeleteDialogComponent,
        DetCandidaturaPrPopupComponent,
        DetCandidaturaPrDeletePopupComponent,
    ],
    entryComponents: [
        DetCandidaturaPrComponent,
        DetCandidaturaPrDialogComponent,
        DetCandidaturaPrPopupComponent,
        DetCandidaturaPrDeleteDialogComponent,
        DetCandidaturaPrDeletePopupComponent,
    ],
    providers: [
        DetCandidaturaPrService,
        DetCandidaturaPrPopupService,
        DetCandidaturaPrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProsopografiaDetCandidaturaPrModule {}
