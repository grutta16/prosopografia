import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ResidenciaPersonajePr } from './residencia-personaje-pr.model';
import { ResidenciaPersonajePrService } from './residencia-personaje-pr.service';

@Injectable()
export class ResidenciaPersonajePrPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private residenciaPersonajeService: ResidenciaPersonajePrService

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
                this.residenciaPersonajeService.find(id)
                    .subscribe((residenciaPersonajeResponse: HttpResponse<ResidenciaPersonajePr>) => {
                        const residenciaPersonaje: ResidenciaPersonajePr = residenciaPersonajeResponse.body;
                        if (residenciaPersonaje.fechaDesde) {
                            residenciaPersonaje.fechaDesde = {
                                year: residenciaPersonaje.fechaDesde.getFullYear(),
                                month: residenciaPersonaje.fechaDesde.getMonth() + 1,
                                day: residenciaPersonaje.fechaDesde.getDate()
                            };
                        }
                        if (residenciaPersonaje.fechaHasta) {
                            residenciaPersonaje.fechaHasta = {
                                year: residenciaPersonaje.fechaHasta.getFullYear(),
                                month: residenciaPersonaje.fechaHasta.getMonth() + 1,
                                day: residenciaPersonaje.fechaHasta.getDate()
                            };
                        }
                        this.ngbModalRef = this.residenciaPersonajeModalRef(component, residenciaPersonaje);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.residenciaPersonajeModalRef(component, new ResidenciaPersonajePr());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    residenciaPersonajeModalRef(component: Component, residenciaPersonaje: ResidenciaPersonajePr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.residenciaPersonaje = residenciaPersonaje;
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
