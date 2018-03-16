import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AsociacionPr } from './asociacion-pr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AsociacionPr>;

@Injectable()
export class AsociacionPrService {

    private resourceUrl =  SERVER_API_URL + 'api/asociacions';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/asociacions';

    constructor(private http: HttpClient) { }

    create(asociacion: AsociacionPr): Observable<EntityResponseType> {
        const copy = this.convert(asociacion);
        return this.http.post<AsociacionPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(asociacion: AsociacionPr): Observable<EntityResponseType> {
        const copy = this.convert(asociacion);
        return this.http.put<AsociacionPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AsociacionPr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AsociacionPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<AsociacionPr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AsociacionPr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<AsociacionPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<AsociacionPr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AsociacionPr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AsociacionPr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AsociacionPr[]>): HttpResponse<AsociacionPr[]> {
        const jsonResponse: AsociacionPr[] = res.body;
        const body: AsociacionPr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AsociacionPr.
     */
    private convertItemFromServer(asociacion: AsociacionPr): AsociacionPr {
        const copy: AsociacionPr = Object.assign({}, asociacion);
        return copy;
    }

    /**
     * Convert a AsociacionPr to a JSON which can be sent to the server.
     */
    private convert(asociacion: AsociacionPr): AsociacionPr {
        const copy: AsociacionPr = Object.assign({}, asociacion);
        return copy;
    }
}
