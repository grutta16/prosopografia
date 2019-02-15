import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ParejaPersonajePr } from './pareja-personaje-pr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ParejaPersonajePr>;

@Injectable()
export class ParejaPersonajePrService {

    private resourceUrl =  SERVER_API_URL + 'api/pareja-personajes';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/pareja-personajes';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(parejaPersonaje: ParejaPersonajePr): Observable<EntityResponseType> {
        const copy = this.convert(parejaPersonaje);
        return this.http.post<ParejaPersonajePr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(parejaPersonaje: ParejaPersonajePr): Observable<EntityResponseType> {
        const copy = this.convert(parejaPersonaje);
        return this.http.put<ParejaPersonajePr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ParejaPersonajePr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ParejaPersonajePr[]>> {
        const options = createRequestOption(req);
        return this.http.get<ParejaPersonajePr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ParejaPersonajePr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ParejaPersonajePr[]>> {
        const options = createRequestOption(req);
        return this.http.get<ParejaPersonajePr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ParejaPersonajePr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ParejaPersonajePr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ParejaPersonajePr[]>): HttpResponse<ParejaPersonajePr[]> {
        const jsonResponse: ParejaPersonajePr[] = res.body;
        const body: ParejaPersonajePr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ParejaPersonajePr.
     */
    private convertItemFromServer(parejaPersonaje: ParejaPersonajePr): ParejaPersonajePr {
        const copy: ParejaPersonajePr = Object.assign({}, parejaPersonaje);
        copy.fechaDesde = this.dateUtils
            .convertLocalDateFromServer(parejaPersonaje.fechaDesde);
        copy.fechaHasta = this.dateUtils
            .convertLocalDateFromServer(parejaPersonaje.fechaHasta);
        return copy;
    }

    /**
     * Convert a ParejaPersonajePr to a JSON which can be sent to the server.
     */
    private convert(parejaPersonaje: ParejaPersonajePr): ParejaPersonajePr {
        const copy: ParejaPersonajePr = Object.assign({}, parejaPersonaje);
        copy.fechaDesde = this.dateUtils
            .convertLocalDateToServer(parejaPersonaje.fechaDesde);
        copy.fechaHasta = this.dateUtils
            .convertLocalDateToServer(parejaPersonaje.fechaHasta);
        return copy;
    }
}
