import {Injectable} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VelovAccess {
  API_URL: string;

  constructor(private http: HttpClient) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.API_URL = environment.UrlApi;
  }

  getVelovNear(long, latt, distance = 500) {
    return this.http.get('/api/data/velov/' + long + '/' + latt + (distance !== 500 ? '?distance=' + distance : ''));
  }

  getVelovDetail(gid) {
    return this.http.get( '/api/data/velov/' + gid);
  }
}
