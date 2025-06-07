import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { toast } from '@/components/ui/use-toast';
import { useTranslation } from '@/utils/translations';
import { ServiceRequest } from '@/types/serviceRequest';
import { generateDemoRequests, getRequestTitle } from '@/utils/serviceUtils';
import EmployeeHeader from '@/components/employee/EmployeeHeader';
import ServiceRequestList from '@/components/employee/ServiceRequestList';
import RequestDetailsDialog from '@/components/employee/RequestDetailsDialog';
import DeclineReasonDialog from '@/components/employee/DeclineReasonDialog';
import EmployeeSettingsMenu from '@/components/employee/EmployeeSettingsMenu';
import EmployeePriceAdjustDialog from '@/components/employee/EmployeePriceAdjustDialog';
import ExitConfirmDialog from '@/components/dashboard/ExitConfirmDialog';

const EmployeeDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, language, setLanguage } = useApp();
  const t = useTranslation(language);
  
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [declineReason, setDeclineReason] = useState('');
  const [showDeclineDialog, setShowDeclineDialog] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPriceAdjust, setShowPriceAdjust] = useState(false);
  const [currentPriceQuote, setCurrentPriceQuote] = useState<number>(0);
  const [employeeLocation, setEmployeeLocation] = useState({ lat: 42.695, lng: 23.325 });
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  
  // Demo: Generate random requests
  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/employee');
    }
    
    // Generate demo requests
    const demoRequests = generateDemoRequests();
    setRequests(demoRequests);
    
    // Add a new request after 15 seconds for demo purposes
    const timer = setTimeout(() => {
      const newRequest: ServiceRequest = {
        id: '4',
        type: 'other-car-problems',
        message: 'My car won\'t start. I think it might be the battery. I\'m in a parking lot and need help quickly!',
        location: { lat: 42.697, lng: 23.325 },
        status: 'pending',
        timestamp: new Date().toISOString(),
        username: 'newUser321'
      };
      
      setRequests(prev => [newRequest, ...prev]);
      
      toast({
        title: t('new-request'),
        description: t('new-service-request'),
      });
    }, 15000);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate, t]);

  // Handle browser back button - only show exit dialog if no modals are open
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      
      // Check if any modal/dialog is currently open
      const hasOpenModal = selectedRequest || showDeclineDialog || showSettings || 
                          showPriceAdjust || showExitConfirm;
      
      if (hasOpenModal) {
        // Close the currently open modal/dialog instead of showing exit dialog
        setSelectedRequest(null);
        setShowDeclineDialog(false);
        setShowSettings(false);
        setShowPriceAdjust(false);
        setShowExitConfirm(false);
        setDeclineReason('');
      } else {
        // Only show exit dialog if we're on the main dashboard with no modals open
        setShowExitConfirm(true);
      }
      
      // Push the current state back to prevent actual navigation
      window.history.pushState(null, '', window.location.pathname);
    };

    // Push initial state
    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [selectedRequest, showDeclineDialog, showSettings, showPriceAdjust, showExitConfirm]);
  
  const handleRequestSelect = (request: ServiceRequest) => {
    setSelectedRequest(request);
  };
  
  const handleAccept = (requestId: string, priceQuote: number) => {
    // Update request status and store price quote
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'accepted', priceQuote } 
          : req
      )
    );
    
    setCurrentPriceQuote(priceQuote);
    
    toast({
      title: t('request-accepted'),
      description: `Price quote of ${priceQuote.toFixed(2)} BGN sent to customer.`
    });
    
    setSelectedRequest(null);
  };
  
  const handleDeclineClick = () => {
    if (!selectedRequest) return;
    setShowDeclineDialog(true);
  };
  
  const handleDeclineSubmit = () => {
    if (!selectedRequest || declineReason.length < 50) return;
    
    // Update request status
    setRequests(prev => 
      prev.map(req => 
        req.id === selectedRequest.id 
          ? { ...req, status: 'declined' } 
          : req
      )
    );
    
    toast({
      title: t('request-declined'),
      description: t("You've declined the service request with an explanation.")
    });
    
    setShowDeclineDialog(false);
    setSelectedRequest(null);
    setDeclineReason('');
  };

  const handlePriceAdjust = (newPrice: number) => {
    setCurrentPriceQuote(newPrice);
    toast({
      title: 'Price Quote Updated',
      description: `New price quote of ${newPrice.toFixed(2)} BGN sent to customer.`
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/employee');
    toast({
      title: t('logged-out'),
      description: t('logged-out-msg')
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <EmployeeHeader 
        language={language}
        onLanguageChange={setLanguage}
        onLogout={handleLogout}
        onSettingsOpen={() => setShowSettings(true)}
      />
      
      <main className="container px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{t('service-requests')}</h2>
        </div>
        
        <ServiceRequestList 
          requests={requests}
          onRequestSelect={handleRequestSelect}
        />
      </main>
      
      <RequestDetailsDialog 
        request={selectedRequest}
        employeeLocation={employeeLocation}
        onClose={() => setSelectedRequest(null)}
        onAccept={handleAccept}
        onDecline={handleDeclineClick}
        getRequestTitle={getRequestTitle}
        language={language}
      />
      
      <DeclineReasonDialog 
        open={showDeclineDialog}
        onClose={() => setShowDeclineDialog(false)}
        onSubmit={handleDeclineSubmit}
        reason={declineReason}
        onChange={setDeclineReason}
        language={language}
      />

      <EmployeePriceAdjustDialog
        open={showPriceAdjust}
        onClose={() => setShowPriceAdjust(false)}
        currentPrice={currentPriceQuote}
        onSendQuote={handlePriceAdjust}
        language={language}
      />

      <EmployeeSettingsMenu
        open={showSettings}
        onClose={() => setShowSettings(false)}
        onLanguageChange={setLanguage}
        currentLanguage={language}
      />

      <ExitConfirmDialog
        open={showExitConfirm}
        onClose={() => setShowExitConfirm(false)}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default EmployeeDashboard;