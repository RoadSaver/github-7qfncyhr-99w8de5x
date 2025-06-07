
export interface ServiceRequestState {
  message: string;
  isSubmitting: boolean;
  showRealTimeUpdate: boolean;
  showPriceQuote: boolean;
  priceQuote: number;
  employeeLocation?: { lat: number; lng: number };
  status: 'pending' | 'accepted' | 'declined';
  declineReason: string;
  serviceFee?: number;
  hasDeclinedOnce?: boolean;
  isWaitingForRevision?: boolean;
  currentEmployeeName?: string;
  declinedEmployees?: string[];
}

export type ServiceType = 'flat-tyre' | 'out-of-fuel' | 'other-car-problems' | 'tow-truck' | 'emergency' | 'support' | 'car-battery';
