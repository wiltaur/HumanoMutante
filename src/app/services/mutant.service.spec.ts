import { TestBed } from '@angular/core/testing';

import { MutantService } from './mutant.service';

describe('MutantService', () => {
  let service: MutantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MutantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
