import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoinsService {

  private REST_API_SERVER = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

}
