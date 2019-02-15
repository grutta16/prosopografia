import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CandidaturaPr } from './candidatura-pr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CandidaturaPr>;

@Injectable()
export class CandidaturaPrService {

    private resourceUrl =  SERVER_API_URL + 'api/candidaturas';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/candidaturas';

    constructor(private http: HttpClient) { }

    create(candidatura: CandidaturaPr): Observable<EntityResponseType> {
        const copy = this.convert(candidatura);
        return this.http.post<CandidaturaPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(candidatura: CandidaturaPr): Observable<EntityResponseType> {
        const copy = this.convert(candidatura);
        return this.http.put<CandidaturaPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CandidaturaPr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CandidaturaPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<CandidaturaPr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CandidaturaPr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<CandidaturaPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<CandidaturaPr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CandidaturaPr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CandidaturaPr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CandidaturaPr[]>): HttpResponse<CandidaturaPr[]> {
        const jsonResponse: CandidaturaPr[] = res.body;
        const body: CandidaturaPr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CandidaturaPr.
     */
    private convertItemFromServer(candidatura: CandidaturaPr): CandidaturaPr {
        const copy: CandidaturaPr = Object.assign({}, candidatura);
        return copy;
    }

    /**
     * Convert a CandidaturaPr to a JSON which can be sent to the server.
     */
    private convert(candidatura: CandidaturaPr): CandidaturaPr {
        const copy: CandidaturaPr = Object.assign({}, candidatura);
        return copy;
    }
}
