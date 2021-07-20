import { TestBed } from '@angular/core/testing';

import { HttpFilterInterceptor } from './http-filter.interceptor';

describe('HttpFilterInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpFilterInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpFilterInterceptor = TestBed.inject(HttpFilterInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
