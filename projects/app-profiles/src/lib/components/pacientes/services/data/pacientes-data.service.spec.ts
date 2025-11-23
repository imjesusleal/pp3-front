import { TestBed } from '@angular/core/testing';

import { PacientesDataService } from './pacientes-data.service';

describe('PacientesDataService', () => {
  let service: PacientesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacientesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
