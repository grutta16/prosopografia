import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PersonaPr } from './persona-pr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PersonaPr>;

@Injectable()
export class PersonaPrService {

    private resourceUrl =  SERVER_API_URL + 'api/personas';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/personas';

    constructor(private http: HttpClient) { }

    create(persona: PersonaPr): Observable<EntityResponseType> {
        const copy = this.convert(persona);
        return this.http.post<PersonaPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(persona: PersonaPr): Observable<EntityResponseType> {
        const copy = this.convert(persona);
        return this.http.put<PersonaPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PersonaPr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PersonaPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<PersonaPr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PersonaPr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<PersonaPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<PersonaPr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PersonaPr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PersonaPr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PersonaPr[]>): HttpResponse<PersonaPr[]> {
        const jsonResponse: PersonaPr[] = res.body;
        const body: PersonaPr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PersonaPr.
     */
    private convertItemFromServer(persona: PersonaPr): PersonaPr {
        const copy: PersonaPr = Object.assign({}, persona);
        return copy;
    }

    /**
     * Convert a PersonaPr to a JSON which can be sent to the server.
     */
    private convert(persona: PersonaPr): PersonaPr {
        const copy: PersonaPr = Object.assign({}, persona);
        return copy;
    }
}
