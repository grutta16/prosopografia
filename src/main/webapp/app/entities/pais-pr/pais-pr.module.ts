import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProsopografiaSharedModule } from '../../shared';
import {
    PaisPrService,
    PaisPrPopupService,
    PaisPrComponent,
    PaisPrDetailComponent,
    PaisPrDialogComponent,
    PaisPrPopupComponent,
    PaisPrDeletePopupComponent,
    PaisPrDeleteDialogComponent,
    paisRoute,
    paisPopupRoute,
    PaisPrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...paisRoute,
    ...paisPopupRoute,
];

@NgModule({
    imports: [
        ProsopografiaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PaisPrComponent,
        PaisPrDetailComponent,
        PaisPrDialogComponent,
        PaisPrDeleteDialogComponent,
        PaisPrPopupComponent,
        PaisPrDeletePopupComponent,
    ],
    entryComponents: [
        PaisPrComponent,
        PaisPrDialogComponent,
        PaisPrPopupComponent,
        PaisPrDeleteDialogComponent,
        PaisPrDeletePopupComponent,
    ],
    providers: [
        PaisPrService,
        PaisPrPopupService,
        PaisPrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProsopografiaPaisPrModule {}
