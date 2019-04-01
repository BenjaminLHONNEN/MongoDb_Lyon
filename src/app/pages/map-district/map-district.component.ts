import {Component, OnInit} from '@angular/core';
import {DistrictService} from '../../services/district/district.service';
import * as mapboxgl from 'mapbox-gl';
import {DistrictCollection, DistrictModel} from '../../models/district/district-model';

@Component({
  selector: 'app-map-district',
  templateUrl: './map-district.component.html',
  styleUrls: ['./map-district.component.scss']
})
export class MapDistrictComponent implements OnInit {

  map: mapboxgl.Map;
  lat = 45.745672;
  long = 4.839269;
  style = 'mapbox://styles/mapbox/outdoors-v9';

  source: any;
  districts: any;

  districArray: Array<DistrictModel>;

  constructor(private districtService: DistrictService) {
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.districts = this.districtService.getDistricts();
    this.initialiseMap();
  }

  private initialiseMap() {
    console.log('initialiseMap');
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

  private buildMap() {
    console.log('buildMap');
    this.map = new mapboxgl.Map({
      container: 'map',
      zoom: 10,
      style: this.style,
      center: [this.long, this.lat]
    });
    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', (event) => {
      const colors = [
        '#1abc9c',
        '#16a085',
        '#2ecc71',
        '#27ae60',
        '#3498db',
        '#2980b9',
        '#9b59b6',
        '#8e44ad',
        '#34495e',
        '#2c3e50',
        '#f1c40f',
        '#f39c12',
        '#e67e22',
        '#d35400',
        '#e74c3c',
        '#c0392b',
        '#ecf0f1',
        '#bdc3c7',
        '#95a5a6',
        '#7f8c8d',
      ];
      let color = 0;
      this.districts.subscribe(districts => {
        this.districArray = districts;
        for (const i of districts) {
          this.map.addSource('district' + i.properties.gid, {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: []
            }
          });
          this.source = this.map.getSource('district' + i.properties.gid);
          const data = new DistrictCollection([i]);
          this.source.setData(data);
          this.map.addLayer({
            id: 'district' + i.properties.gid,
            source: 'district' + i.properties.gid,
            'type': 'fill',
            layout: {},
            paint: {
              'fill-color': colors[color],
              'fill-opacity': 0.8
            }
          });
          color++;
          if (color === colors.length) {
            color = 0;
          }
        }
      });
    });
  }

  clicOn(distric: DistrictModel) {
    this.flyTo(distric.geometry.coordinates[0][0][0], distric.geometry.coordinates[0][0][1]);
  }

  flyTo(long, latt) {
    this.map.flyTo({
      center: [long, latt]
    });
  }
}
