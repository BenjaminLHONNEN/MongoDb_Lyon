import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapTouristicAreaComponent } from './map-touristic-area.component';

describe('MapTouristicAreaComponent', () => {
  let component: MapTouristicAreaComponent;
  let fixture: ComponentFixture<MapTouristicAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapTouristicAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapTouristicAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
