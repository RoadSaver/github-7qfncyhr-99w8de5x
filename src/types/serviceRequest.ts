
export interface ServiceRequest {
  id: string;
  type: 'flat-tyre' | 'out-of-fuel' | 'other-car-problems' | 'tow-truck' | 'emergency' | 'support' | 'car-battery';
  message: string;
  location: { lat: number; lng: number };
  status: 'pending' | 'accepted' | 'declined';
  timestamp: string;
  username: string;
  priceQuote?: number;
}
