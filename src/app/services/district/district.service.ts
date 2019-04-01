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

  getDistrictNear(long, latt) {
    return this.http.get('http://localhost:4040/api/data/district/' + long + '/' + latt);
  }

  getDistricts() {
    return this.http.get('http://localhost:4040/api/data/district');
  }

  getDistrictDetail(gid) {
    return this.http.get('http://localhost:4040/api/data/district/' + gid);
  }
}
