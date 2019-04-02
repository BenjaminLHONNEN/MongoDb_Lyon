import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdressServiceService {

  constructor(private http: HttpClient) {
  }

  searchAdress(search: string) {
    return this.http.get('/api/data/adress/' + search);
  }
}
