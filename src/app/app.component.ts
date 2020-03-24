import { Component, OnInit } from "@angular/core";
import { environment } from "../environments/environment.prod";

import * as Mapboxgl from "mapbox-gl";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "MapBox - Starter App";
  map: Mapboxgl.Map;

  ngOnInit() {
    (Mapboxgl as any).accessToken = environment.mapbox_key;

    this.map = new Mapboxgl.Map({
      container: "mapbox-map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [16.10543, 61.8206865], // Longitude, Latitude
      zoom: 15
    });

    this.createMarker(16.10543, 61.8206865);
  }

  createMarker(lng: number, lat: number) {
    const marker = new Mapboxgl.Marker({
      draggable: true
    })
      .setLngLat([lng, lat])
      .addTo(this.map);

    marker.on("drag", () => this.onDragEnd(marker));
  }

  onDragEnd(marker: Mapboxgl.Marker) {
    var lngLat = marker.getLngLat();
    console.log(`Longitude: ${lngLat.lng} / Latitude: ${lngLat.lat}`);
  }
}
