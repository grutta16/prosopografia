import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { DetCandidaturaPr } from './det-candidatura-pr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DetCandidaturaPr>;

@Injectable()
export class DetCandidaturaPrService {

    private resourceUrl =  SERVER_API_URL + 'api/det-candidaturas';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/det-candidaturas';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(detCandidatura: DetCandidaturaPr): Observable<EntityResponseType> {
        const copy = this.convert(detCandidatura);
        return this.http.post<DetCandidaturaPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(detCandidatura: DetCandidaturaPr): Observable<EntityResponseType> {
        const copy = this.convert(detCandidatura);
        return this.http.put<DetCandidaturaPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DetCandidaturaPr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DetCandidaturaPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<DetCandidaturaPr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DetCandidaturaPr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<DetCandidaturaPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<DetCandidaturaPr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DetCandidaturaPr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DetCandidaturaPr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DetCandidaturaPr[]>): HttpResponse<DetCandidaturaPr[]> {
        const jsonResponse: DetCandidaturaPr[] = res.body;
        const body: DetCandidaturaPr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DetCandidaturaPr.
     */
    private convertItemFromServer(detCandidatura: DetCandidaturaPr): DetCandidaturaPr {
        const copy: DetCandidaturaPr = Object.assign({}, detCandidatura);
        copy.fechaInicio = this.dateUtils
            .convertLocalDateFromServer(detCandidatura.fechaInicio);
        copy.fechaFin = this.dateUtils
            .convertLocalDateFromServer(detCandidatura.fechaFin);
        return copy;
    }

    /**
     * Convert a DetCandidaturaPr to a JSON which can be sent to the server.
     */
    private convert(detCandidatura: DetCandidaturaPr): DetCandidaturaPr {
        const copy: DetCandidaturaPr = Object.assign({}, detCandidatura);
        copy.fechaInicio = this.dateUtils
            .convertLocalDateToServer(detCandidatura.fechaInicio);
        copy.fechaFin = this.dateUtils
            .convertLocalDateToServer(detCandidatura.fechaFin);
        return copy;
    }
}
