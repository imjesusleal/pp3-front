import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { pacientesGuard } from './pacientes.guard';

describe('pacientesGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => pacientesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
