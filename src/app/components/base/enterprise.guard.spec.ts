import { TestBed, async, inject } from '@angular/core/testing';

import { EnterpriseGuard } from './enterprise.guard';

describe('EnterpriseGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnterpriseGuard]
    });
  });

  it('should ...', inject([EnterpriseGuard], (guard: EnterpriseGuard) => {
    expect(guard).toBeTruthy();
  }));
});
