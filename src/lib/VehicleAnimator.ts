import * as turf from '@turf/turf';
import type { Map as MapboxMap, GeoJSONSource } from 'mapbox-gl';
import type { Feature, LineString, Point } from 'geojson';

export interface AnimationConfig {
  duration: number; // Animation duration in milliseconds
  easing: 'linear' | 'easeInOut' | 'easeIn' | 'easeOut';
  fps?: number; // Target FPS (default: 60)
}

export interface VehicleMarker {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
  properties: {
    bearing: number;
    type: 'vehicle';
  };
}

/**
 * High-performance vehicle animation engine
 * Completely decoupled from React - handles smooth 60fps animations
 * using requestAnimationFrame and direct Mapbox GL manipulation
 */
export class VehicleAnimator {
  private map: MapboxMap;
  private route: Feature<LineString>;
  private config: AnimationConfig;
  private onComplete: () => void;
  
  // Animation state
  private startTime: number = 0;
  private animationId: number | null = null;
  private isRunning: boolean = false;
  private currentProgress: number = 0;
  
  // Route calculations cache
  private routeLength: number = 0;
  private routeCoordinates: [number, number][] = [];
  
  // Vehicle source ID for Mapbox
  private readonly VEHICLE_SOURCE_ID = 'vehicle-source';

  constructor(
    map: MapboxMap,
    route: Feature<LineString>,
    config: AnimationConfig,
    onComplete: () => void
  ) {
    this.map = map;
    this.route = route;
    this.config = {
      ...config,
      fps: config.fps || 60
    };
    this.onComplete = onComplete;
    
    // Precompute route data for performance
    this.precomputeRoute();
    
    // Initialize the vehicle source if it doesn't exist
    this.initializeVehicleSource();
  }

  /**
   * Precompute route data for optimal animation performance
   */
  private precomputeRoute(): void {
    this.routeCoordinates = this.route.geometry.coordinates as [number, number][];
    this.routeLength = (turf as any).length(this.route, { units: 'kilometers' });
    
    console.log(`Route precomputed: ${this.routeLength.toFixed(2)}km, ${this.routeCoordinates.length} points`);
  }

  /**
   * Initialize the vehicle GeoJSON source on the map
   */
  private initializeVehicleSource(): void {
    // Remove existing source if it exists
    if (this.map.getSource(this.VEHICLE_SOURCE_ID)) {
      this.map.removeSource(this.VEHICLE_SOURCE_ID);
    }

    // Create initial vehicle marker at start of route
    const startCoordinate = this.routeCoordinates[0];
    const initialBearing = this.calculateBearing(this.routeCoordinates[0], this.routeCoordinates[1]);
    
    const initialVehicle: VehicleMarker = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: startCoordinate
      },
      properties: {
        bearing: initialBearing,
        type: 'vehicle'
      }
    };

    // Add the source
    this.map.addSource(this.VEHICLE_SOURCE_ID, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [initialVehicle]
      }
    });
  }

  /**
   * Calculate bearing between two points
   */
  private calculateBearing(from: [number, number], to: [number, number]): number {
    try {
      const bearing = turf.bearing(
        turf.point(from),
        turf.point(to)
      );
      return bearing;
    } catch (error) {
      console.warn('Bearing calculation failed:', error);
      return 0;
    }
  }

  /**
   * Apply easing function to animation progress
   */
  private applyEasing(t: number): number {
    switch (this.config.easing) {
      case 'linear':
        return t;
      case 'easeIn':
        return t * t;
      case 'easeOut':
        return 1 - (1 - t) * (1 - t);
      case 'easeInOut':
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      default:
        return t;
    }
  }

  /**
   * Get vehicle position and bearing at a specific progress point (0-1)
   */
  private getVehicleStateAtProgress(progress: number): { position: [number, number]; bearing: number } {
    // Clamp progress
    progress = Math.max(0, Math.min(1, progress));
    
    try {
      // Calculate distance along route
      const targetDistance = this.routeLength * progress;
      
      // Get position along route using turf
      const alongPoint = turf.along(this.route, targetDistance, { units: 'kilometers' } as any);
      const position = alongPoint.geometry.coordinates as [number, number];
      
      // Calculate bearing by looking ahead slightly
      const lookAheadProgress = Math.min(1, progress + 0.01);
      const lookAheadDistance = this.routeLength * lookAheadProgress;
      const lookAheadPoint = turf.along(this.route, lookAheadDistance, { units: 'kilometers' } as any);
      
      const bearing = this.calculateBearing(position, lookAheadPoint.geometry.coordinates as [number, number]);
      
      return { position, bearing };
    } catch (error) {
      console.error('Error calculating vehicle state:', error);
      // Fallback to route start
      return {
        position: this.routeCoordinates[0],
        bearing: 0
      };
    }
  }

  /**
   * Update the vehicle marker on the map
   */
  private updateVehicleMarker(position: [number, number], bearing: number): void {
    const source = this.map.getSource(this.VEHICLE_SOURCE_ID) as GeoJSONSource;
    
    if (!source) {
      console.error('Vehicle source not found');
      return;
    }

    const updatedVehicle: VehicleMarker = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: position
      },
      properties: {
        bearing,
        type: 'vehicle'
      }
    };

    // Update the GeoJSON source directly (no React re-render)
    source.setData({
      type: 'FeatureCollection',
      features: [updatedVehicle]
    });
  }

  /**
   * Main animation frame function
   */
  private frame = (timestamp: number): void => {
    if (!this.isRunning) return;

    // Initialize start time on first frame
    if (!this.startTime) {
      this.startTime = timestamp;
    }

    // Calculate progress
    const elapsed = timestamp - this.startTime;
    const rawProgress = elapsed / this.config.duration;
    const easedProgress = this.applyEasing(Math.min(1, rawProgress));
    
    this.currentProgress = easedProgress;

    // Get vehicle state at current progress
    const { position, bearing } = this.getVehicleStateAtProgress(easedProgress);
    
    // Update vehicle position on map
    this.updateVehicleMarker(position, bearing);

    // Continue animation or complete
    if (rawProgress < 1) {
      this.animationId = requestAnimationFrame(this.frame);
    } else {
      this.complete();
    }
  };

  /**
   * Start the animation
   */
  public start(): void {
    if (this.isRunning) {
      console.warn('Animation is already running');
      return;
    }

    console.log(`Starting animation: ${this.config.duration}ms duration`);
    
    this.isRunning = true;
    this.startTime = 0;
    this.currentProgress = 0;
    
    this.animationId = requestAnimationFrame(this.frame);
  }

  /**
   * Stop the animation
   */
  public stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    
    this.isRunning = false;
    console.log('Animation stopped');
  }

  /**
   * Complete the animation
   */
  private complete(): void {
    this.stop();
    
    // Ensure vehicle is at the exact end position
    const endPosition = this.routeCoordinates[this.routeCoordinates.length - 1];
    const endBearing = this.calculateBearing(
      this.routeCoordinates[this.routeCoordinates.length - 2],
      endPosition
    );
    
    this.updateVehicleMarker(endPosition, endBearing);
    
    console.log('Animation completed');
    
    // Notify completion
    this.onComplete();
  }

  /**
   * Get current animation progress (0-1)
   */
  public getProgress(): number {
    return this.currentProgress;
  }

  /**
   * Check if animation is currently running
   */
  public isAnimating(): boolean {
    return this.isRunning;
  }

  /**
   * Get route statistics
   */
  public getRouteStats() {
    return {
      length: this.routeLength,
      coordinates: this.routeCoordinates.length,
      duration: this.config.duration
    };
  }

  /**
   * Cleanup method - call when component unmounts
   */
  public destroy(): void {
    this.stop();
    
    // Remove the vehicle source from map
    if (this.map.getSource(this.VEHICLE_SOURCE_ID)) {
      this.map.removeSource(this.VEHICLE_SOURCE_ID);
    }
  }
}
