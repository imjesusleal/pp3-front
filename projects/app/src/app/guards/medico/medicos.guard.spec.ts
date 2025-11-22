import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { medicosGuard } from './medicos.guard';

describe('medicosGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => medicosGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
