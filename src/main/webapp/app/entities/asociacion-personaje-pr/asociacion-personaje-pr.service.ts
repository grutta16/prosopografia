import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { AsociacionPersonajePr } from './asociacion-personaje-pr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AsociacionPersonajePr>;

@Injectable()
export class AsociacionPersonajePrService {

    private resourceUrl =  SERVER_API_URL + 'api/asociacion-personajes';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/asociacion-personajes';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(asociacionPersonaje: AsociacionPersonajePr): Observable<EntityResponseType> {
        const copy = this.convert(asociacionPersonaje);
        return this.http.post<AsociacionPersonajePr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(asociacionPersonaje: AsociacionPersonajePr): Observable<EntityResponseType> {
        const copy = this.convert(asociacionPersonaje);
        return this.http.put<AsociacionPersonajePr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AsociacionPersonajePr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AsociacionPersonajePr[]>> {
        const options = createRequestOption(req);
        return this.http.get<AsociacionPersonajePr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AsociacionPersonajePr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<AsociacionPersonajePr[]>> {
        const options = createRequestOption(req);
        return this.http.get<AsociacionPersonajePr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AsociacionPersonajePr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AsociacionPersonajePr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AsociacionPersonajePr[]>): HttpResponse<AsociacionPersonajePr[]> {
        const jsonResponse: AsociacionPersonajePr[] = res.body;
        const body: AsociacionPersonajePr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AsociacionPersonajePr.
     */
    private convertItemFromServer(asociacionPersonaje: AsociacionPersonajePr): AsociacionPersonajePr {
        const copy: AsociacionPersonajePr = Object.assign({}, asociacionPersonaje);
        copy.fechaDesde = this.dateUtils
            .convertLocalDateFromServer(asociacionPersonaje.fechaDesde);
        copy.fechaHasta = this.dateUtils
            .convertLocalDateFromServer(asociacionPersonaje.fechaHasta);
        return copy;
    }

    /**
     * Convert a AsociacionPersonajePr to a JSON which can be sent to the server.
     */
    private convert(asociacionPersonaje: AsociacionPersonajePr): AsociacionPersonajePr {
        const copy: AsociacionPersonajePr = Object.assign({}, asociacionPersonaje);
        copy.fechaDesde = this.dateUtils
            .convertLocalDateToServer(asociacionPersonaje.fechaDesde);
        copy.fechaHasta = this.dateUtils
            .convertLocalDateToServer(asociacionPersonaje.fechaHasta);
        return copy;
    }
}
