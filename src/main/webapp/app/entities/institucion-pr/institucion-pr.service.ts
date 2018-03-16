import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { InstitucionPr } from './institucion-pr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<InstitucionPr>;

@Injectable()
export class InstitucionPrService {

    private resourceUrl =  SERVER_API_URL + 'api/institucions';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/institucions';

    constructor(private http: HttpClient) { }

    create(institucion: InstitucionPr): Observable<EntityResponseType> {
        const copy = this.convert(institucion);
        return this.http.post<InstitucionPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(institucion: InstitucionPr): Observable<EntityResponseType> {
        const copy = this.convert(institucion);
        return this.http.put<InstitucionPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<InstitucionPr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<InstitucionPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<InstitucionPr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<InstitucionPr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<InstitucionPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<InstitucionPr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<InstitucionPr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: InstitucionPr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<InstitucionPr[]>): HttpResponse<InstitucionPr[]> {
        const jsonResponse: InstitucionPr[] = res.body;
        const body: InstitucionPr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to InstitucionPr.
     */
    private convertItemFromServer(institucion: InstitucionPr): InstitucionPr {
        const copy: InstitucionPr = Object.assign({}, institucion);
        return copy;
    }

    /**
     * Convert a InstitucionPr to a JSON which can be sent to the server.
     */
    private convert(institucion: InstitucionPr): InstitucionPr {
        const copy: InstitucionPr = Object.assign({}, institucion);
        return copy;
    }
}
