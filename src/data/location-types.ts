export interface Location {
  id: string;
  name: string;
  nameJp: string;
  lat: number;
  lng: number;
  type:
    | 'temple'
    | 'garden'
    | 'restaurant'
    | 'cafe'
    | 'nature'
    | 'beach'
    | 'market'
    | 'onsen'
    | 'landmark'
    | 'transport';
  region: 'kyoto' | 'okinawa';
  day: number;
  description: string;
  rating: number | null;
  placeId: string;
}
