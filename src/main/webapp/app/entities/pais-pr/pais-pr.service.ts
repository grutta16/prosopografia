import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PaisPr } from './pais-pr.model';
import { ProvinciaPr } from '../provincia-pr/provincia-pr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PaisPr>;

@Injectable()
export class PaisPrService {

    private resourceUrl =  SERVER_API_URL + 'api/pais';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/pais';

    constructor(private http: HttpClient) { }

    create(pais: PaisPr): Observable<EntityResponseType> {
        const copy = this.convert(pais);
        return this.http.post<PaisPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(pais: PaisPr): Observable<EntityResponseType> {
        const copy = this.convert(pais);
        return this.http.put<PaisPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PaisPr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PaisPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<PaisPr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PaisPr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<PaisPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<PaisPr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PaisPr[]>) => this.convertArrayResponse(res));
    }

    getProvincias(id: number): Observable<HttpResponse<ProvinciaPr[]>> {
        return this.http.get<ProvinciaPr[]>(`${this.resourceUrl}/provincias/${id}`, {observe: 'response'})
            .map((res: HttpResponse<ProvinciaPr[]>) => this.convertArrayResponseProvincias(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PaisPr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PaisPr[]>): HttpResponse<PaisPr[]> {
        const jsonResponse: PaisPr[] = res.body;
        const body: PaisPr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    private convertArrayResponseProvincias(res: HttpResponse<ProvinciaPr[]>): HttpResponse<ProvinciaPr[]> {
        const jsonResponse: ProvinciaPr[] = res.body;
        const body: ProvinciaPr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PaisPr.
     */
    private convertItemFromServer(pais: PaisPr): PaisPr {
        const copy: PaisPr = Object.assign({}, pais);
        return copy;
    }

    /**
     * Convert a PaisPr to a JSON which can be sent to the server.
     */
    private convert(pais: PaisPr): PaisPr {
        const copy: PaisPr = Object.assign({}, pais);
        return copy;
    }
}
