import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { FamiliarPersonajePr } from './familiar-personaje-pr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<FamiliarPersonajePr>;

@Injectable()
export class FamiliarPersonajePrService {

    private resourceUrl =  SERVER_API_URL + 'api/familiar-personajes';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/familiar-personajes';

    constructor(private http: HttpClient) { }

    create(familiarPersonaje: FamiliarPersonajePr): Observable<EntityResponseType> {
        const copy = this.convert(familiarPersonaje);
        return this.http.post<FamiliarPersonajePr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(familiarPersonaje: FamiliarPersonajePr): Observable<EntityResponseType> {
        const copy = this.convert(familiarPersonaje);
        return this.http.put<FamiliarPersonajePr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<FamiliarPersonajePr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<FamiliarPersonajePr[]>> {
        const options = createRequestOption(req);
        return this.http.get<FamiliarPersonajePr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FamiliarPersonajePr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<FamiliarPersonajePr[]>> {
        const options = createRequestOption(req);
        return this.http.get<FamiliarPersonajePr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FamiliarPersonajePr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: FamiliarPersonajePr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<FamiliarPersonajePr[]>): HttpResponse<FamiliarPersonajePr[]> {
        const jsonResponse: FamiliarPersonajePr[] = res.body;
        const body: FamiliarPersonajePr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to FamiliarPersonajePr.
     */
    private convertItemFromServer(familiarPersonaje: FamiliarPersonajePr): FamiliarPersonajePr {
        const copy: FamiliarPersonajePr = Object.assign({}, familiarPersonaje);
        return copy;
    }

    /**
     * Convert a FamiliarPersonajePr to a JSON which can be sent to the server.
     */
    private convert(familiarPersonaje: FamiliarPersonajePr): FamiliarPersonajePr {
        const copy: FamiliarPersonajePr = Object.assign({}, familiarPersonaje);
        return copy;
    }
}
