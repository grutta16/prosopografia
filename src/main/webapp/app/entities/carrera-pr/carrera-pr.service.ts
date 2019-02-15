import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CarreraPr } from './carrera-pr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CarreraPr>;

@Injectable()
export class CarreraPrService {

    private resourceUrl =  SERVER_API_URL + 'api/carreras';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/carreras';

    constructor(private http: HttpClient) { }

    create(carrera: CarreraPr): Observable<EntityResponseType> {
        const copy = this.convert(carrera);
        return this.http.post<CarreraPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(carrera: CarreraPr): Observable<EntityResponseType> {
        const copy = this.convert(carrera);
        return this.http.put<CarreraPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CarreraPr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CarreraPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<CarreraPr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CarreraPr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<CarreraPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<CarreraPr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CarreraPr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CarreraPr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CarreraPr[]>): HttpResponse<CarreraPr[]> {
        const jsonResponse: CarreraPr[] = res.body;
        const body: CarreraPr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CarreraPr.
     */
    private convertItemFromServer(carrera: CarreraPr): CarreraPr {
        const copy: CarreraPr = Object.assign({}, carrera);
        return copy;
    }

    /**
     * Convert a CarreraPr to a JSON which can be sent to the server.
     */
    private convert(carrera: CarreraPr): CarreraPr {
        const copy: CarreraPr = Object.assign({}, carrera);
        return copy;
    }
}
