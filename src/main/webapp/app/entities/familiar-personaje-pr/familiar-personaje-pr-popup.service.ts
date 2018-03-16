import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { FamiliarPersonajePr } from './familiar-personaje-pr.model';
import { FamiliarPersonajePrService } from './familiar-personaje-pr.service';

@Injectable()
export class FamiliarPersonajePrPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private familiarPersonajeService: FamiliarPersonajePrService

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
                this.familiarPersonajeService.find(id)
                    .subscribe((familiarPersonajeResponse: HttpResponse<FamiliarPersonajePr>) => {
                        const familiarPersonaje: FamiliarPersonajePr = familiarPersonajeResponse.body;
                        this.ngbModalRef = this.familiarPersonajeModalRef(component, familiarPersonaje);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.familiarPersonajeModalRef(component, new FamiliarPersonajePr());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    familiarPersonajeModalRef(component: Component, familiarPersonaje: FamiliarPersonajePr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.familiarPersonaje = familiarPersonaje;
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
