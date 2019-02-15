import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProsopografiaSharedModule } from '../../shared';
import {
    PartidoPrService,
    PartidoPrPopupService,
    PartidoPrComponent,
    PartidoPrDetailComponent,
    PartidoPrDialogComponent,
    PartidoPrPopupComponent,
    PartidoPrDeletePopupComponent,
    PartidoPrDeleteDialogComponent,
    partidoRoute,
    partidoPopupRoute,
    PartidoPrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...partidoRoute,
    ...partidoPopupRoute,
];

@NgModule({
    imports: [
        ProsopografiaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PartidoPrComponent,
        PartidoPrDetailComponent,
        PartidoPrDialogComponent,
        PartidoPrDeleteDialogComponent,
        PartidoPrPopupComponent,
        PartidoPrDeletePopupComponent,
    ],
    entryComponents: [
        PartidoPrComponent,
        PartidoPrDialogComponent,
        PartidoPrPopupComponent,
        PartidoPrDeleteDialogComponent,
        PartidoPrDeletePopupComponent,
    ],
    providers: [
        PartidoPrService,
        PartidoPrPopupService,
        PartidoPrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProsopografiaPartidoPrModule {}
