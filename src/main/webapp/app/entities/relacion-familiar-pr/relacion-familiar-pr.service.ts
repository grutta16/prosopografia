import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RelacionFamiliarPr } from './relacion-familiar-pr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RelacionFamiliarPr>;

@Injectable()
export class RelacionFamiliarPrService {

    private resourceUrl =  SERVER_API_URL + 'api/relacion-familiars';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/relacion-familiars';

    constructor(private http: HttpClient) { }

    create(relacionFamiliar: RelacionFamiliarPr): Observable<EntityResponseType> {
        const copy = this.convert(relacionFamiliar);
        return this.http.post<RelacionFamiliarPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(relacionFamiliar: RelacionFamiliarPr): Observable<EntityResponseType> {
        const copy = this.convert(relacionFamiliar);
        return this.http.put<RelacionFamiliarPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RelacionFamiliarPr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RelacionFamiliarPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<RelacionFamiliarPr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RelacionFamiliarPr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<RelacionFamiliarPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<RelacionFamiliarPr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RelacionFamiliarPr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RelacionFamiliarPr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RelacionFamiliarPr[]>): HttpResponse<RelacionFamiliarPr[]> {
        const jsonResponse: RelacionFamiliarPr[] = res.body;
        const body: RelacionFamiliarPr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RelacionFamiliarPr.
     */
    private convertItemFromServer(relacionFamiliar: RelacionFamiliarPr): RelacionFamiliarPr {
        const copy: RelacionFamiliarPr = Object.assign({}, relacionFamiliar);
        return copy;
    }

    /**
     * Convert a RelacionFamiliarPr to a JSON which can be sent to the server.
     */
    private convert(relacionFamiliar: RelacionFamiliarPr): RelacionFamiliarPr {
        const copy: RelacionFamiliarPr = Object.assign({}, relacionFamiliar);
        return copy;
    }
}
