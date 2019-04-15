import {Injectable} from '@angular/core';
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

  getTouristicAreaNear(long, latt, distance = 500) {
    return this.http.get(environment.UrlApi + '/data/touristicArea/' + long + '/' + latt + (distance !== 500 ? '?distance=' + distance : ''));
  }
  getTouristicAreaNearLimit(long, latt, limit = 5) {
    return this.http.get(environment.UrlApi + '/data/touristicArealimit/' + long + '/' + latt + (limit !== 5 ? '?limit=' + limit : ''));
  }

  getTouristicBetween(nelong, nelatt, swlong, swlatt) {
    return this.http.get(environment.UrlApi + '/data/touristicArea/' + nelong + '/' + nelatt + '/' + swlong + '/' + swlatt);
  }


  getTouristicAreas() {
    return this.http.get(environment.UrlApi + '/data/touristicArea');
  }

  getTouristicAreaDetail(gid) {
    return this.http.get(environment.UrlApi + '/data/touristicArea/' + gid);
  }
}
