import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable, of, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { Result, Test, errorResults, v1Tests } from './tests';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private statusSubject = new BehaviorSubject<boolean>(false);
  private resultSubject = new BehaviorSubject<Result[] | undefined>(undefined);
  running$ = this.statusSubject.asObservable();
  result$ = this.resultSubject.asObservable();


  private httpClients: { [key: string]: (endpoint: string) => Observable<any> } = {}

  constructor(private httpClient: HttpClient) {
    this.httpClients['GET'] = (endpoint: string) =>
      this.httpClient.get<any>(endpoint).pipe(
        timeout(5000),
        catchError(this.handleError.bind(this))
      );
  }

  private checkHttpStatus(error: any): Result {
    switch (true) {
      case error.status === 0:
        return error.error instanceof ProgressEvent ? errorResults['network'] : errorResults['cors'];
      case error.status >= 400 && error.status < 500:
        return errorResults['client'];
      case error.status >= 500:
        return errorResults['server'];
      default:
        return errorResults['unknown'];
    }
  }

  private handleError(error: any): Observable<never> {
    let errorResult: Result;

    switch (true) {
      case error instanceof HttpErrorResponse:
        errorResult = this.checkHttpStatus(error);
        break;
      case error.name === 'TimeoutError':
        errorResult = errorResults['timeout'];
        break;
      default:
        errorResult = errorResults['unknown'];
        break;
    }

    this.resultSubject.next([errorResult, ...(this.resultSubject.value ?? [])]);
    return throwError(() => new Error());
  }

  async start(data: { protocol: string, hostname: string, port: number }): Promise<void> {
    this.resultSubject.next([])
    this.statusSubject.next(true);

    const promises = v1Tests.map(async test => {

      const obs$ = this.httpClients[test.method.toUpperCase()](`${data.hostname}${test.endpoint}`)

      try {
        const data = await lastValueFrom(obs$)
        if (data instanceof Array) {
          test.tests.forEach(t => {
            const allPass = data.map(d => t.execute(d)).filter(a => !a.status);
            if(allPass.length > 0)
              this.resultSubject.next([allPass[0], ...(this.resultSubject.value ?? [])]);
            else
              this.resultSubject.next([t.execute(data[0]), ...(this.resultSubject.value ?? [])]);
          });
        } else {
          test.tests.forEach(t => {
            this.resultSubject.next([t.execute(data), ...(this.resultSubject.value ?? [])]);
          })
        }
      } catch (_) { }
    });


    try {
      await Promise.all(promises)
    } catch (_) {}
    finally{
      this.statusSubject.next(false);
    }
  }
}
