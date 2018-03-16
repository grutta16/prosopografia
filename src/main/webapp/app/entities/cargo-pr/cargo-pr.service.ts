import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CargoPr } from './cargo-pr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CargoPr>;

@Injectable()
export class CargoPrService {

    private resourceUrl =  SERVER_API_URL + 'api/cargos';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/cargos';

    constructor(private http: HttpClient) { }

    create(cargo: CargoPr): Observable<EntityResponseType> {
        const copy = this.convert(cargo);
        return this.http.post<CargoPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cargo: CargoPr): Observable<EntityResponseType> {
        const copy = this.convert(cargo);
        return this.http.put<CargoPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CargoPr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CargoPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<CargoPr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CargoPr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<CargoPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<CargoPr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CargoPr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CargoPr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CargoPr[]>): HttpResponse<CargoPr[]> {
        const jsonResponse: CargoPr[] = res.body;
        const body: CargoPr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CargoPr.
     */
    private convertItemFromServer(cargo: CargoPr): CargoPr {
        const copy: CargoPr = Object.assign({}, cargo);
        return copy;
    }

    /**
     * Convert a CargoPr to a JSON which can be sent to the server.
     */
    private convert(cargo: CargoPr): CargoPr {
        const copy: CargoPr = Object.assign({}, cargo);
        return copy;
    }
}
