import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TipoProfesionPr } from './tipo-profesion-pr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TipoProfesionPr>;

@Injectable()
export class TipoProfesionPrService {

    private resourceUrl =  SERVER_API_URL + 'api/tipo-profesions';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/tipo-profesions';

    constructor(private http: HttpClient) { }

    create(tipoProfesion: TipoProfesionPr): Observable<EntityResponseType> {
        const copy = this.convert(tipoProfesion);
        return this.http.post<TipoProfesionPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tipoProfesion: TipoProfesionPr): Observable<EntityResponseType> {
        const copy = this.convert(tipoProfesion);
        return this.http.put<TipoProfesionPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TipoProfesionPr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TipoProfesionPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<TipoProfesionPr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TipoProfesionPr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<TipoProfesionPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<TipoProfesionPr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TipoProfesionPr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TipoProfesionPr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TipoProfesionPr[]>): HttpResponse<TipoProfesionPr[]> {
        const jsonResponse: TipoProfesionPr[] = res.body;
        const body: TipoProfesionPr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TipoProfesionPr.
     */
    private convertItemFromServer(tipoProfesion: TipoProfesionPr): TipoProfesionPr {
        const copy: TipoProfesionPr = Object.assign({}, tipoProfesion);
        return copy;
    }

    /**
     * Convert a TipoProfesionPr to a JSON which can be sent to the server.
     */
    private convert(tipoProfesion: TipoProfesionPr): TipoProfesionPr {
        const copy: TipoProfesionPr = Object.assign({}, tipoProfesion);
        return copy;
    }
}
