import { supabase } from '@/integrations/supabase/client';

export interface BlacklistEntry {
  id: string;
  request_id: string;
  employee_name: string;
  user_id: string;
  created_at: string;
}

export class SimulatedEmployeeBlacklistService {
  // Add an employee to the blacklist for a specific request
  static async addToBlacklist(requestId: string, employeeName: string, userId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('simulated_employees_blacklist')
        .insert({
          request_id: requestId,
          employee_name: employeeName,
          user_id: userId
        });

      if (error) {
        console.error('Error adding employee to blacklist:', error);
        return false;
      }

      console.log(`Added ${employeeName} to blacklist for request ${requestId}`);
      return true;
    } catch (error) {
      console.error('Error in addToBlacklist:', error);
      return false;
    }
  }

  // Get blacklisted employees for a specific request
  static async getBlacklistedEmployees(requestId: string): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('simulated_employees_blacklist')
        .select('employee_name')
        .eq('request_id', requestId);

      if (error) {
        console.error('Error fetching blacklisted employees:', error);
        return [];
      }

      return data?.map(entry => entry.employee_name) || [];
    } catch (error) {
      console.error('Error in getBlacklistedEmployees:', error);
      return [];
    }
  }

  // Clear blacklist for a specific request (when request is completed)
  static async clearBlacklistForRequest(requestId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('simulated_employees_blacklist')
        .delete()
        .eq('request_id', requestId);

      if (error) {
        console.error('Error clearing blacklist for request:', error);
        return false;
      }

      console.log(`Cleared blacklist for request ${requestId}`);
      return true;
    } catch (error) {
      console.error('Error in clearBlacklistForRequest:', error);
      return false;
    }
  }

  // Get all blacklist entries for a user (for debugging/admin purposes)
  static async getUserBlacklistEntries(userId: string): Promise<BlacklistEntry[]> {
    try {
      const { data, error } = await supabase
        .from('simulated_employees_blacklist')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user blacklist entries:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getUserBlacklistEntries:', error);
      return [];
    }
  }

  // Clean up old blacklist entries (older than 24 hours)
  static async cleanupOldEntries(): Promise<boolean> {
    try {
      const oneDayAgo = new Date();
      oneDayAgo.setHours(oneDayAgo.getHours() - 24);

      const { error } = await supabase
        .from('simulated_employees_blacklist')
        .delete()
        .lt('created_at', oneDayAgo.toISOString());

      if (error) {
        console.error('Error cleaning up old blacklist entries:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in cleanupOldEntries:', error);
      return false;
    }
  }
}