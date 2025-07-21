
import * as turf from '@turf/turf';
import type { Map, GeoJSONSource } from 'mapbox-gl';

export class VehicleAnimator {
  private map: Map;
  private animationFrameId?: number;
  private route: turf.helpers.Feature<turf.helpers.LineString>;
  private duration: number;
  private startTime?: number;
  private onFinish?: () => void;

  constructor(mapInstance: Map, routeGeoJSON: any, durationMs: number, onFinish?: () => void) {
    this.map = mapInstance;
    this.route = turf.lineString(routeGeoJSON.coordinates);
    this.duration = durationMs;
    this.onFinish = onFinish;
  }

  // The main animation loop, decoupled from React
  private frame = (currentTime: number) => {
    if (!this.startTime) {
        this.startTime = currentTime;
    }
    const elapsedTime = currentTime - this.startTime;
    const phase = Math.min(elapsedTime / this.duration, 1);
    const easedPhase = (1 - Math.cos(phase * Math.PI)) / 2; // Ease in-out

    const routeDistance = turf.length(this.route, { units: 'kilometers' });
    const currentPoint = turf.along(this.route, routeDistance * easedPhase, { units: 'kilometers' });
    
    // Look ahead slightly to calculate bearing
    const lookAheadPoint = turf.along(this.route, routeDistance * (easedPhase + 0.0001), { units: 'kilometers' });
    const bearing = turf.bearing(currentPoint, lookAheadPoint);

    // Directly update the GeoJSON source's data
    const vehicleSource = this.map.getSource('vehicle') as GeoJSONSource;
    if (vehicleSource) {
      const pointData: turf.helpers.Feature<turf.helpers.Point> = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: currentPoint.geometry.coordinates,
        },
        properties: {
          bearing: bearing,
        },
      };
      vehicleSource.setData(pointData);
    }

    if (phase < 1) {
      this.animationFrameId = requestAnimationFrame(this.frame);
    } else {
      console.log('Animation complete.');
      if(this.onFinish) this.onFinish();
    }
  };

  public start() {
    this.startTime = performance.now();
    this.animationFrameId = requestAnimationFrame(this.frame);
  }

  public stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
