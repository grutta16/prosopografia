import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';
import { JhiDatepickerI18nComponent } from './datepicker/datepicker-i18n';

import {
    ProsopografiaSharedLibsModule,
    ProsopografiaSharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    LoginService,
    LoginModalService,
    JhiLoginModalComponent,
    Principal,
    HasAnyAuthorityDirective
} from './';

@NgModule({
    imports: [
        ProsopografiaSharedLibsModule,
        ProsopografiaSharedCommonModule
    ],
    declarations: [
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        JhiDatepickerI18nComponent
    ],
    providers: [
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        UserService,
        DatePipe
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        ProsopografiaSharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        JhiDatepickerI18nComponent,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ProsopografiaSharedModule {}
