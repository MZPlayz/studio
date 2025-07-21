
'use client';

import { useState, useEffect, useRef } from 'react';
import { calculateBearing } from '@/lib/utils';

// This hook smoothly animates a numeric value from a start to an end point
function useAnimatedValue(targetValue: number, duration = 2000) {
  const [currentValue, setCurrentValue] = useState(targetValue);
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const startValueRef = useRef(targetValue);

  useEffect(() => {
    // When the target value changes, start a new animation
    const now = performance.now();
    startTimeRef.current = now;
    startValueRef.current = currentValue;

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) return;
      const elapsedTime = currentTime - startTimeRef.current;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Simple linear interpolation
      const animatedValue = startValueRef.current + (targetValue - startValueRef.current) * progress;
      
      setCurrentValue(animatedValue);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [targetValue, duration, currentValue]);

  return currentValue;
}

// Custom hook to animate lat/lng and calculate bearing
export function useAnimatedMarker(targetPosition: { lat: number, lng: number } | null) {
  const [previousPosition, setPreviousPosition] = useState(targetPosition);
  const [rotation, setRotation] = useState(0);

  const animatedLat = useAnimatedValue(targetPosition?.lat ?? 0);
  const animatedLng = useAnimatedValue(targetPosition?.lng ?? 0);
  
  useEffect(() => {
    if (targetPosition && previousPosition) {
        if (targetPosition.lat !== previousPosition.lat || targetPosition.lng !== previousPosition.lng) {
            const newRotation = calculateBearing(previousPosition, targetPosition);
            setRotation(newRotation);
            setPreviousPosition(targetPosition);
        }
    } else if (targetPosition) {
        setPreviousPosition(targetPosition);
    }
  }, [targetPosition, previousPosition]);

  if (!targetPosition) {
    return null;
  }

  return { lat: animatedLat, lng: animatedLng, rotation };
}
