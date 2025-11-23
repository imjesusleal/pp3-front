import { TestBed } from '@angular/core/testing';

import { PacientesHttpService } from './pacientes-http.service';

describe('PacientesHttpService', () => {
  let service: PacientesHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacientesHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
