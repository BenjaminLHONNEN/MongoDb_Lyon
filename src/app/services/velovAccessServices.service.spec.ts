/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VelovAccessServicesService } from './velovAccessServices.service';

describe('Service: VelovAccessServices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VelovAccessServicesService]
    });
  });

  it('should ...', inject([VelovAccessServicesService], (service: VelovAccessServicesService) => {
    expect(service).toBeTruthy();
  }));
});
