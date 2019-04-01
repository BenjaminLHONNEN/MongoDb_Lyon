import { VelovModel } from './../../models/velov/velov';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from "mapbox-gl";
import { VelovAccess } from '../../services/velov/velovAccess.service';
import { VelovCollection } from '../../models/velov/velov';

@Component({
  selector: "app-map-velov",
  templateUrl: "./map-velov.component.html",
  styleUrls: ["./map-velov.component.scss"]
})
export class MapVelovComponent implements OnInit {
  @ViewChild("detailElement") detailElement: ElementRef;

  map: mapboxgl.Map;
  lat = 45.745672;
  long = 4.839269;
  style = "mapbox://styles/mapbox/outdoors-v9";

  source: any;
  lstVelovs: any;
  lstVelovArray: Array<VelovModel>;
  selectedVelov: VelovModel;

  constructor(public VelovAccess: VelovAccess) {}

  ngOnInit() {
    this.lstVelovs = this.VelovAccess.getVelovNear(this.long, this.lat);
    this.initialiseMap();
  }

  private initialiseMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        this.map.flyTo({
          center: [this.long, this.lat]
        });
      });
    }
    this.buildMap();
  }

  closeDetail() {
    this.detailElement.nativeElement.classList.remove("display");
  }

  setDetail(value) {
    this.selectedVelov = value;
  }

  private buildMap() {

    this.map = new mapboxgl.Map({
      container: "map",
      zoom: 13,
      style: this.style,
      center: [this.long, this.lat]
    });

    const detailElement = this.detailElement;
    this.map.on("click", "lstVelovs", e => {
      this.selectedVelov = e.features[0];
      detailElement.nativeElement.classList.add("display");
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    const map = this.map;
    this.map.on("mouseenter", "lstVelovs", function() {
      map.getCanvas().style.cursor = "pointer";
    });

    this.map.on("mouseleave", "lstVelovs", function() {
      map.getCanvas().style.cursor = "";
    });

    this.map.on("load", event => {
      this.map.addSource("lstVelovs", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      });

      this.source = this.map.getSource("lstVelovs");

      this.lstVelovs.subscribe(lstVelovs => {
        this.lstVelovArray = lstVelovs;
        const data = new VelovCollection(lstVelovs);
        this.source.setData(data);
      });

      this.map.addLayer({
        id: "lstVelovs",
        source: "lstVelovs",
        type: "symbol",
        layout: {
          "text-field": "{message}",
          "text-size": 24,
          "text-transform": "uppercase",
          "icon-image": "bicycle-share-15",
          "text-offset": [0, 1.5]
        },
        paint: {
          "text-color": "#F16624",
          "text-halo-color": "#FFF",
          "text-halo-width": 2
        }
      });
    });
  }

  clicOn(VelovModel: VelovModel) {
    this.flyTo(
      VelovModel.geometry.coordinates[0],
      VelovModel.geometry.coordinates[1]
    );
  }

  flyTo(long, latt) {
    this.map.flyTo({
      center: [long, latt]
    });
  }
}
