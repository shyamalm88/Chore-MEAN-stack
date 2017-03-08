import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';



@Injectable()
export class HttpService {

  constructor(private http: Http) { }

  //get all data
  public getData(url: string): Observable<Response> {
    console.log(url);
    return this.http.get(url).map(this.extractData).catch(this.handleError);
  }

  public socialLogin(url: string): Observable<Response> {
    return this.http.get(url).map(this.extractData).catch(this.handleError);
  }

  //posting data
  public postData(url: string, data: any): Observable<Response> {
    console.log(url, data);
    return this.http.post(url, data).map(this.extractData).catch(this.handleError);
  }

  //editing data
  public editData(url: string, data: any): Observable<Response> {
    console.log(url, data);
    return this.http.put(url, data).map(this.extractData).catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }


  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}