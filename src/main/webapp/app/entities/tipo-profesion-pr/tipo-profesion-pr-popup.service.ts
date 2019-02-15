import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { TipoProfesionPr } from './tipo-profesion-pr.model';
import { TipoProfesionPrService } from './tipo-profesion-pr.service';

@Injectable()
export class TipoProfesionPrPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private tipoProfesionService: TipoProfesionPrService

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
                this.tipoProfesionService.find(id)
                    .subscribe((tipoProfesionResponse: HttpResponse<TipoProfesionPr>) => {
                        const tipoProfesion: TipoProfesionPr = tipoProfesionResponse.body;
                        this.ngbModalRef = this.tipoProfesionModalRef(component, tipoProfesion);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tipoProfesionModalRef(component, new TipoProfesionPr());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tipoProfesionModalRef(component: Component, tipoProfesion: TipoProfesionPr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tipoProfesion = tipoProfesion;
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
