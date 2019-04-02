import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdressServiceService {

  constructor(private http: HttpClient) {
  }

  searchAdress(search: string) {
    return this.http.get('http://localhost:4040/api/data/adress/' + search);
  }
}
