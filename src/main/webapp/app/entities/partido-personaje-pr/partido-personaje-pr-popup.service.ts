import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { PartidoPersonajePr } from './partido-personaje-pr.model';
import { PartidoPersonajePrService } from './partido-personaje-pr.service';

@Injectable()
export class PartidoPersonajePrPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private partidoPersonajeService: PartidoPersonajePrService

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
                this.partidoPersonajeService.find(id)
                    .subscribe((partidoPersonajeResponse: HttpResponse<PartidoPersonajePr>) => {
                        const partidoPersonaje: PartidoPersonajePr = partidoPersonajeResponse.body;
                        if (partidoPersonaje.fechaDesde) {
                            partidoPersonaje.fechaDesde = {
                                year: partidoPersonaje.fechaDesde.getFullYear(),
                                month: partidoPersonaje.fechaDesde.getMonth() + 1,
                                day: partidoPersonaje.fechaDesde.getDate()
                            };
                        }
                        if (partidoPersonaje.fechaHasta) {
                            partidoPersonaje.fechaHasta = {
                                year: partidoPersonaje.fechaHasta.getFullYear(),
                                month: partidoPersonaje.fechaHasta.getMonth() + 1,
                                day: partidoPersonaje.fechaHasta.getDate()
                            };
                        }
                        this.ngbModalRef = this.partidoPersonajeModalRef(component, partidoPersonaje);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.partidoPersonajeModalRef(component, new PartidoPersonajePr());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    partidoPersonajeModalRef(component: Component, partidoPersonaje: PartidoPersonajePr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.partidoPersonaje = partidoPersonaje;
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
