import { Injectable } from '@angular/core';
// import { HttpClient } from 'selenium-webdriver/http'; // watch out for this gotcha!
import { HttpClient } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExtCommsService {
  constructor(private http: HttpClient) {}

  getDummyData(testArg: string) {
    return this.http.get<any>('assets/api/dummyResult.json');
  }

  getDelayedDummyData() {
    return this.http
      .get('assets/api/dummyResult.json')
      .pipe(debounceTime(1000));
  }
}
