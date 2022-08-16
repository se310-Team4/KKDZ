// this file contains helper functions and constants
const { sin, cos, sqrt, PI: π, atan2 } = Math;
const R = 6371; // the radius of the earth (in km) at sea level
const compassDirections = "⬆️ ↗️ ➡️ ↘️ ⬇️ ↙️ ⬅️ ↖️ ⬆️".split(" ");

const deg2rad = (deg) => (deg * π) / 180;
const rad2deg = (rad) => (rad * 180) / π;

export const NUMBER_OF_GUESSES = 6;
export const GAME_MODE = "nzCities";

/** shortcut for document.querySelector */
export const $ = (id) => document.querySelector(id);

/** returns the distance in km between two coordinates */
export function distanceBetween(lat1, lng1, lat2, lng2) {
  const ΔLat = deg2rad(lat2 - lat1);
  const ΔLng = deg2rad(lng2 - lng1);

  // this is the Haversine formula
  const a =
    sin(ΔLat / 2) ** 2 +
    cos(deg2rad(lat1)) * cos(deg2rad(lat2)) * sin(ΔLng / 2) ** 2;

  return 2 * R * atan2(sqrt(a), sqrt(1 - a));
}

/** returns the cardinal direction between two coordinates */
export function directionBetween(lat1, lng1, lat2, lng2) {
  // convert to radians
  const [lat1R, lng1R] = [deg2rad(lat1), deg2rad(lng1)];
  const [lat2R, lng2R] = [deg2rad(lat2), deg2rad(lng2)];

  // calculate the vector between the points in Mecartor projection
  // formula based on https://gis.stackexchange.com/a/228663
  const y = sin(lng2R - lng1R) * cos(lat2R);
  const x =
    cos(lat1R) * sin(lat2R) - sin(lat1R) * cos(lat2R) * cos(lng2R - lng1R);

  const angle = atan2(y, x);
  const bearing = (rad2deg(angle) + 360) % 360;

  return compassDirections[Math.round(bearing / 45)];
}
