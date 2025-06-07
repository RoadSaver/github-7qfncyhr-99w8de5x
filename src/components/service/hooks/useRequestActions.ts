
import { toast } from "@/components/ui/use-toast";
import { useApp } from '@/contexts/AppContext';

export const useRequestActions = () => {
  const { setOngoingRequest, addToHistory } = useApp();

  const generateEmployeeLocation = (userLocation: { lat: number; lng: number }) => {
    // Generate a random location within 2-5 km radius of user location
    const radius = (Math.random() * 3 + 2) / 111; // Convert km to degrees (rough approximation)
    const angle = Math.random() * 2 * Math.PI;
    
    return {
      lat: userLocation.lat + radius * Math.cos(angle),
      lng: userLocation.lng + radius * Math.sin(angle)
    };
  };

  const handleAcceptQuote = (
    type: 'flat-tyre' | 'out-of-fuel' | 'other-car-problems' | 'tow-truck' | 'emergency' | 'support' | 'car-battery',
    userLocation: { lat: number; lng: number },
    setShowPriceQuote: (show: boolean) => void,
    setShowRealTimeUpdate: (show: boolean) => void,
    setStatus: (status: 'pending' | 'accepted' | 'declined') => void,
    setEmployeeLocation: (location: { lat: number; lng: number }) => void
  ) => {
    setShowPriceQuote(false);
    setShowRealTimeUpdate(true);
    setStatus('accepted');
    
    // Generate and set employee location
    const employeeLocation = generateEmployeeLocation(userLocation);
    setEmployeeLocation(employeeLocation);
    
    const acceptedRequest = {
      id: Date.now().toString(),
      type,
      status: 'accepted' as const,
      timestamp: new Date().toLocaleString(),
      location: 'Sofia Center, Bulgaria'
    };
    
    setOngoingRequest(acceptedRequest);
    
    toast({
      title: "Quote Accepted",
      description: "Your request has been accepted. The employee is on their way!"
    });

    // Simulate service completion after 30 seconds
    setTimeout(() => {
      const completedRequest = {
        id: acceptedRequest.id,
        type,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        completedTime: new Date().toLocaleTimeString(),
        status: 'completed' as const,
        user: 'Current User',
        employee: 'John Smith'
      };
      
      addToHistory(completedRequest);
      setOngoingRequest(null);
      
      toast({
        title: "Service Completed",
        description: "Your request has been completed successfully."
      });
    }, 30000);
  };

  const handleDeclineQuote = (setShowPriceQuote: (show: boolean) => void) => {
    setShowPriceQuote(false);
    setOngoingRequest(null);
    toast({
      title: "Quote Declined",
      description: "You have declined the price quote."
    });
  };

  const handleCancelRequest = (setShowPriceQuote: (show: boolean) => void) => {
    setShowPriceQuote(false);
    setOngoingRequest(null);
    toast({
      title: "Request Cancelled",
      description: "Your service request has been cancelled."
    });
  };

  const handleContactSupport = () => {
    toast({
      title: "Contacting Support",
      description: "Our support team will contact you shortly."
    });
  };

  return {
    handleAcceptQuote,
    handleDeclineQuote,
    handleCancelRequest,
    handleContactSupport
  };
};
