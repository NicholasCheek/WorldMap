import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private infoUrl = 'https://api.worldbank.org/v2/country';

  constructor(private http: HttpClient) {}

  getInfo(code: string) :Observable<any> {
    var url = `${this.infoUrl}/${code}?format=json`
    return this.http.get(url)
  }

}

