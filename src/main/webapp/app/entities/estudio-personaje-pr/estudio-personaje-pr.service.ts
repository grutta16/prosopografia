import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { EstudioPersonajePr } from './estudio-personaje-pr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<EstudioPersonajePr>;

@Injectable()
export class EstudioPersonajePrService {

    private resourceUrl =  SERVER_API_URL + 'api/estudio-personajes';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/estudio-personajes';

    constructor(private http: HttpClient) { }

    create(estudioPersonaje: EstudioPersonajePr): Observable<EntityResponseType> {
        const copy = this.convert(estudioPersonaje);
        return this.http.post<EstudioPersonajePr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(estudioPersonaje: EstudioPersonajePr): Observable<EntityResponseType> {
        const copy = this.convert(estudioPersonaje);
        return this.http.put<EstudioPersonajePr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<EstudioPersonajePr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<EstudioPersonajePr[]>> {
        const options = createRequestOption(req);
        return this.http.get<EstudioPersonajePr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EstudioPersonajePr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<EstudioPersonajePr[]>> {
        const options = createRequestOption(req);
        return this.http.get<EstudioPersonajePr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EstudioPersonajePr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: EstudioPersonajePr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<EstudioPersonajePr[]>): HttpResponse<EstudioPersonajePr[]> {
        const jsonResponse: EstudioPersonajePr[] = res.body;
        const body: EstudioPersonajePr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to EstudioPersonajePr.
     */
    private convertItemFromServer(estudioPersonaje: EstudioPersonajePr): EstudioPersonajePr {
        const copy: EstudioPersonajePr = Object.assign({}, estudioPersonaje);
        return copy;
    }

    /**
     * Convert a EstudioPersonajePr to a JSON which can be sent to the server.
     */
    private convert(estudioPersonaje: EstudioPersonajePr): EstudioPersonajePr {
        const copy: EstudioPersonajePr = Object.assign({}, estudioPersonaje);
        return copy;
    }
}
