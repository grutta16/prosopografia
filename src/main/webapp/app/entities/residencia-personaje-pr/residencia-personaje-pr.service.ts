import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ResidenciaPersonajePr } from './residencia-personaje-pr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ResidenciaPersonajePr>;

@Injectable()
export class ResidenciaPersonajePrService {

    private resourceUrl =  SERVER_API_URL + 'api/residencia-personajes';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/residencia-personajes';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(residenciaPersonaje: ResidenciaPersonajePr): Observable<EntityResponseType> {
        const copy = this.convert(residenciaPersonaje);
        return this.http.post<ResidenciaPersonajePr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(residenciaPersonaje: ResidenciaPersonajePr): Observable<EntityResponseType> {
        const copy = this.convert(residenciaPersonaje);
        return this.http.put<ResidenciaPersonajePr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ResidenciaPersonajePr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ResidenciaPersonajePr[]>> {
        const options = createRequestOption(req);
        return this.http.get<ResidenciaPersonajePr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ResidenciaPersonajePr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ResidenciaPersonajePr[]>> {
        const options = createRequestOption(req);
        return this.http.get<ResidenciaPersonajePr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ResidenciaPersonajePr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ResidenciaPersonajePr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ResidenciaPersonajePr[]>): HttpResponse<ResidenciaPersonajePr[]> {
        const jsonResponse: ResidenciaPersonajePr[] = res.body;
        const body: ResidenciaPersonajePr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ResidenciaPersonajePr.
     */
    private convertItemFromServer(residenciaPersonaje: ResidenciaPersonajePr): ResidenciaPersonajePr {
        const copy: ResidenciaPersonajePr = Object.assign({}, residenciaPersonaje);
        copy.fechaDesde = this.dateUtils
            .convertLocalDateFromServer(residenciaPersonaje.fechaDesde);
        copy.fechaHasta = this.dateUtils
            .convertLocalDateFromServer(residenciaPersonaje.fechaHasta);
        return copy;
    }

    /**
     * Convert a ResidenciaPersonajePr to a JSON which can be sent to the server.
     */
    private convert(residenciaPersonaje: ResidenciaPersonajePr): ResidenciaPersonajePr {
        const copy: ResidenciaPersonajePr = Object.assign({}, residenciaPersonaje);
        copy.fechaDesde = this.dateUtils
            .convertLocalDateToServer(residenciaPersonaje.fechaDesde);
        copy.fechaHasta = this.dateUtils
            .convertLocalDateToServer(residenciaPersonaje.fechaHasta);
        return copy;
    }
}
