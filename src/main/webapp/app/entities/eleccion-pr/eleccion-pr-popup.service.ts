import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { EleccionPr } from './eleccion-pr.model';
import { EleccionPrService } from './eleccion-pr.service';

@Injectable()
export class EleccionPrPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private eleccionService: EleccionPrService

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
                this.eleccionService.find(id)
                    .subscribe((eleccionResponse: HttpResponse<EleccionPr>) => {
                        const eleccion: EleccionPr = eleccionResponse.body;
                        if (eleccion.fecha) {
                            eleccion.fecha = {
                                year: eleccion.fecha.getFullYear(),
                                month: eleccion.fecha.getMonth() + 1,
                                day: eleccion.fecha.getDate()
                            };
                        }
                        this.ngbModalRef = this.eleccionModalRef(component, eleccion);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.eleccionModalRef(component, new EleccionPr());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    eleccionModalRef(component: Component, eleccion: EleccionPr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.eleccion = eleccion;
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
