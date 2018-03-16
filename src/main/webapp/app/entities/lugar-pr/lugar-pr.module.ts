import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProsopografiaSharedModule } from '../../shared';
import {
    LugarPrService,
    LugarPrPopupService,
    LugarPrComponent,
    LugarPrDetailComponent,
    LugarPrDialogComponent,
    LugarPrPopupComponent,
    LugarPrDeletePopupComponent,
    LugarPrDeleteDialogComponent,
    lugarRoute,
    lugarPopupRoute,
    LugarPrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...lugarRoute,
    ...lugarPopupRoute,
];

@NgModule({
    imports: [
        ProsopografiaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LugarPrComponent,
        LugarPrDetailComponent,
        LugarPrDialogComponent,
        LugarPrDeleteDialogComponent,
        LugarPrPopupComponent,
        LugarPrDeletePopupComponent,
    ],
    entryComponents: [
        LugarPrComponent,
        LugarPrDialogComponent,
        LugarPrPopupComponent,
        LugarPrDeleteDialogComponent,
        LugarPrDeletePopupComponent,
    ],
    providers: [
        LugarPrService,
        LugarPrPopupService,
        LugarPrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProsopografiaLugarPrModule {}
