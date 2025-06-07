import { supabase } from '@/integrations/supabase/client';

export interface EmployeeAccount {
  username: string;
  email: string;
  phone_number?: string;
  employee_role?: string;
  status?: 'active' | 'inactive' | 'suspended';
  real_name?: string;
}

export class EmployeeAccountService {
  // Create a new employee account
  static async createEmployeeAccount(employeeData: EmployeeAccount) {
    try {
      const { data, error } = await supabase.rpc('create_employee_account', {
        p_username: employeeData.username,
        p_email: employeeData.email,
        p_phone_number: employeeData.phone_number,
        p_employee_role: employeeData.employee_role || 'technician',
        p_real_name: employeeData.real_name
      });

      if (error) {
        console.error('Error creating employee account:', error);
        throw error;
      }

      console.log('Employee account created with ID:', data);
      return data;
    } catch (error) {
      console.error('Error in createEmployeeAccount:', error);
      throw error;
    }
  }

  // Get all employee accounts
  static async getAllEmployees() {
    try {
      const { data, error } = await supabase
        .from('employee_accounts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching employees:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in getAllEmployees:', error);
      throw error;
    }
  }

  // Get employee account by ID
  static async getEmployeeById(employeeId: string) {
    try {
      const { data, error } = await supabase
        .from('employee_accounts')
        .select('*')
        .eq('id', employeeId)
        .single();

      if (error) {
        console.error('Error fetching employee:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in getEmployeeById:', error);
      throw error;
    }
  }

  // Get employee account by username
  static async getEmployeeByUsername(username: string) {
    try {
      const { data, error } = await supabase
        .from('employee_accounts')
        .select('*')
        .eq('username', username)
        .single();

      if (error) {
        console.error('Error fetching employee by username:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in getEmployeeByUsername:', error);
      throw error;
    }
  }

  // Update employee account
  static async updateEmployee(employeeId: string, updates: Partial<EmployeeAccount>) {
    try {
      const { data, error } = await supabase
        .from('employee_accounts')
        .update(updates)
        .eq('id', employeeId)
        .select()
        .single();

      if (error) {
        console.error('Error updating employee:', error);
        throw error;
      }

      console.log('Employee updated successfully:', data);
      return data;
    } catch (error) {
      console.error('Error in updateEmployee:', error);
      throw error;
    }
  }

  // Update employee status
  static async updateEmployeeStatus(employeeId: string, status: 'active' | 'inactive' | 'suspended') {
    try {
      const { data, error } = await supabase
        .from('employee_accounts')
        .update({ status })
        .eq('id', employeeId)
        .select()
        .single();

      if (error) {
        console.error('Error updating employee status:', error);
        throw error;
      }

      console.log('Employee status updated:', data);
      return data;
    } catch (error) {
      console.error('Error in updateEmployeeStatus:', error);
      throw error;
    }
  }

  // Get active employees
  static async getActiveEmployees() {
    try {
      const { data, error } = await supabase
        .from('employee_accounts')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching active employees:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in getActiveEmployees:', error);
      throw error;
    }
  }
}