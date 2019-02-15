import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ReligionPr } from './religion-pr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ReligionPr>;

@Injectable()
export class ReligionPrService {

    private resourceUrl =  SERVER_API_URL + 'api/religions';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/religions';

    constructor(private http: HttpClient) { }

    create(religion: ReligionPr): Observable<EntityResponseType> {
        const copy = this.convert(religion);
        return this.http.post<ReligionPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(religion: ReligionPr): Observable<EntityResponseType> {
        const copy = this.convert(religion);
        return this.http.put<ReligionPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ReligionPr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ReligionPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<ReligionPr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ReligionPr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ReligionPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<ReligionPr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ReligionPr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ReligionPr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ReligionPr[]>): HttpResponse<ReligionPr[]> {
        const jsonResponse: ReligionPr[] = res.body;
        const body: ReligionPr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ReligionPr.
     */
    private convertItemFromServer(religion: ReligionPr): ReligionPr {
        const copy: ReligionPr = Object.assign({}, religion);
        return copy;
    }

    /**
     * Convert a ReligionPr to a JSON which can be sent to the server.
     */
    private convert(religion: ReligionPr): ReligionPr {
        const copy: ReligionPr = Object.assign({}, religion);
        return copy;
    }
}
