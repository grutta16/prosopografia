import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ProfesionPr } from './profesion-pr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ProfesionPr>;

@Injectable()
export class ProfesionPrService {

    private resourceUrl =  SERVER_API_URL + 'api/profesions';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/profesions';

    constructor(private http: HttpClient) { }

    create(profesion: ProfesionPr): Observable<EntityResponseType> {
        const copy = this.convert(profesion);
        return this.http.post<ProfesionPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(profesion: ProfesionPr): Observable<EntityResponseType> {
        const copy = this.convert(profesion);
        return this.http.put<ProfesionPr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProfesionPr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProfesionPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProfesionPr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProfesionPr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ProfesionPr[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProfesionPr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProfesionPr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProfesionPr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProfesionPr[]>): HttpResponse<ProfesionPr[]> {
        const jsonResponse: ProfesionPr[] = res.body;
        const body: ProfesionPr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProfesionPr.
     */
    private convertItemFromServer(profesion: ProfesionPr): ProfesionPr {
        const copy: ProfesionPr = Object.assign({}, profesion);
        return copy;
    }

    /**
     * Convert a ProfesionPr to a JSON which can be sent to the server.
     */
    private convert(profesion: ProfesionPr): ProfesionPr {
        const copy: ProfesionPr = Object.assign({}, profesion);
        return copy;
    }
}
