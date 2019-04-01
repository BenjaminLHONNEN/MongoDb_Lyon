import { VelovAccess } from './velovAccess.service';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';


describe('Service: VelovAccessServices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VelovAccess]
    });
  });

  it("should ...", inject([VelovAccess], (service: VelovAccess) => {
    expect(service).toBeTruthy();
  }));
});
