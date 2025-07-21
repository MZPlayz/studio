
import * as turf from '@turf/turf';
import type { Map, GeoJSONSource } from 'mapbox-gl';

export class VehicleAnimator {
  private map: Map;
  private animationFrameId?: number;
  private route: turf.helpers.Feature<turf.helpers.LineString>;
  private duration: number;
  private startTime: number;
  private onComplete: () => void;

  constructor(mapInstance: Map, routeGeoJSON: any, durationMs: number, onCompleteCallback: () => void) {
    this.map = mapInstance;
    this.route = turf.lineString(routeGeoJSON.coordinates);
    this.duration = durationMs;
    this.startTime = 0;
    this.onComplete = onCompleteCallback;
  }

  // The main animation loop. It does not use React state.
  private frame = (currentTime: number) => {
    if (!this.startTime) {
      this.startTime = currentTime;
    }
    const elapsedTime = currentTime - this.startTime;
    const phase = Math.min(elapsedTime / this.duration, 1);

    // Easing function for natural acceleration/deceleration
    const easedPhase = (1 - Math.cos(phase * Math.PI)) / 2;

    const routeDistance = turf.length(this.route, { units: 'kilometers' });
    const pointOnLine = turf.along(this.route, routeDistance * easedPhase, { units: 'kilometers' });
    
    // Look slightly ahead to calculate rotation
    const lookAheadPoint = turf.along(this.route, routeDistance * (easedPhase + 0.0001), { units: 'kilometers' });
    const bearing = turf.bearing(pointOnLine, lookAheadPoint);

    const vehicleSource = this.map.getSource('vehicle') as GeoJSONSource;
    if (vehicleSource) {
      const vehicleData: turf.helpers.Feature<turf.helpers.Point> = {
        type: 'Feature',
        geometry: pointOnLine.geometry,
        properties: { bearing },
      };
      vehicleSource.setData(vehicleData);
    }

    if (phase < 1) {
      this.animationFrameId = requestAnimationFrame(this.frame);
    } else {
      this.onComplete(); // Call the completion callback
    }
  };

  public start() {
    this.animationFrameId = requestAnimationFrame(this.frame);
  }

  public stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
