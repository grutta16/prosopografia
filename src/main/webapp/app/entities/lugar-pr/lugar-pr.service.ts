import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { LugarPr } from './lugar-pr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<LugarPr>;

@Injectable()
export class LugarPrService {

    private resourceUrl =  SERVER_API_URL + 'api/lugars';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/lugars';

    constructor(private http: HttpClient) { }

    create(lugar: LugarPr): Observable<EntityResponseType> {
        const copy = this.convert(lugar);
        return this.http.post<LugarPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(lugar: LugarPr): Observable<EntityResponseType> {
        const copy = this.convert(lugar);
        return this.http.put<LugarPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<LugarPr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<LugarPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<LugarPr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LugarPr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<LugarPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<LugarPr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LugarPr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: LugarPr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<LugarPr[]>): HttpResponse<LugarPr[]> {
        const jsonResponse: LugarPr[] = res.body;
        const body: LugarPr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to LugarPr.
     */
    private convertItemFromServer(lugar: LugarPr): LugarPr {
        const copy: LugarPr = Object.assign({}, lugar);
        return copy;
    }

    /**
     * Convert a LugarPr to a JSON which can be sent to the server.
     */
    private convert(lugar: LugarPr): LugarPr {
        const copy: LugarPr = Object.assign({}, lugar);
        return copy;
    }
}
