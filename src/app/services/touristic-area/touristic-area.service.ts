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
    return this.http.get('http://localhost:4040/api/data/touristicArea/' + long + '/' + latt + (distance !== 500 ? '?distance=' + distance : ''));
  }

  getTouristicAreas() {
    return this.http.get('http://localhost:4040/api/data/touristicArea');
  }

  getTouristicAreaDetail(gid) {
    return this.http.get('http://localhost:4040/api/data/touristicArea/' + gid);
  }
}
