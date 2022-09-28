import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';


// import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class CommonAPIService {

    private _adminHeaders = new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Accept: 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json'
    });

    constructor(public http: HttpClient) {

    }

    public getAdminHeaders(): HttpHeaders {
        if (localStorage.getItem('admin_token')) {
            // eslint-disable-next-line no-underscore-dangle
            this._adminHeaders = new HttpHeaders(
                {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    Authorization: 'Bearer ' + localStorage.getItem('admin_token')
                });
        } else {
            // eslint-disable-next-line no-underscore-dangle
            this._adminHeaders = new HttpHeaders({
                // eslint-disable-next-line @typescript-eslint/naming-convention
                Accept: 'application/json',
                // eslint-disable-next-line @typescript-eslint/naming-convention
                'Content-Type': 'application/json',
            });
        }
        // eslint-disable-next-line no-underscore-dangle
        return this._adminHeaders;
    }

    get(url: string, params?: any): Observable<any> {
        let queryStr = '';
        if (params) {
            Object.keys(params).forEach(key => {
                if (!params[key]) {
                    delete params[key];
                }
            });
            const httpParams = new HttpParams({
                fromObject: params
            });
            queryStr = httpParams.toString();
        }
        return this.http.get<any>(environment.apiUrl + url + (queryStr
            ? '?' + queryStr : ''),
            { headers: this.getAdminHeaders() })
            .pipe(
                map(response => response),
                catchError(error => throwError(error))
            );
    }

    getById(url: string, id: any): Observable<any> {
        return this.http.get<any>(environment.apiUrl + url + id, { headers: this.getAdminHeaders() })
            .pipe(
                map(response => response),
                catchError(error => throwError(error))
            );
    }

    post(url: string, data: any, isLogin?: boolean): Observable<any> {
        return this.http.post<any>(environment.apiUrl + url, data, { headers: this.getAdminHeaders() })
            .pipe(
                map(response => response),
                catchError(error => throwError(error))
            );
    }
    postuplaod(url: string, data: any, isLogin?: boolean): Observable<any> {

        return this.http.post<any>(environment.apiUrl + url, data, {
            reportProgress: true,
            observe: 'events', headers: this.getAdminHeaders()
        })
            .pipe(
                map(response => response),
                catchError(error => throwError(error))
            );
    }

    postWithFormData(url: string, data?: FormData): Observable<any> {
        // eslint-disable-next-line no-underscore-dangle
        const userHeaders = _.clone(this._adminHeaders);
        userHeaders.delete('Content-Type');
        const hdrs = new HttpHeaders({
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Authorization: 'Bearer ' + localStorage.getItem('admin_token'),
        });
        if (localStorage.getItem('admin_token')) {
            return this.http.post<any>(environment.apiUrl + url, data, { headers: hdrs })
                .pipe(
                    map(response => response),
                    catchError(error => throwError(error))
                );
        } else {
            return this.http.post<any>(environment.apiUrl + url, data)
                .pipe(
                    map(response => response),
                    catchError(error => throwError(error))
                );
        }
    }

    put(url: string, data?: any, id?: any): Observable<any> {
        if (typeof data === 'object' && data.id) {
            delete data.id;
        }

        if (id) {
            return this.http.put<any>(environment.apiUrl + url + '/' + id, data, { headers: this.getAdminHeaders() })
                .pipe(
                    map(response => response),
                    catchError(error => throwError(error))
                );
        } else {
            return this.http.put<any>(environment.apiUrl + url, data, { headers: this.getAdminHeaders() })
                .pipe(
                    map(response => response),
                    catchError(error => throwError(error))
                );
        }
    }

    putWithFormData(url: string, data?: FormData): Observable<any> {
        // eslint-disable-next-line no-underscore-dangle
        const userHeaders = _.clone(this._adminHeaders);
        userHeaders.delete('Content-Type');
        return this.http.put<any>(environment.apiUrl + url, data, { headers: userHeaders })
            .pipe(
                map(response => response),
                catchError(error => throwError(error))
            );
    }

    putWithProgress(url: string, data?: FormData) {
        // eslint-disable-next-line no-underscore-dangle
        const userHeaders = _.clone(this._adminHeaders);
        userHeaders.delete('Content-Type');
        return this.http.put(environment.apiUrl + url, data, {
            headers: userHeaders,
            observe: 'events',
            reportProgress: true,
        });
    }

    postWithProgress(url: string, data?: FormData) {
        // eslint-disable-next-line no-underscore-dangle
        const userHeaders = _.clone(this._adminHeaders);
        userHeaders.delete('Content-Type');
        return this.http.post(environment.apiUrl + url, data, {
            headers: userHeaders,
            observe: 'events',
            reportProgress: true,
        });
    }

    delete(url: string): Observable<object> {
        return this.http.delete<any>(environment.apiUrl + url, { headers: this.getAdminHeaders() })
            .pipe(
                map(response => response),
                catchError(error => throwError(error))
            );
    }
}
