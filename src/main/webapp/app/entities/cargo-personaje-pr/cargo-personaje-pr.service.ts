import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CargoPersonajePr } from './cargo-personaje-pr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CargoPersonajePr>;

@Injectable()
export class CargoPersonajePrService {

    private resourceUrl =  SERVER_API_URL + 'api/cargo-personajes';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/cargo-personajes';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(cargoPersonaje: CargoPersonajePr): Observable<EntityResponseType> {
        const copy = this.convert(cargoPersonaje);
        return this.http.post<CargoPersonajePr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cargoPersonaje: CargoPersonajePr): Observable<EntityResponseType> {
        const copy = this.convert(cargoPersonaje);
        return this.http.put<CargoPersonajePr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CargoPersonajePr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CargoPersonajePr[]>> {
        const options = createRequestOption(req);
        return this.http.get<CargoPersonajePr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CargoPersonajePr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<CargoPersonajePr[]>> {
        const options = createRequestOption(req);
        return this.http.get<CargoPersonajePr[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CargoPersonajePr[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CargoPersonajePr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CargoPersonajePr[]>): HttpResponse<CargoPersonajePr[]> {
        const jsonResponse: CargoPersonajePr[] = res.body;
        const body: CargoPersonajePr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CargoPersonajePr.
     */
    private convertItemFromServer(cargoPersonaje: CargoPersonajePr): CargoPersonajePr {
        const copy: CargoPersonajePr = Object.assign({}, cargoPersonaje);
        copy.fechaInicio = this.dateUtils
            .convertLocalDateFromServer(cargoPersonaje.fechaInicio);
        copy.fechaFin = this.dateUtils
            .convertLocalDateFromServer(cargoPersonaje.fechaFin);
        return copy;
    }

    /**
     * Convert a CargoPersonajePr to a JSON which can be sent to the server.
     */
    private convert(cargoPersonaje: CargoPersonajePr): CargoPersonajePr {
        const copy: CargoPersonajePr = Object.assign({}, cargoPersonaje);
        copy.fechaInicio = this.dateUtils
            .convertLocalDateToServer(cargoPersonaje.fechaInicio);
        copy.fechaFin = this.dateUtils
            .convertLocalDateToServer(cargoPersonaje.fechaFin);
        return copy;
    }
}
