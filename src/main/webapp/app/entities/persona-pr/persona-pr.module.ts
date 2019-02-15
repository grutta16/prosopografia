import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProsopografiaSharedModule } from '../../shared';
import {
    PersonaPrService,
    PersonaPrPopupService,
    PersonaPrComponent,
    PersonaPrDetailComponent,
    PersonaPrDialogComponent,
    PersonaPrPopupComponent,
    PersonaPrDeletePopupComponent,
    PersonaPrDeleteDialogComponent,
    personaRoute,
    personaPopupRoute,
    PersonaPrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...personaRoute,
    ...personaPopupRoute,
];

@NgModule({
    imports: [
        ProsopografiaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PersonaPrComponent,
        PersonaPrDetailComponent,
        PersonaPrDialogComponent,
        PersonaPrDeleteDialogComponent,
        PersonaPrPopupComponent,
        PersonaPrDeletePopupComponent,
    ],
    entryComponents: [
        PersonaPrComponent,
        PersonaPrDialogComponent,
        PersonaPrPopupComponent,
        PersonaPrDeleteDialogComponent,
        PersonaPrDeletePopupComponent,
    ],
    providers: [
        PersonaPrService,
        PersonaPrPopupService,
        PersonaPrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProsopografiaPersonaPrModule {}
