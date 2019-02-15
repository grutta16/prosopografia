import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProsopografiaSharedModule } from '../../shared';
import {
    CandidaturaPrService,
    CandidaturaPrPopupService,
    CandidaturaPrComponent,
    CandidaturaPrDetailComponent,
    CandidaturaPrDialogComponent,
    CandidaturaPrPopupComponent,
    CandidaturaPrDeletePopupComponent,
    CandidaturaPrDeleteDialogComponent,
    candidaturaRoute,
    candidaturaPopupRoute,
    CandidaturaPrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...candidaturaRoute,
    ...candidaturaPopupRoute,
];

@NgModule({
    imports: [
        ProsopografiaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CandidaturaPrComponent,
        CandidaturaPrDetailComponent,
        CandidaturaPrDialogComponent,
        CandidaturaPrDeleteDialogComponent,
        CandidaturaPrPopupComponent,
        CandidaturaPrDeletePopupComponent,
    ],
    entryComponents: [
        CandidaturaPrComponent,
        CandidaturaPrDialogComponent,
        CandidaturaPrPopupComponent,
        CandidaturaPrDeleteDialogComponent,
        CandidaturaPrDeletePopupComponent,
    ],
    providers: [
        CandidaturaPrService,
        CandidaturaPrPopupService,
        CandidaturaPrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProsopografiaCandidaturaPrModule {}
