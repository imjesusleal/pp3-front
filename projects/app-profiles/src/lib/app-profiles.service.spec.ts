import { TestBed } from '@angular/core/testing';

import { AppProfilesService } from './app-profiles.service';

describe('AppProfilesService', () => {
  let service: AppProfilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppProfilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
