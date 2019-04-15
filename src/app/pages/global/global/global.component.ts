import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DistrictService} from '../../../services/district/district.service';
import {TouristicAreaService} from '../../../services/touristic-area/touristic-area.service';
import {VelovAccess} from '../../../services/velov/velovAccess.service';
import {DistrictCollection, DistrictModel} from '../../../models/district/district-model';
import {TouristicAreaCollection, TouristicAreaModel} from '../../../models/touristic-area/touristic-area-model';
import * as mapboxgl from 'mapbox-gl';
import {VelovCollection, VelovModel} from '../../../models/velov/velov';
import {AdressServiceService} from '../../../services/adress/adress-service.service';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})
export class GlobalComponent implements OnInit {

  @ViewChild('detailElement') detailElement: ElementRef;

  displayVelov = true;
  displayDistricts = false;
  displayTouristicArea = false;

  displayVelovLoaded = true;
  displayDistrictsLoaded = false;
  displayTouristicAreaLoaded = false;

  isMapLoaded = false;

  map: mapboxgl.Map;
  lat = 45.745672;
  long = 4.839269;
  style = 'mapbox://styles/mapbox/outdoors-v9';

  source: any;

  districts: Array<DistrictModel>;
  touristicAreas: Array<TouristicAreaModel>;
  velovs: Array<VelovModel>;

  detailVelov: VelovModel;
  detailTouristicArea: TouristicAreaModel;

  adresses: any;

  constructor(private districtService: DistrictService,
              private touristicAreaService: TouristicAreaService,
              private velovService: VelovAccess,
              private searchAdressService: AdressServiceService) {
  }

  goToSearch(search) {
    this.flyTo(search.geometry.coordinates[0], search.geometry.coordinates[1]);
    this.onMapPositionChange();
  }

  onSearchKeyPress(e) {
    console.log(e.srcElement.value);
    this.searchAdressService.searchAdress(e.srcElement.value).subscribe((ad) => {
      this.adresses = ad;
      console.log(ad);
    });
  }

  ngOnInit() {
    this.initialiseMap();
  }

  private initialiseMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.flyTo(position.coords.longitude, position.coords.latitude);
      });
    }
    this.buildMap();
  }

  private buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      zoom: 16,
      style: this.style,
      center: [this.long, this.lat]
    });
    this.map.scrollZoom.disable();
    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('dragend', (e) => {
      console.log(e);
      if (this.lat !== this.map.getCenter().lat || this.long !== this.map.getCenter().lng) {
        this.onMapPositionChange();
      }
    });

    this.map.on('load', (event) => {
        this.isMapLoaded = true;
        this.reloadMap();
      }
    );

  }

  reloadMap() {

    const pos = this.map.getBounds();

    if (this.displayDistricts) {
      this.districtService.getDistrictBetween(pos._ne.lng, pos._ne.lat, pos._sw.lng, pos._sw.lat)
        .subscribe((districts: Array<DistrictModel>) => {
          this.setupDistricts(districts);
        });
    }
    if (this.displayTouristicArea) {
      this.touristicAreaService.getTouristicBetween(pos._ne.lng, pos._ne.lat, pos._sw.lng, pos._sw.lat)
        .subscribe((touristicAreas: Array<TouristicAreaModel>) => {

          this.setupTouristicArea(touristicAreas);
          this.map.on('mouseenter', 'touristicAreas', () => {
            this.map.getCanvas().style.cursor = 'pointer';
          });

          this.map.on('mouseleave', 'touristicAreas', () => {
            this.map.getCanvas().style.cursor = '';
          });

          this.map.on('click', 'touristicAreas', (e) => {
            this.clicOnTouristicArea(e.features[0]);
          });
        });

    }
    if (this.displayVelov) {
      this.velovService.getVelovBetween(pos._ne.lng, pos._ne.lat, pos._sw.lng, pos._sw.lat)
        .subscribe((velovs: Array<VelovModel>) => {

          this.setupVelov(velovs);

          this.map.on('mouseenter', 'lstVelovs', () => {
            this.map.getCanvas().style.cursor = 'pointer';
          });

          this.map.on('mouseleave', 'lstVelovs', () => {
            this.map.getCanvas().style.cursor = '';
          });
        });

      this.map.on('click', 'lstVelovs', e => {
        this.clicOnVelov(e.features[0]);
      });
    }
  }

  onDisplayFilterChange() {
    this.onMapPositionChange();
  }

  onMapPositionChange() {
    if (this.isMapLoaded) {
      this.lat = this.map.getCenter().lat;
      this.long = this.map.getCenter().lng;

      const pos = this.map.getBounds();

      if (this.displayVelovLoaded) {
        this.map.removeLayer('lstVelovs');
        this.map.removeSource('lstVelovs');
      }
      if (this.displayDistrictsLoaded) {
        for (const d of this.districts) {
          this.map.removeLayer('district-' + d.properties.gid);
          this.map.removeLayer('district-line-' + d.properties.gid);
          this.map.removeSource('district' + d.properties.gid);
        }
      }
      if (this.displayTouristicAreaLoaded) {
        this.map.removeLayer('touristicAreas');
        this.map.removeSource('touristicAreas');
      }


      if (this.displayDistricts) {
        this.districtService.getDistrictBetween(pos._ne.lng, pos._ne.lat, pos._sw.lng, pos._sw.lat)
          .subscribe((districts: Array<DistrictModel>) => {
            this.setupDistricts(districts);
            this.displayDistrictsLoaded = true;
          });
      } else {
        this.displayDistrictsLoaded = false;
      }

      if (this.displayTouristicArea) {
        this.touristicAreaService.getTouristicBetween(pos._ne.lng, pos._ne.lat, pos._sw.lng, pos._sw.lat)
          .subscribe((touristicAreasReloaded: Array<TouristicAreaModel>) => {
            this.setupTouristicArea(touristicAreasReloaded);
            this.displayTouristicAreaLoaded = true;
          });
      } else {
        this.displayTouristicAreaLoaded = false;
      }

      if (this.displayVelov) {
        this.velovService.getVelovBetween(pos._ne.lng, pos._ne.lat, pos._sw.lng, pos._sw.lat)
          .subscribe((velovs: Array<VelovModel>) => {
            this.setupVelov(velovs);
            this.displayVelovLoaded = true;
          });
      } else {
        this.displayVelovLoaded = false;
      }
    }
  }

  setupVelov(velovs: Array<VelovModel>) {
    this.map.addSource('lstVelovs', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    });

    this.source = this.map.getSource('lstVelovs');

    const data = new VelovCollection(velovs);
    this.source.setData(data);

    this.map.addLayer({
      id: 'lstVelovs',
      source: 'lstVelovs',
      type: 'symbol',
      layout: {
        'text-field': '{name}',
        'text-size': 11,
        'text-transform': 'uppercase',
        'icon-image': 'bicycle-share-15',
        'text-offset': [0, 1.5]
      },
      paint: {
        'text-color': '#222',
      }
    });
  }

  setupTouristicArea(touristicAreas: Array<TouristicAreaModel>) {
    this.touristicAreas = touristicAreas;
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
        'text-field': '{nom}',
        'text-size': 11,
        'text-transform': 'uppercase',
        'icon-image': 'monument-15',
        'text-offset': [0, 1.5]
      },
      paint: {
        'text-color': '#222',
      }
    });
  }

  setupDistricts(districts: Array<DistrictModel>) {
    let color = 0;
    const colors = [
      {
        background: '#34495e',
        line: '#2c3e50'
      },
      {
        background: '#3498db',
        line: '#2980b9'
      },
      {
        background: '#f1c40f',
        line: '#f39c12'
      },
      {
        background: '#e74c3c',
        line: '#c0392b'
      },
      {
        background: '#2ecc71',
        line: '#27ae60'
      },
    ];
    this.districts = districts;
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
        id: 'district-' + i.properties.gid,
        source: 'district' + i.properties.gid,
        'type': 'fill',
        layout: {},
        paint: {
          'fill-color': colors[color].background,
          'fill-antialias': true,
          'fill-opacity': 0.5
        }
      });
      this.map.addLayer({
        id: 'district-line-' + i.properties.gid,
        source: 'district' + i.properties.gid,
        'type': 'line',
        layout: {},
        paint: {
          'line-color': colors[color].line,
          'line-width': 4,
          'line-opacity': 1
        }
      });
      color++;
      if (color === colors.length) {
        color = 0;
      }
    }
  }

  closeDetail() {
    this.detailElement.nativeElement.classList.remove('display');
  }

  clicOnDistrict(distric: DistrictModel) {
    this.flyTo(distric.geometry.coordinates[0][0][0], distric.geometry.coordinates[0][0][1]);
  }

  clicOnTouristicArea(touristicAreaModel: TouristicAreaModel) {
    this.detailVelov = null;
    this.detailTouristicArea = touristicAreaModel;
    this.detailElement.nativeElement.classList.add('display');
    this.flyTo(touristicAreaModel.geometry.coordinates[0], touristicAreaModel.geometry.coordinates[1]);
  }

  clicOnVelov(velovModel: VelovModel) {
    this.detailVelov = velovModel;
    this.detailTouristicArea = null;
    this.detailElement.nativeElement.classList.add('display');
    this.flyTo(velovModel.geometry.coordinates[0], velovModel.geometry.coordinates[1]);
  }

  flyTo(long, latt) {
    this.long = long;
    this.lat = latt;
    this.map.flyTo({
      center: [long, latt]
    });
    this.onMapPositionChange();
  }

}
