import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProsopografiaSharedModule } from '../../shared';
import {
    ReligionPrService,
    ReligionPrPopupService,
    ReligionPrComponent,
    ReligionPrDetailComponent,
    ReligionPrDialogComponent,
    ReligionPrPopupComponent,
    ReligionPrDeletePopupComponent,
    ReligionPrDeleteDialogComponent,
    religionRoute,
    religionPopupRoute,
    ReligionPrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...religionRoute,
    ...religionPopupRoute,
];

@NgModule({
    imports: [
        ProsopografiaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReligionPrComponent,
        ReligionPrDetailComponent,
        ReligionPrDialogComponent,
        ReligionPrDeleteDialogComponent,
        ReligionPrPopupComponent,
        ReligionPrDeletePopupComponent,
    ],
    entryComponents: [
        ReligionPrComponent,
        ReligionPrDialogComponent,
        ReligionPrPopupComponent,
        ReligionPrDeleteDialogComponent,
        ReligionPrDeletePopupComponent,
    ],
    providers: [
        ReligionPrService,
        ReligionPrPopupService,
        ReligionPrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProsopografiaReligionPrModule {}
