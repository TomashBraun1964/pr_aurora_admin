import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { throwError } from 'rxjs';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { ErrorHandlingService } from './error-handling.service';
import { ErrorResponse } from '../models/error-response.model';

describe('HttpErrorInterceptor', () => {
  let errorHandlingServiceSpy: jasmine.SpyObj<ErrorHandlingService>;

  beforeEach(() => {
    errorHandlingServiceSpy = jasmine.createSpyObj('ErrorHandlingService', ['handleError']);

    TestBed.configureTestingModule({
      providers: [{ provide: ErrorHandlingService, useValue: errorHandlingServiceSpy }],
    });
  });

  it('should call ErrorHandlingService.handleError on network error (status 0)', (done) => {
    const req = new HttpRequest('GET', '/test');
    const networkError = new HttpErrorResponse({ status: 0, statusText: 'Unknown Error', url: '/test' });

    // next handler that simulates a backend error
    const next = (_: HttpRequest<unknown>) => throwError(() => networkError) as unknown as import('rxjs').Observable<HttpEvent<unknown>>;

    TestBed.runInInjectionContext(() => {
      HttpErrorInterceptor(req, next).subscribe({
        next: () => fail('Expected error'),
        error: (err: any) => {
          expect(errorHandlingServiceSpy.handleError).toHaveBeenCalled();
          const calledArg = errorHandlingServiceSpy.handleError.calls.mostRecent().args[0];
          expect(calledArg instanceof ErrorResponse).toBeTrue();
          expect(calledArg.status).toBe(0);
          done();
        },
      });
    });
  });
});
