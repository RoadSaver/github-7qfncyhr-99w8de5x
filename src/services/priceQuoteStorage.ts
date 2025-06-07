import { supabase } from '@/integrations/supabase/client';

export interface PriceQuoteSnapshot {
  id: string;
  requestId: string;
  userId: string;
  employeeId?: string;
  serviceType: string;
  priceQuote: number;
  serviceFee: number;
  totalPrice: number;
  employeeName: string;
  snapshotData: any;
  status: 'pending' | 'accepted' | 'declined' | 'finished';
  createdAt: string;
}

export interface StorePriceQuoteSnapshotData {
  requestId: string;
  userId: string;
  employeeId?: string;
  serviceType: string;
  priceQuote: number;
  serviceFee: number;
  totalPrice: number;
  employeeName: string;
  snapshotData: any;
  status?: 'pending' | 'accepted' | 'declined' | 'finished';
}

class PriceQuoteStorageService {
  async storePriceQuoteSnapshot(data: StorePriceQuoteSnapshotData): Promise<string | null> {
    try {
      const status = (data.status || 'pending') as 'pending' | 'accepted' | 'declined' | 'finished';
      
      const { data: result, error } = await supabase
        .from('price_quote_snapshots')
        .insert([{
          request_id: data.requestId,
          user_id: data.userId,
          employee_id: data.employeeId,
          service_type: data.serviceType,
          price_quote: data.priceQuote,
          service_fee: data.serviceFee,
          total_price: data.totalPrice,
          employee_name: data.employeeName,
          snapshot_data: data.snapshotData,
          status: status
        }])
        .select('id')
        .single();

      if (error) {
        console.error('Error storing price quote snapshot:', error);
        return null;
      }

      return result?.id || null;
    } catch (error) {
      console.error('Error storing price quote snapshot:', error);
      return null;
    }
  }

  async getPriceQuoteSnapshot(requestId: string): Promise<PriceQuoteSnapshot | null> {
    try {
      const { data, error } = await supabase
        .from('price_quote_snapshots')
        .select('*')
        .eq('request_id', requestId)
        .maybeSingle();

      if (error || !data) {
        return null;
      }

      return {
        id: data.id,
        requestId: data.request_id,
        userId: data.user_id,
        employeeId: data.employee_id,
        serviceType: data.service_type,
        priceQuote: data.price_quote,
        serviceFee: data.service_fee,
        totalPrice: data.total_price,
        employeeName: data.employee_name,
        snapshotData: data.snapshot_data,
        status: data.status as 'pending' | 'accepted' | 'declined' | 'finished',
        createdAt: data.created_at
      };
    } catch (error) {
      console.error('Error getting price quote snapshot:', error);
      return null;
    }
  }

  async moveToFinishedRequests(
    requestId: string,
    userId: string,
    username: string,
    employeeId: string,
    employeeUsername: string
  ): Promise<boolean> {
    try {
      // Get the snapshot first
      const snapshot = await this.getPriceQuoteSnapshot(requestId);
      if (!snapshot) {
        return false;
      }

      // Update snapshot status to finished
      const { error: updateError } = await supabase
        .from('price_quote_snapshots')
        .update({ status: 'finished' as const })
        .eq('id', snapshot.id);

      if (updateError) {
        console.error('Error updating snapshot status:', updateError);
        return false;
      }

      // Add to user finished requests
      const { error: userError } = await supabase
        .from('user_finished_requests')
        .insert([{
          user_id: userId,
          username: username,
          request_id: requestId,
          snapshot_id: snapshot.id
        }]);

      if (userError) {
        console.error('Error adding to user finished requests:', userError);
      }

      // Add to employee finished requests
      const { error: employeeError } = await supabase
        .from('employee_finished_requests')
        .insert([{
          employee_id: employeeId,
          employee_username: employeeUsername,
          request_id: requestId,
          snapshot_id: snapshot.id
        }]);

      if (employeeError) {
        console.error('Error adding to employee finished requests:', employeeError);
      }

      return !userError && !employeeError;
    } catch (error) {
      console.error('Error moving to finished requests:', error);
      return false;
    }
  }
}

export const priceQuoteStorageService = new PriceQuoteStorageService();