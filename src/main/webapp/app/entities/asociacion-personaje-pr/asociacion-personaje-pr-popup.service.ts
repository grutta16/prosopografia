import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AsociacionPersonajePr } from './asociacion-personaje-pr.model';
import { AsociacionPersonajePrService } from './asociacion-personaje-pr.service';

@Injectable()
export class AsociacionPersonajePrPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private asociacionPersonajeService: AsociacionPersonajePrService

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
                this.asociacionPersonajeService.find(id)
                    .subscribe((asociacionPersonajeResponse: HttpResponse<AsociacionPersonajePr>) => {
                        const asociacionPersonaje: AsociacionPersonajePr = asociacionPersonajeResponse.body;
                        if (asociacionPersonaje.fechaDesde) {
                            asociacionPersonaje.fechaDesde = {
                                year: asociacionPersonaje.fechaDesde.getFullYear(),
                                month: asociacionPersonaje.fechaDesde.getMonth() + 1,
                                day: asociacionPersonaje.fechaDesde.getDate()
                            };
                        }
                        if (asociacionPersonaje.fechaHasta) {
                            asociacionPersonaje.fechaHasta = {
                                year: asociacionPersonaje.fechaHasta.getFullYear(),
                                month: asociacionPersonaje.fechaHasta.getMonth() + 1,
                                day: asociacionPersonaje.fechaHasta.getDate()
                            };
                        }
                        this.ngbModalRef = this.asociacionPersonajeModalRef(component, asociacionPersonaje);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.asociacionPersonajeModalRef(component, new AsociacionPersonajePr());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    asociacionPersonajeModalRef(component: Component, asociacionPersonaje: AsociacionPersonajePr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.asociacionPersonaje = asociacionPersonaje;
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
