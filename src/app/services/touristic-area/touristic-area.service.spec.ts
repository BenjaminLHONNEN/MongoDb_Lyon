import { TestBed } from '@angular/core/testing';

import { TouristicAreaService } from './touristic-area.service';

describe('TouristicAreaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TouristicAreaService = TestBed.get(TouristicAreaService);
    expect(service).toBeTruthy();
  });
});
