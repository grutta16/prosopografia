import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { EstudioPersonajePr } from './estudio-personaje-pr.model';
import { EstudioPersonajePrService } from './estudio-personaje-pr.service';

@Injectable()
export class EstudioPersonajePrPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private estudioPersonajeService: EstudioPersonajePrService

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
                this.estudioPersonajeService.find(id)
                    .subscribe((estudioPersonajeResponse: HttpResponse<EstudioPersonajePr>) => {
                        const estudioPersonaje: EstudioPersonajePr = estudioPersonajeResponse.body;
                        this.ngbModalRef = this.estudioPersonajeModalRef(component, estudioPersonaje);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.estudioPersonajeModalRef(component, new EstudioPersonajePr());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    estudioPersonajeModalRef(component: Component, estudioPersonaje: EstudioPersonajePr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.estudioPersonaje = estudioPersonaje;
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
