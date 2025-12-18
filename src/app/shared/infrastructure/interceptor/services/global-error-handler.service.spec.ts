import { TestBed } from '@angular/core/testing';
import { GlobalErrorHandler } from './global-error-handler.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LoggingService } from '@shared/infrastructures/logging/logging.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

describe('GlobalErrorHandler', () => {
  let handler: GlobalErrorHandler;
  let messageSpy: jasmine.SpyObj<NzMessageService>;
  let loggingSpy: jasmine.SpyObj<LoggingService>;
  let modalSpy: jasmine.SpyObj<NzModalService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    messageSpy = jasmine.createSpyObj('NzMessageService', ['error']);
    loggingSpy = jasmine.createSpyObj('LoggingService', ['error', 'logErrorResponse']);
    modalSpy = jasmine.createSpyObj('NzModalService', ['create', 'closeAll']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({});
    // Не создаём реальный инстанс через Angular DI — это вызывает создание Angular internals
    handler = undefined as unknown as GlobalErrorHandler;
  });

  it('should log JS Error and show a toast', () => {
    const error = new Error('Test error');
    const ctx: any = {
      message: messageSpy,
      modalService: modalSpy,
      router: routerSpy,
      logger: loggingSpy,
      ngZone: { run: (fn: any) => fn() },
      context: 'GlobalErrorHandler',
      handledErrors: new Set<string>(),
      isAlreadyProcessedError: (_: any) => false,
    };

    // Вызовем метод напрямую, подменив this
    (GlobalErrorHandler.prototype as any).handleError.call(ctx, error);
    expect(loggingSpy.error).toHaveBeenCalled();
    expect(messageSpy.error).toHaveBeenCalled();
  });
});
