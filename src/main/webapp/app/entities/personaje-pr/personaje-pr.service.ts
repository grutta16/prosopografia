import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PersonajePr } from './personaje-pr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PersonajePr>;

@Injectable()
export class PersonajePrService {

    private resourceUrl =  SERVER_API_URL + 'api/personajes';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/personajes';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(personaje: PersonajePr): Observable<EntityResponseType> {
        const copy = this.convert(personaje);
        return this.http.post<PersonajePr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(personaje: PersonajePr): Observable<EntityResponseType> {
        const copy = this.convert(personaje);
        return this.http.put<PersonajePr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PersonajePr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PersonajePr[]>> {
        const options = createRequestOption(req);
        return this.http.get<PersonajePr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PersonajePr[]>) => this.convertArrayResponse(res));
    }

    queryAll(): Observable<HttpResponse<PersonajePr[]>> {
        return this.http.get<PersonajePr[]>(this.resourceUrl+'/all', { observe: 'response' })
            .map((res: HttpResponse<PersonajePr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<PersonajePr[]>> {
        const options = createRequestOption(req);
        return this.http.get<PersonajePr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PersonajePr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PersonajePr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PersonajePr[]>): HttpResponse<PersonajePr[]> {
        const jsonResponse: PersonajePr[] = res.body;
        const body: PersonajePr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PersonajePr.
     */
    private convertItemFromServer(personaje: PersonajePr): PersonajePr {
        const copy: PersonajePr = Object.assign({}, personaje);
        copy.fechaNacimiento = this.dateUtils
            .convertLocalDateFromServer(personaje.fechaNacimiento);
        copy.fechaDefuncion = this.dateUtils
            .convertLocalDateFromServer(personaje.fechaDefuncion);
        return copy;
    }

    /**
     * Convert a PersonajePr to a JSON which can be sent to the server.
     */
    private convert(personaje: PersonajePr): PersonajePr {
        const copy: PersonajePr = Object.assign({}, personaje);
        copy.fechaNacimiento = this.dateUtils
            .convertLocalDateToServer(personaje.fechaNacimiento);
        copy.fechaDefuncion = this.dateUtils
            .convertLocalDateToServer(personaje.fechaDefuncion);
        return copy;
    }
}
