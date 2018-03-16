import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ReligionPersonajePr } from './religion-personaje-pr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ReligionPersonajePr>;

@Injectable()
export class ReligionPersonajePrService {

    private resourceUrl =  SERVER_API_URL + 'api/religion-personajes';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/religion-personajes';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(religionPersonaje: ReligionPersonajePr): Observable<EntityResponseType> {
        const copy = this.convert(religionPersonaje);
        return this.http.post<ReligionPersonajePr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(religionPersonaje: ReligionPersonajePr): Observable<EntityResponseType> {
        const copy = this.convert(religionPersonaje);
        return this.http.put<ReligionPersonajePr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ReligionPersonajePr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ReligionPersonajePr[]>> {
        const options = createRequestOption(req);
        return this.http.get<ReligionPersonajePr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ReligionPersonajePr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ReligionPersonajePr[]>> {
        const options = createRequestOption(req);
        return this.http.get<ReligionPersonajePr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ReligionPersonajePr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ReligionPersonajePr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ReligionPersonajePr[]>): HttpResponse<ReligionPersonajePr[]> {
        const jsonResponse: ReligionPersonajePr[] = res.body;
        const body: ReligionPersonajePr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ReligionPersonajePr.
     */
    private convertItemFromServer(religionPersonaje: ReligionPersonajePr): ReligionPersonajePr {
        const copy: ReligionPersonajePr = Object.assign({}, religionPersonaje);
        copy.fechaDesde = this.dateUtils
            .convertLocalDateFromServer(religionPersonaje.fechaDesde);
        copy.fechaHasta = this.dateUtils
            .convertLocalDateFromServer(religionPersonaje.fechaHasta);
        return copy;
    }

    /**
     * Convert a ReligionPersonajePr to a JSON which can be sent to the server.
     */
    private convert(religionPersonaje: ReligionPersonajePr): ReligionPersonajePr {
        const copy: ReligionPersonajePr = Object.assign({}, religionPersonaje);
        copy.fechaDesde = this.dateUtils
            .convertLocalDateToServer(religionPersonaje.fechaDesde);
        copy.fechaHasta = this.dateUtils
            .convertLocalDateToServer(religionPersonaje.fechaHasta);
        return copy;
    }
}
