import { TestBed } from '@angular/core/testing';

import { CommonGuard } from './common.guard';

describe('CommonGuard', () => {
  let guard: CommonGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CommonGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
