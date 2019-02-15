import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { PersonajePr } from './personaje-pr.model';
import { PersonajePrService } from './personaje-pr.service';

@Injectable()
export class PersonajePrPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private personajeService: PersonajePrService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.personajeService.find(id)
                    .subscribe((personajeResponse: HttpResponse<PersonajePr>) => {
                        const personaje: PersonajePr = personajeResponse.body;
                        if (personaje.fechaNacimiento) {
                            personaje.fechaNacimiento = {
                                year: personaje.fechaNacimiento.getFullYear(),
                                month: personaje.fechaNacimiento.getMonth() + 1,
                                day: personaje.fechaNacimiento.getDate()
                            };
                        }
                        if (personaje.fechaDefuncion) {
                            personaje.fechaDefuncion = {
                                year: personaje.fechaDefuncion.getFullYear(),
                                month: personaje.fechaDefuncion.getMonth() + 1,
                                day: personaje.fechaDefuncion.getDate()
                            };
                        }
                        this.ngbModalRef = this.personajeModalRef(component, personaje);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.personajeModalRef(component, new PersonajePr());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    personajeModalRef(component: Component, personaje: PersonajePr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.personaje = personaje;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
