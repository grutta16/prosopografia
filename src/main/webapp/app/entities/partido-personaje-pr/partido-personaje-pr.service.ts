import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PartidoPersonajePr } from './partido-personaje-pr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PartidoPersonajePr>;

@Injectable()
export class PartidoPersonajePrService {

    private resourceUrl =  SERVER_API_URL + 'api/partido-personajes';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/partido-personajes';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(partidoPersonaje: PartidoPersonajePr): Observable<EntityResponseType> {
        const copy = this.convert(partidoPersonaje);
        return this.http.post<PartidoPersonajePr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(partidoPersonaje: PartidoPersonajePr): Observable<EntityResponseType> {
        const copy = this.convert(partidoPersonaje);
        return this.http.put<PartidoPersonajePr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PartidoPersonajePr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PartidoPersonajePr[]>> {
        const options = createRequestOption(req);
        return this.http.get<PartidoPersonajePr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PartidoPersonajePr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<PartidoPersonajePr[]>> {
        const options = createRequestOption(req);
        return this.http.get<PartidoPersonajePr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PartidoPersonajePr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PartidoPersonajePr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PartidoPersonajePr[]>): HttpResponse<PartidoPersonajePr[]> {
        const jsonResponse: PartidoPersonajePr[] = res.body;
        const body: PartidoPersonajePr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PartidoPersonajePr.
     */
    private convertItemFromServer(partidoPersonaje: PartidoPersonajePr): PartidoPersonajePr {
        const copy: PartidoPersonajePr = Object.assign({}, partidoPersonaje);
        copy.fechaDesde = this.dateUtils
            .convertLocalDateFromServer(partidoPersonaje.fechaDesde);
        copy.fechaHasta = this.dateUtils
            .convertLocalDateFromServer(partidoPersonaje.fechaHasta);
        return copy;
    }

    /**
     * Convert a PartidoPersonajePr to a JSON which can be sent to the server.
     */
    private convert(partidoPersonaje: PartidoPersonajePr): PartidoPersonajePr {
        const copy: PartidoPersonajePr = Object.assign({}, partidoPersonaje);
        copy.fechaDesde = this.dateUtils
            .convertLocalDateToServer(partidoPersonaje.fechaDesde);
        copy.fechaHasta = this.dateUtils
            .convertLocalDateToServer(partidoPersonaje.fechaHasta);
        return copy;
    }
}
