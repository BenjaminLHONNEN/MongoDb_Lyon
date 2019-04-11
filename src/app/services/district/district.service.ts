import {Injectable} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  constructor(private http: HttpClient) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  getDistrictNear(long, latt, distance = 500) {
    return this.http.get('http://localhost:4040/api/data/district/' + long + '/' + latt + (distance !== 500 ? '?distance=' + distance : ''));
  }

  getDistrictBetween(nelong, nelatt, swlong, swlatt) {
    return this.http.get('http://localhost:4040/api/data/district/' + nelong + '/' + nelatt + '/' + swlong + '/' + swlatt);
  }

  getDistricts() {
    return this.http.get('http://localhost:4040/api/data/district');
  }

  getDistrictDetail(gid) {
    return this.http.get('http://localhost:4040/api/data/district/' + gid);
  }
}
