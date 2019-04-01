import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapVelovComponent } from './map-velov.component';

describe('MapVelovComponent', () => {
  let component: MapVelovComponent;
  let fixture: ComponentFixture<MapVelovComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapVelovComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapVelovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
