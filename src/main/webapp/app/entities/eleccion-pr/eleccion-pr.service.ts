import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EleccionPr } from './eleccion-pr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<EleccionPr>;

@Injectable()
export class EleccionPrService {

    private resourceUrl =  SERVER_API_URL + 'api/eleccions';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/eleccions';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(eleccion: EleccionPr): Observable<EntityResponseType> {
        const copy = this.convert(eleccion);
        return this.http.post<EleccionPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(eleccion: EleccionPr): Observable<EntityResponseType> {
        const copy = this.convert(eleccion);
        return this.http.put<EleccionPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<EleccionPr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<EleccionPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<EleccionPr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EleccionPr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<EleccionPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<EleccionPr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EleccionPr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: EleccionPr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<EleccionPr[]>): HttpResponse<EleccionPr[]> {
        const jsonResponse: EleccionPr[] = res.body;
        const body: EleccionPr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to EleccionPr.
     */
    private convertItemFromServer(eleccion: EleccionPr): EleccionPr {
        const copy: EleccionPr = Object.assign({}, eleccion);
        copy.fecha = this.dateUtils
            .convertLocalDateFromServer(eleccion.fecha);
        return copy;
    }

    /**
     * Convert a EleccionPr to a JSON which can be sent to the server.
     */
    private convert(eleccion: EleccionPr): EleccionPr {
        const copy: EleccionPr = Object.assign({}, eleccion);
        copy.fecha = this.dateUtils
            .convertLocalDateToServer(eleccion.fecha);
        return copy;
    }
}
