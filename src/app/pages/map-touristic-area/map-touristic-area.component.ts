import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TouristicAreaCollection, TouristicAreaModel} from '../../models/touristic-area/touristic-area-model';
import * as mapboxgl from 'mapbox-gl';
import {TouristicAreaService} from '../../services/touristic-area/touristic-area.service';

@Component({
  selector: 'app-map-touristic-area',
  templateUrl: './map-touristic-area.component.html',
  styleUrls: ['./map-touristic-area.component.scss']
})
export class MapTouristicAreaComponent implements OnInit {

  @ViewChild('detailElement') detailElement: ElementRef;

  map: mapboxgl.Map;
  lat = 45.745672;
  long = 4.839269;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  source: any;
  touristicAreas: any;
  touristicAreasArray: Array<TouristicAreaModel>;
  touristicArea: TouristicAreaModel;

  constructor(private touristicAreaService: TouristicAreaService) {
  }

  ngOnInit() {
    this.touristicAreas = this.touristicAreaService.getTouristicAreaNear(this.long, this.lat, 30);
    this.initialiseMap();
  }

  private initialiseMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        // this.map.flyTo({
        //   center: [this.long, this.lat]
        // });
      });
    }
    this.buildMap();
  }

  closeDetail() {
    this.detailElement.nativeElement.classList.remove('display');
  }

  private buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      zoom: 18,
      style: this.style,
      center: [this.long, this.lat]
    });
    this.map.scrollZoom.disable();
    this.map.addControl(new mapboxgl.NavigationControl());

    const detailElement = this.detailElement;
    this.map.on('click', 'touristicAreas', (e) => {
      this.touristicArea = e.features[0];
      detailElement.nativeElement.classList.add('display');
    });

    const map = this.map;
    this.map.on('mouseenter', 'touristicAreas', function () {
      map.getCanvas().style.cursor = 'pointer';
    });

    this.map.on('mouseleave', 'touristicAreas', function () {
      map.getCanvas().style.cursor = '';
    });
    this.map.on('mouseup', () => {
      if (this.lat !== this.map.getCenter().lat || this.long !== this.map.getCenter().lng) {
        this.lat = this.map.getCenter().lat;
        this.long = this.map.getCenter().lng;
        this.map.removeLayer('touristicAreas');
        this.map.removeSource('touristicAreas');
        this.touristicAreas = this.touristicAreaService.getTouristicAreaNear(this.long, this.lat);
        this.touristicAreas.subscribe(touristicAreas => {
          this.touristicAreasArray = touristicAreas;
          this.map.addSource('touristicAreas', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: []
            }
          });
          this.source = this.map.getSource('touristicAreas');
          const data = new TouristicAreaCollection(touristicAreas);
          this.source.setData(data);
          this.map.addLayer({
            id: 'touristicAreas',
            source: 'touristicAreas',
            'type': 'symbol',
            layout: {
              'text-field': '{message}',
              'text-size': 24,
              'text-transform': 'uppercase',
              'icon-image': 'monument-15',
              'text-offset': [0, 1.5]
            },
            paint: {
              'text-color': '#F16624',
              'text-halo-color': '#FFF',
              'text-halo-width': 2
            }
          });
        });
      }
    });

    this.map.on('load', () => {
      this.touristicAreas.subscribe(touristicAreas => {
        this.touristicAreasArray = touristicAreas;
        this.map.addSource('touristicAreas', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: []
          }
        });
        this.source = this.map.getSource('touristicAreas');
        const data = new TouristicAreaCollection(touristicAreas);
        this.source.setData(data);
        this.map.addLayer({
          id: 'touristicAreas',
          source: 'touristicAreas',
          'type': 'symbol',
          layout: {
            'text-field': '{message}',
            'text-size': 24,
            'text-transform': 'uppercase',
            'icon-image': 'monument-15',
            'text-offset': [0, 1.5]
          },
          paint: {
            'text-color': '#F16624',
            'text-halo-color': '#FFF',
            'text-halo-width': 2
          }
        });
      });
    });
  }

  clicOn(touristicAreaModel: TouristicAreaModel) {
    this.touristicArea = touristicAreaModel;
    this.detailElement.nativeElement.classList.add('display');
    this.flyTo(touristicAreaModel.geometry.coordinates[0], touristicAreaModel.geometry.coordinates[1]);
  }

  flyTo(long, latt) {
    this.map.flyTo({
      center: [long, latt]
    });
  }
}
