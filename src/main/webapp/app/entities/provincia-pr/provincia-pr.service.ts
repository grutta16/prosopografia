import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ProvinciaPr } from './provincia-pr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ProvinciaPr>;

@Injectable()
export class ProvinciaPrService {

    private resourceUrl =  SERVER_API_URL + 'api/provincias';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/provincias';

    constructor(private http: HttpClient) { }

    create(provincia: ProvinciaPr): Observable<EntityResponseType> {
        const copy = this.convert(provincia);
        return this.http.post<ProvinciaPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(provincia: ProvinciaPr): Observable<EntityResponseType> {
        const copy = this.convert(provincia);
        return this.http.put<ProvinciaPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProvinciaPr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProvinciaPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProvinciaPr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProvinciaPr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ProvinciaPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProvinciaPr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProvinciaPr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProvinciaPr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProvinciaPr[]>): HttpResponse<ProvinciaPr[]> {
        const jsonResponse: ProvinciaPr[] = res.body;
        const body: ProvinciaPr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProvinciaPr.
     */
    private convertItemFromServer(provincia: ProvinciaPr): ProvinciaPr {
        const copy: ProvinciaPr = Object.assign({}, provincia);
        return copy;
    }

    /**
     * Convert a ProvinciaPr to a JSON which can be sent to the server.
     */
    private convert(provincia: ProvinciaPr): ProvinciaPr {
        const copy: ProvinciaPr = Object.assign({}, provincia);
        return copy;
    }
}
