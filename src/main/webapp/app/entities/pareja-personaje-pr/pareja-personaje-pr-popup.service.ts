import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ParejaPersonajePr } from './pareja-personaje-pr.model';
import { ParejaPersonajePrService } from './pareja-personaje-pr.service';

@Injectable()
export class ParejaPersonajePrPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private parejaPersonajeService: ParejaPersonajePrService

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
                this.parejaPersonajeService.find(id)
                    .subscribe((parejaPersonajeResponse: HttpResponse<ParejaPersonajePr>) => {
                        const parejaPersonaje: ParejaPersonajePr = parejaPersonajeResponse.body;
                        if (parejaPersonaje.fechaDesde) {
                            parejaPersonaje.fechaDesde = {
                                year: parejaPersonaje.fechaDesde.getFullYear(),
                                month: parejaPersonaje.fechaDesde.getMonth() + 1,
                                day: parejaPersonaje.fechaDesde.getDate()
                            };
                        }
                        if (parejaPersonaje.fechaHasta) {
                            parejaPersonaje.fechaHasta = {
                                year: parejaPersonaje.fechaHasta.getFullYear(),
                                month: parejaPersonaje.fechaHasta.getMonth() + 1,
                                day: parejaPersonaje.fechaHasta.getDate()
                            };
                        }
                        this.ngbModalRef = this.parejaPersonajeModalRef(component, parejaPersonaje);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.parejaPersonajeModalRef(component, new ParejaPersonajePr());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    parejaPersonajeModalRef(component: Component, parejaPersonaje: ParejaPersonajePr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.parejaPersonaje = parejaPersonaje;
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
