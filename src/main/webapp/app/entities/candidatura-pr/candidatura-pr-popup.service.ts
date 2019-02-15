import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CandidaturaPr } from './candidatura-pr.model';
import { CandidaturaPrService } from './candidatura-pr.service';

@Injectable()
export class CandidaturaPrPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private candidaturaService: CandidaturaPrService

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
                this.candidaturaService.find(id)
                    .subscribe((candidaturaResponse: HttpResponse<CandidaturaPr>) => {
                        const candidatura: CandidaturaPr = candidaturaResponse.body;
                        this.ngbModalRef = this.candidaturaModalRef(component, candidatura);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.candidaturaModalRef(component, new CandidaturaPr());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    candidaturaModalRef(component: Component, candidatura: CandidaturaPr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.candidatura = candidatura;
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
