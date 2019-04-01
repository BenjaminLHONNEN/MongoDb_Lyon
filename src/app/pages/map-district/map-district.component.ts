import {Component, OnInit} from '@angular/core';
import {DistrictService} from '../../services/district/district.service';
import * as mapboxgl from 'mapbox-gl';
import {DistrictCollection} from '../../models/district/district-model';

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

  constructor(private districtService: DistrictService) {
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.districts = this.districtService.getDistrictNear(this.long, this.lat);
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
      zoom: 13,
      style: this.style,
      center: [this.long, this.lat]
    });
    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', (event) => {
      console.log('map load');
      this.map.addSource('districts', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });
      this.source = this.map.getSource('districts');

      this.districts.subscribe(districts => {
        console.log(districts);
        const data = new DistrictCollection(districts);
        this.source.setData(data);
      });

      this.map.addLayer({
        id: 'districts',
        source: 'districts',
        type: 'symbol',
        layout: {
          'text-field': '{message}',
          'text-size': 24,
          'text-trasform': 'uppercase',
          'icon-image': 'rocket-15',
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

  flyTo(long, latt) {
    this.map.flyTo({
      center: [long, latt]
    });
  }
}
