import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProsopografiaSharedModule } from '../../shared';
import {
    AsociacionPrService,
    AsociacionPrPopupService,
    AsociacionPrComponent,
    AsociacionPrDetailComponent,
    AsociacionPrDialogComponent,
    AsociacionPrPopupComponent,
    AsociacionPrDeletePopupComponent,
    AsociacionPrDeleteDialogComponent,
    asociacionRoute,
    asociacionPopupRoute,
    AsociacionPrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...asociacionRoute,
    ...asociacionPopupRoute,
];

@NgModule({
    imports: [
        ProsopografiaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AsociacionPrComponent,
        AsociacionPrDetailComponent,
        AsociacionPrDialogComponent,
        AsociacionPrDeleteDialogComponent,
        AsociacionPrPopupComponent,
        AsociacionPrDeletePopupComponent,
    ],
    entryComponents: [
        AsociacionPrComponent,
        AsociacionPrDialogComponent,
        AsociacionPrPopupComponent,
        AsociacionPrDeleteDialogComponent,
        AsociacionPrDeletePopupComponent,
    ],
    providers: [
        AsociacionPrService,
        AsociacionPrPopupService,
        AsociacionPrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProsopografiaAsociacionPrModule {}
