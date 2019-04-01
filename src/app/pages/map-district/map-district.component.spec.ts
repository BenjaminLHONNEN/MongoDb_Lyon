import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDistrictComponent } from './map-district.component';

describe('MapDistrictComponent', () => {
  let component: MapDistrictComponent;
  let fixture: ComponentFixture<MapDistrictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapDistrictComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
