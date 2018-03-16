import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SeccionPr } from './seccion-pr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SeccionPr>;

@Injectable()
export class SeccionPrService {

    private resourceUrl =  SERVER_API_URL + 'api/seccions';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/seccions';

    constructor(private http: HttpClient) { }

    create(seccion: SeccionPr): Observable<EntityResponseType> {
        const copy = this.convert(seccion);
        return this.http.post<SeccionPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(seccion: SeccionPr): Observable<EntityResponseType> {
        const copy = this.convert(seccion);
        return this.http.put<SeccionPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SeccionPr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SeccionPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<SeccionPr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SeccionPr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<SeccionPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<SeccionPr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SeccionPr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SeccionPr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SeccionPr[]>): HttpResponse<SeccionPr[]> {
        const jsonResponse: SeccionPr[] = res.body;
        const body: SeccionPr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SeccionPr.
     */
    private convertItemFromServer(seccion: SeccionPr): SeccionPr {
        const copy: SeccionPr = Object.assign({}, seccion);
        return copy;
    }

    /**
     * Convert a SeccionPr to a JSON which can be sent to the server.
     */
    private convert(seccion: SeccionPr): SeccionPr {
        const copy: SeccionPr = Object.assign({}, seccion);
        return copy;
    }
}
