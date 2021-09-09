import { TestBed } from '@angular/core/testing';

import { AppStateGuard } from './appState.guard';

describe('AppStateGuard', () => {
  let guard: AppStateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AppStateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
