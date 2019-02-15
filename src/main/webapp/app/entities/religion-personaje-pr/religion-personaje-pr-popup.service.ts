import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ReligionPersonajePr } from './religion-personaje-pr.model';
import { ReligionPersonajePrService } from './religion-personaje-pr.service';

@Injectable()
export class ReligionPersonajePrPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private religionPersonajeService: ReligionPersonajePrService

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
                this.religionPersonajeService.find(id)
                    .subscribe((religionPersonajeResponse: HttpResponse<ReligionPersonajePr>) => {
                        const religionPersonaje: ReligionPersonajePr = religionPersonajeResponse.body;
                        if (religionPersonaje.fechaDesde) {
                            religionPersonaje.fechaDesde = {
                                year: religionPersonaje.fechaDesde.getFullYear(),
                                month: religionPersonaje.fechaDesde.getMonth() + 1,
                                day: religionPersonaje.fechaDesde.getDate()
                            };
                        }
                        if (religionPersonaje.fechaHasta) {
                            religionPersonaje.fechaHasta = {
                                year: religionPersonaje.fechaHasta.getFullYear(),
                                month: religionPersonaje.fechaHasta.getMonth() + 1,
                                day: religionPersonaje.fechaHasta.getDate()
                            };
                        }
                        this.ngbModalRef = this.religionPersonajeModalRef(component, religionPersonaje);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.religionPersonajeModalRef(component, new ReligionPersonajePr());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    religionPersonajeModalRef(component: Component, religionPersonaje: ReligionPersonajePr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.religionPersonaje = religionPersonaje;
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
