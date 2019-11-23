import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoinsService {

  private apiURL = 'https://bravenewcoin-v1.p.rapidapi.com';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'x-rapidapi-key': '78a4f7a824mshc139234a286ab1ep1bd37djsn0e0c176f8a7b'
    })
  };

  GetCoins(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/prices?coin=btc`, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandle));
  }

  // Error handling
  errorHandle(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
