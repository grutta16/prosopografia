import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CargoPersonajePr } from './cargo-personaje-pr.model';
import { CargoPersonajePrService } from './cargo-personaje-pr.service';

@Injectable()
export class CargoPersonajePrPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private cargoPersonajeService: CargoPersonajePrService

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
                this.cargoPersonajeService.find(id)
                    .subscribe((cargoPersonajeResponse: HttpResponse<CargoPersonajePr>) => {
                        const cargoPersonaje: CargoPersonajePr = cargoPersonajeResponse.body;
                        if (cargoPersonaje.fechaInicio) {
                            cargoPersonaje.fechaInicio = {
                                year: cargoPersonaje.fechaInicio.getFullYear(),
                                month: cargoPersonaje.fechaInicio.getMonth() + 1,
                                day: cargoPersonaje.fechaInicio.getDate()
                            };
                        }
                        if (cargoPersonaje.fechaFin) {
                            cargoPersonaje.fechaFin = {
                                year: cargoPersonaje.fechaFin.getFullYear(),
                                month: cargoPersonaje.fechaFin.getMonth() + 1,
                                day: cargoPersonaje.fechaFin.getDate()
                            };
                        }
                        this.ngbModalRef = this.cargoPersonajeModalRef(component, cargoPersonaje);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cargoPersonajeModalRef(component, new CargoPersonajePr());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cargoPersonajeModalRef(component: Component, cargoPersonaje: CargoPersonajePr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cargoPersonaje = cargoPersonaje;
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
