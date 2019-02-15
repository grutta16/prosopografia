import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DetCandidaturaPr } from './det-candidatura-pr.model';
import { DetCandidaturaPrService } from './det-candidatura-pr.service';

@Injectable()
export class DetCandidaturaPrPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private detCandidaturaService: DetCandidaturaPrService

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
                this.detCandidaturaService.find(id)
                    .subscribe((detCandidaturaResponse: HttpResponse<DetCandidaturaPr>) => {
                        const detCandidatura: DetCandidaturaPr = detCandidaturaResponse.body;
                        if (detCandidatura.fechaInicio) {
                            detCandidatura.fechaInicio = {
                                year: detCandidatura.fechaInicio.getFullYear(),
                                month: detCandidatura.fechaInicio.getMonth() + 1,
                                day: detCandidatura.fechaInicio.getDate()
                            };
                        }
                        if (detCandidatura.fechaFin) {
                            detCandidatura.fechaFin = {
                                year: detCandidatura.fechaFin.getFullYear(),
                                month: detCandidatura.fechaFin.getMonth() + 1,
                                day: detCandidatura.fechaFin.getDate()
                            };
                        }
                        this.ngbModalRef = this.detCandidaturaModalRef(component, detCandidatura);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.detCandidaturaModalRef(component, new DetCandidaturaPr());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    detCandidaturaModalRef(component: Component, detCandidatura: DetCandidaturaPr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.detCandidatura = detCandidatura;
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
