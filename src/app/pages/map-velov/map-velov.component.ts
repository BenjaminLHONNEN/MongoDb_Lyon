
import { Component, OnInit } from '@angular/core';
import { VelovAccess } from '../../services/velovAccess.service';
import { Velov } from '../../models/velov';

@Component({
  selector: "app-map-velov",
  templateUrl: "./map-velov.component.html",
  styleUrls: ["./map-velov.component.scss"]
})
export class MapVelovComponent implements OnInit {

  lstVelovs: Array<Velov>;

  constructor(public VelovAccess: VelovAccess) {
    this.lstVelovs = {} as Array<Velov>;
    this.callListVelov();
  }

  private callListVelov() {
    this.VelovAccess.getAll().then(data => {
      this.lstVelovs = data as Array<Velov>;
      console.log(this.lstVelovs);
    });
  }

ngOnInit() { }
}
