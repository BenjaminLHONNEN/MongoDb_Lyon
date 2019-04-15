import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdressServiceService {

  constructor(private http: HttpClient) {
  }

  searchAdress(search: string) {
    return this.http.get(environment.UrlApi + '/data/adress/' + search);
  }
}
