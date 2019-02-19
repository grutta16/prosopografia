import { Component, Injectable, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const I18N_VALUES = {
    'es': {
        weekdays: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
        months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    }
};

const now = new Date();

@Injectable()
export class I18n {
    language = 'es';
}

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

    constructor(private _i18n: I18n) {
        super();
    }

    getWeekdayShortName(weekday: number): string {
        return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
    }
    getMonthShortName(month: number): string {
        return I18N_VALUES[this._i18n.language].months[month - 1];
    }
    getMonthFullName(month: number): string {
        return this.getMonthShortName(month);
    }

    getDayAriaLabel(date: NgbDateStruct): string {
        return `${date.day}/${date.month}/${date.year}`;
    }
}

@Component({
    selector: 'jhi-datepicker-i18n-component',
    templateUrl: './datepicker-i18n.html',
    providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}] // define custom NgbDatepickerI18n provider
})
export class JhiDatepickerI18nComponent implements OnInit {

    @Input() minDate: NgbDateStruct;
    @Input() maxDate: NgbDateStruct;
    @Input() fecha: any;
    @Input() name: String;
    @Output() selectDate: EventEmitter<any> = new EventEmitter<any>();

    ngOnInit() {}

    onDateSelect() {
        this.selectDate.emit({
            fecha: this.fecha,
            name: this.name
        });
    }
}
