import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TouristicAreaService {

  constructor(private http: HttpClient) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }
  getDistrictNear(long, latt) {
    return this.http.get('http://localhost:4040/api/data/touristicArea/' + long + '/' + latt);
  }

  getDistricts() {
    return this.http.get('http://localhost:4040/api/data/touristicArea');
  }

  getDistrictDetail(gid) {
    return this.http.get('http://localhost:4040/api/data/touristicArea/' + gid);
  }
}
