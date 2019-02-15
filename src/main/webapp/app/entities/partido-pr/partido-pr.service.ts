import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PartidoPr } from './partido-pr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PartidoPr>;

@Injectable()
export class PartidoPrService {

    private resourceUrl =  SERVER_API_URL + 'api/partidos';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/partidos';

    constructor(private http: HttpClient) { }

    create(partido: PartidoPr): Observable<EntityResponseType> {
        const copy = this.convert(partido);
        return this.http.post<PartidoPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(partido: PartidoPr): Observable<EntityResponseType> {
        const copy = this.convert(partido);
        return this.http.put<PartidoPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PartidoPr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PartidoPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<PartidoPr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PartidoPr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<PartidoPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<PartidoPr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PartidoPr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PartidoPr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PartidoPr[]>): HttpResponse<PartidoPr[]> {
        const jsonResponse: PartidoPr[] = res.body;
        const body: PartidoPr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PartidoPr.
     */
    private convertItemFromServer(partido: PartidoPr): PartidoPr {
        const copy: PartidoPr = Object.assign({}, partido);
        return copy;
    }

    /**
     * Convert a PartidoPr to a JSON which can be sent to the server.
     */
    private convert(partido: PartidoPr): PartidoPr {
        const copy: PartidoPr = Object.assign({}, partido);
        return copy;
    }
}
