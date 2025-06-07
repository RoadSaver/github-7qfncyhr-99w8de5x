
import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { priceQuoteStorageService, PriceQuoteSnapshot } from '@/services/priceQuoteStorage';

export const usePriceQuoteSnapshot = () => {
  const { user, ongoingRequest } = useApp();
  const [storedSnapshot, setStoredSnapshot] = useState<PriceQuoteSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Store a price quote snapshot when employee responds
  const storeSnapshot = async (
    requestId: string,
    serviceType: string,
    priceQuote: number,
    employeeName: string,
    hasDeclinedOnce: boolean = false
  ): Promise<string | null> => {
    if (!user) return null;

    setIsLoading(true);
    try {
      const serviceFee = 5;
      const totalPrice = priceQuote + serviceFee;

      const snapshotData = {
        serviceType,
        priceQuote,
        serviceFee,
        totalPrice,
        employeeName,
        hasDeclinedOnce,
        timestamp: new Date().toISOString()
      };

      const snapshotId = await priceQuoteStorageService.storePriceQuoteSnapshot({
        requestId,
        userId: user.username, // Using username as user ID for now
        serviceType,
        priceQuote,
        serviceFee,
        totalPrice,
        employeeName,
        snapshotData,
        status: 'pending'
      });

      return snapshotId;
    } catch (error) {
      console.error('Error storing snapshot:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Load stored snapshot for current request
  const loadSnapshot = async (requestId: string): Promise<PriceQuoteSnapshot | null> => {
    setIsLoading(true);
    try {
      const snapshot = await priceQuoteStorageService.getPriceQuoteSnapshot(requestId);
      setStoredSnapshot(snapshot);
      return snapshot;
    } catch (error) {
      console.error('Error loading snapshot:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Move request to finished when completed
  const moveToFinished = async (
    requestId: string,
    employeeId: string,
    employeeUsername: string
  ): Promise<boolean> => {
    if (!user) return false;

    try {
      return await priceQuoteStorageService.moveToFinishedRequests(
        requestId,
        user.username,
        user.username,
        employeeId,
        employeeUsername
      );
    } catch (error) {
      console.error('Error moving to finished:', error);
      return false;
    }
  };

  return {
    storedSnapshot,
    isLoading,
    storeSnapshot,
    loadSnapshot,
    moveToFinished
  };
};
