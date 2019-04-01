    import { Injectable } from '@angular/core';
    import { environment } from '../../environments/environment';
    import { HttpClient } from '@angular/common/http';

    @Injectable({
      providedIn: "root"
    })

    export class VelovAccess {
      API_URL: string;

      constructor(private http: HttpClient) {
        this.API_URL = environment.UrlApi;
      }

      /**
       * @returns all list velovs.
       *
       * @beta
       */
      public getAll() {
        return new Promise(resolve => {
          this.http.get(this.API_URL + "/data/velov").subscribe(
            data => {
              resolve(data);
            },
            err => {
              console.log(err);
            }
          );
        });
      }

      /**
       * @returns object Velov
       * @param {number} Id - The ID of the Velov.
       * @param {string} author - The author of the book.
       * @beta
       */
      public getById(Id: number) {
        return new Promise(resolve => {
          this.http.get(this.API_URL + "/data/" + Id).subscribe(
            data => {
              resolve(data);
            },
            err => {
              console.log(err);
            }
          );
        });
      }

      /**
       * @returns object Velov
       * @param {number} long - The long of the Velov.
       * @param {number} latt - The latt of the Velov.
       * @beta
       */
      public getByNear(long: number, latt: number) {
        return new Promise(resolve => {
            this.http.get(this.API_URL + "/data/velov/" + long + latt).subscribe(
            data => {
              resolve(data);
            },
            err => {
              console.log(err);
            }
          );
        });
      }
    }
