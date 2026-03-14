/** Haversine distance in km between two lat/lng points */
function distanceKm(
  a: google.maps.LatLngLiteral,
  b: google.maps.LatLngLiteral,
): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const sinLat = Math.sin(dLat / 2);
  const sinLng = Math.sin(dLng / 2);
  const h =
    sinLat * sinLat +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      sinLng * sinLng;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Helper: wait for the map to fire 'idle' once */
function waitForIdle(map: google.maps.Map): Promise<void> {
  return new Promise((resolve) => {
    google.maps.event.addListenerOnce(map, 'idle', () => resolve());
  });
}

/**
 * Smoothly flies the map from the current view to a target location.
 * For short distances (<2 km), just pans directly.
 * For longer distances, zooms out -> pans -> zooms in.
 * Returns a promise that resolves when the animation is complete.
 */
export async function smoothFlyTo(
  map: google.maps.Map,
  target: google.maps.LatLngLiteral,
  finalZoom = 16,
): Promise<void> {
  const currentCenter = map.getCenter();
  const currentZoom = map.getZoom() ?? 13;

  // If no current center, just jump
  if (!currentCenter) {
    map.setCenter(target);
    map.setZoom(finalZoom);
    return;
  }

  const origin = { lat: currentCenter.lat(), lng: currentCenter.lng() };
  const dist = distanceKm(origin, target);

  // Short distance: just smooth-pan directly
  if (dist < 2) {
    map.panTo(target);
    await waitForIdle(map);
    map.setZoom(finalZoom);
    await waitForIdle(map);
    return;
  }

  // Calculate overview zoom based on distance
  let overviewZoom: number;
  if (dist > 500) {
    overviewZoom = 6; // cross-country (Kyoto -> Okinawa)
  } else if (dist > 100) {
    overviewZoom = 8;
  } else if (dist > 20) {
    overviewZoom = 10;
  } else {
    overviewZoom = Math.min(currentZoom, finalZoom) - 3;
  }
  overviewZoom = Math.max(overviewZoom, 5);

  // Step 1: Zoom out
  map.setZoom(overviewZoom);
  await waitForIdle(map);

  // Step 2: Pan to target
  map.panTo(target);
  await waitForIdle(map);

  // Step 3: Zoom in to final level
  map.setZoom(finalZoom);
  await waitForIdle(map);
}
