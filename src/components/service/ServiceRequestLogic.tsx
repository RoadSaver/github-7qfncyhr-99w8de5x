import { useState, useEffect, useMemo, useCallback } from 'react';
import { toast } from "@/components/ui/use-toast";
import { useApp } from '@/contexts/AppContext';
import { serviceMessages } from './constants/serviceMessages';
import { ServiceType } from './types/serviceRequestState';
import { useServiceValidation } from './hooks/useServiceValidation';
import { useRequestSimulation } from './hooks/useRequestSimulation';
import { useRequestActions } from './hooks/useRequestActions';
import { usePriceQuoteSnapshot } from '@/hooks/usePriceQuoteSnapshot';
import { UserHistoryService } from '@/services/userHistoryService';

export const useServiceRequest = (
  type: ServiceType,
  userLocation: { lat: number; lng: number }
) => {
  const { setOngoingRequest, ongoingRequest, user } = useApp();
  const { validateMessage } = useServiceValidation();
  const { simulateEmployeeResponse, handleAccept } = useRequestSimulation();
  const {
    handleCancelRequest: cancelRequest,
    handleContactSupport
  } = useRequestActions();
  const { storeSnapshot, loadSnapshot, storedSnapshot, moveToFinished } = usePriceQuoteSnapshot();

  // Initialize states
  const [message, setMessage] = useState(() => serviceMessages[type] || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRealTimeUpdate, setShowRealTimeUpdate] = useState(false);
  const [showPriceQuote, setShowPriceQuote] = useState(false);
  const [priceQuote, setPriceQuote] = useState<number>(0);
  const [originalPriceQuote, setOriginalPriceQuote] = useState<number>(0);
  const [employeeLocation, setEmployeeLocation] = useState<{ lat: number; lng: number } | undefined>(undefined);
  const [status, setStatus] = useState<'pending' | 'accepted' | 'declined'>('pending');
  const [declineReason, setDeclineReason] = useState('');
  const [currentEmployeeName, setCurrentEmployeeName] = useState<string>('');
  const [employeeMovingLocation, setEmployeeMovingLocation] = useState<{ lat: number; lng: number } | undefined>(undefined);
  const [eta, setEta] = useState<string | null>(null);
  const [showWaitingForRevision, setShowWaitingForRevision] = useState(false);

  // NEW: Employee assignment and decline tracking per request
  const [assignedEmployee, setAssignedEmployee] = useState<string>('');
  const [employeeDeclineCount, setEmployeeDeclineCount] = useState<number>(0);
  const [hasReceivedRevision, setHasReceivedRevision] = useState<boolean>(false);

  // Reset employee assignment when a new request is started or finished
  useEffect(() => {
    if (!ongoingRequest) {
      setAssignedEmployee('');
      setEmployeeDeclineCount(0);
      setHasReceivedRevision(false);
    }
  }, [ongoingRequest]);

  // Update local states when ongoing request changes
  useEffect(() => {
    if (ongoingRequest) {
      if (ongoingRequest.priceQuote !== undefined) {
        setPriceQuote(ongoingRequest.priceQuote);
        if (originalPriceQuote === 0) {
          setOriginalPriceQuote(ongoingRequest.priceQuote);
        }
      }
      if (ongoingRequest.employeeName) {
        setCurrentEmployeeName(ongoingRequest.employeeName);
        // Set assigned employee if not already set
        if (!assignedEmployee) {
          setAssignedEmployee(ongoingRequest.employeeName);
        }
      }
      if (ongoingRequest.id) {
        loadSnapshot(ongoingRequest.id);
      }
    }
  }, [ongoingRequest, originalPriceQuote, loadSnapshot, assignedEmployee]);

  const handleSubmit = useCallback(() => {
    if (!validateMessage(message, type)) {
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      const requestId = Date.now().toString();
      const timestamp = new Date().toISOString();
      
      // Reset employee assignment for new request
      setAssignedEmployee('');
      setEmployeeDeclineCount(0);
      setHasReceivedRevision(false);
      
      const newOngoingRequest = {
        id: requestId,
        type,
        status: 'pending' as const,
        timestamp: new Date().toLocaleString(),
        location: 'Sofia Center, Bulgaria',
        declinedEmployees: []
      };
      
      setOngoingRequest(newOngoingRequest);
      setStatus('pending');
      setIsSubmitting(false);
      setShowRealTimeUpdate(true);
      
      toast({
        title: "Request Sent",
        description: "Your request has been sent to our team."
      });

      // Simulate finding an employee and getting a quote
      simulateEmployeeResponse(
        requestId,
        timestamp,
        type,
        userLocation,
        async (quote: number) => {
          setPriceQuote(quote);
          setOriginalPriceQuote(quote);
          
          await storeSnapshot(requestId, type, quote, currentEmployeeName, false);
          
          setOngoingRequest(prev => {
            if (!prev) return null;
            return {
              ...prev,
              priceQuote: quote,
              employeeName: currentEmployeeName
            };
          });
          
          setShowRealTimeUpdate(false);
          setShowPriceQuote(true);
        },
        setShowPriceQuote,
        setShowRealTimeUpdate,
        setStatus,
        setDeclineReason,
        setEmployeeLocation,
        (employeeName: string) => {
          if (employeeName && employeeName !== 'Unknown') {
            setCurrentEmployeeName(employeeName);
            // Assign employee to this request
            setAssignedEmployee(employeeName);
            setEmployeeDeclineCount(0);
            setOngoingRequest(prev => prev ? {
              ...prev,
              employeeName: employeeName
            } : null);
          } else {
            setCurrentEmployeeName('');
            setAssignedEmployee('');
            setOngoingRequest(null);
            setShowRealTimeUpdate(false);
            setShowPriceQuote(false);
            setStatus('declined');
            setDeclineReason('No available employees. Please try again later.');
            toast({
              title: "No employees available",
              description: "All employees are currently busy. Please try again later.",
              variant: "destructive"
            });
          }
        },
        [] // No blacklisted employees for initial assignment
      );
    }, 1500);
  }, [validateMessage, message, type, setOngoingRequest, simulateEmployeeResponse, userLocation, storeSnapshot, currentEmployeeName]);

  const handleAcceptQuote = useCallback(async () => {
    if (!user || !ongoingRequest || !currentEmployeeName) return;
    
    // Generate employee starting location near user
    const employeeStartLocation = {
      lat: userLocation.lat + (Math.random() - 0.5) * 0.02,
      lng: userLocation.lng + (Math.random() - 0.5) * 0.02
    };
    
    setEmployeeLocation(employeeStartLocation);
    setShowPriceQuote(false);
    setShowRealTimeUpdate(true);
    setStatus('accepted');
    
    setOngoingRequest(prev => prev ? { 
      ...prev, 
      status: 'accepted' as const 
    } : null);
    
    toast({
      title: "Quote Accepted",
      description: `${currentEmployeeName} is on the way to your location.`
    });

    // Start the simulation with movement and ETA (15 seconds)
    await handleAccept(
      ongoingRequest.id,
      ongoingRequest.priceQuote || priceQuote,
      currentEmployeeName,
      user.username,
      userLocation,
      employeeStartLocation,
      15, // 15 seconds ETA
      (remaining) => {
        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;
        setEta(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      },
      (location) => {
        setEmployeeMovingLocation(location);
      },
      async () => {
        // Service completion
        toast({
          title: "Service Completed",
          description: `Your ${type} service has been completed successfully.`
        });
        
        // Add to user history
        try {
          await UserHistoryService.addHistoryEntry({
            user_id: user.username,
            username: user.username,
            service_type: type,
            status: 'completed',
            employee_name: currentEmployeeName,
            price_paid: priceQuote,
            service_fee: 5,
            total_price: priceQuote + 5,
            request_date: new Date().toISOString(),
            completion_date: new Date().toISOString(),
            address_street: 'Sofia Center, Bulgaria',
            latitude: userLocation.lat,
            longitude: userLocation.lng
          });
        } catch (error) {
          console.error('Error recording completion:', error);
        }
        
        // Clean up state and close all windows
        setOngoingRequest(null);
        setShowRealTimeUpdate(false);
        setShowPriceQuote(false);
        setEmployeeMovingLocation(undefined);
        setEta(null);
        setAssignedEmployee('');
        setEmployeeDeclineCount(0);
        setHasReceivedRevision(false);
      }
    );
  }, [user, ongoingRequest, currentEmployeeName, userLocation, setOngoingRequest, handleAccept, priceQuote, type]);

  const handleDeclineQuote = useCallback(async (isSecondDecline: boolean = false) => {
    if (!user || !assignedEmployee) return;
    
    const newDeclineCount = employeeDeclineCount + 1;
    setEmployeeDeclineCount(newDeclineCount);
    
    if (newDeclineCount === 1 && !hasReceivedRevision) {
      // First decline - same employee sends revision
      setShowPriceQuote(false);
      setShowWaitingForRevision(true);
      setHasReceivedRevision(true);
      
      toast({
        title: "Quote Declined",
        description: `${assignedEmployee} will send you a revised quote.`
      });
      
      // Show waiting screen for 2 seconds, then revised quote from SAME employee
      setTimeout(() => {
        setShowWaitingForRevision(false);
        
        // Generate revised quote (lower than original)
        const revisedQuote = Math.max(10, priceQuote - Math.floor(Math.random() * 15) - 5);
        setPriceQuote(revisedQuote);
        
        setOngoingRequest(prev => prev ? {
          ...prev,
          priceQuote: revisedQuote,
          employeeName: assignedEmployee // Keep same employee
        } : null);
        
        setShowPriceQuote(true);
        
        toast({
          title: "Revised Quote Received",
          description: `${assignedEmployee} sent a revised quote of ${revisedQuote} BGN.`
        });
      }, 2000);
      
    } else {
      // Second decline OR decline after revision - replace employee
      
      // Record decline in history
      try {
        await UserHistoryService.addHistoryEntry({
          user_id: user.username,
          username: user.username,
          service_type: type,
          status: 'declined',
          employee_name: assignedEmployee,
          request_date: new Date().toISOString(),
          completion_date: new Date().toISOString(),
          address_street: 'Sofia Center, Bulgaria',
          latitude: userLocation.lat,
          longitude: userLocation.lng,
          decline_reason: 'User declined quote twice'
        });
      } catch (error) {
        console.error('Error recording decline:', error);
      }
      
      // Reset employee assignment and find new one
      const previousEmployee = assignedEmployee;
      setAssignedEmployee('');
      setEmployeeDeclineCount(0);
      setHasReceivedRevision(false);
      
      setShowPriceQuote(false);
      setShowRealTimeUpdate(true);
      setStatus('pending');
      
      toast({
        title: "Quote Declined",
        description: "Looking for another available employee..."
      });
      
      // Find new employee (blacklist the previous one)
      setTimeout(() => {
        const newRequestId = Date.now().toString();
        
        simulateEmployeeResponse(
          newRequestId,
          new Date().toISOString(),
          type,
          userLocation,
          (quote: number) => {
            setPriceQuote(quote);
            setOngoingRequest(prev => prev ? {
              ...prev,
              priceQuote: quote,
              employeeName: currentEmployeeName
            } : null);
            setShowRealTimeUpdate(false);
            setShowPriceQuote(true);
          },
          setShowPriceQuote,
          setShowRealTimeUpdate,
          setStatus,
          setDeclineReason,
          setEmployeeLocation,
          (employeeName: string) => {
            if (employeeName && employeeName !== 'Unknown') {
              setCurrentEmployeeName(employeeName);
              setAssignedEmployee(employeeName); // Assign new employee
              setEmployeeDeclineCount(0);
              setHasReceivedRevision(false);
              setOngoingRequest(prev => prev ? {
                ...prev,
                employeeName: employeeName
              } : null);
            } else {
              setCurrentEmployeeName('');
              setAssignedEmployee('');
              setOngoingRequest(null);
              setShowRealTimeUpdate(false);
              setShowPriceQuote(false);
              setStatus('declined');
              setDeclineReason('No available employees. Please try again later.');
              toast({
                title: "No employees available",
                description: "All employees are currently busy. Please try again later.",
                variant: "destructive"
              });
            }
          },
          [previousEmployee] // Blacklist previous employee
        );
      }, 2000);
    }
  }, [user, assignedEmployee, employeeDeclineCount, hasReceivedRevision, priceQuote, setOngoingRequest, type, userLocation, simulateEmployeeResponse, currentEmployeeName]);
  
  const handleCancelRequest = useCallback(() => {
    setAssignedEmployee('');
    setEmployeeDeclineCount(0);
    setHasReceivedRevision(false);
    cancelRequest(setShowPriceQuote);
  }, [cancelRequest]);

  const showStoredPriceQuote = useCallback(() => {
    if (storedSnapshot) {
      setShowPriceQuote(true);
    }
  }, [storedSnapshot]);

  // Computed value for hasDeclinedOnce based on employee decline count and revision status
  const hasDeclinedOnce = employeeDeclineCount > 0 || hasReceivedRevision;

  return useMemo(() => ({
    message,
    setMessage,
    isSubmitting,
    showRealTimeUpdate,
    showPriceQuote,
    setShowPriceQuote,
    priceQuote,
    employeeLocation: employeeMovingLocation || employeeLocation,
    status,
    declineReason,
    currentEmployeeName: ongoingRequest?.employeeName || currentEmployeeName,
    hasDeclinedOnce,
    eta,
    showWaitingForRevision,
    handleSubmit,
    handleAcceptQuote,
    handleDeclineQuote,
    handleCancelRequest,
    handleContactSupport,
    storedSnapshot,
    showStoredPriceQuote
  }), [
    message,
    isSubmitting,
    showRealTimeUpdate,
    showPriceQuote,
    priceQuote,
    employeeMovingLocation,
    employeeLocation,
    status,
    declineReason,
    ongoingRequest?.employeeName,
    currentEmployeeName,
    hasDeclinedOnce,
    eta,
    showWaitingForRevision,
    handleSubmit,
    handleAcceptQuote,
    handleDeclineQuote,
    handleCancelRequest,
    handleContactSupport,
    storedSnapshot,
    showStoredPriceQuote
  ]);
};