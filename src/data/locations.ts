export type { Location } from './location-types';
export { kyotoLocations } from './locations-kyoto';
export { okinawaLocations } from './locations-okinawa';

import { kyotoLocations } from './locations-kyoto';
import { okinawaLocations } from './locations-okinawa';

export const locations = [...kyotoLocations, ...okinawaLocations];
