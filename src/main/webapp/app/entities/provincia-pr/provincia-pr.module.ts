import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProsopografiaSharedModule } from '../../shared';
import {
    ProvinciaPrService,
    ProvinciaPrPopupService,
    ProvinciaPrComponent,
    ProvinciaPrDetailComponent,
    ProvinciaPrDialogComponent,
    ProvinciaPrPopupComponent,
    ProvinciaPrDeletePopupComponent,
    ProvinciaPrDeleteDialogComponent,
    provinciaRoute,
    provinciaPopupRoute,
    ProvinciaPrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...provinciaRoute,
    ...provinciaPopupRoute,
];

@NgModule({
    imports: [
        ProsopografiaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProvinciaPrComponent,
        ProvinciaPrDetailComponent,
        ProvinciaPrDialogComponent,
        ProvinciaPrDeleteDialogComponent,
        ProvinciaPrPopupComponent,
        ProvinciaPrDeletePopupComponent,
    ],
    entryComponents: [
        ProvinciaPrComponent,
        ProvinciaPrDialogComponent,
        ProvinciaPrPopupComponent,
        ProvinciaPrDeleteDialogComponent,
        ProvinciaPrDeletePopupComponent,
    ],
    providers: [
        ProvinciaPrService,
        ProvinciaPrPopupService,
        ProvinciaPrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProsopografiaProvinciaPrModule {}
