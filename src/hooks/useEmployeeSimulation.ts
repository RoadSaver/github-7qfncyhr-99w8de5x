import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface EmployeeSimulation {
  id: number;
  employee_number: number;
  full_name: string;
  created_at: string;
}

export const useEmployeeSimulation = () => {
  const [employees, setEmployees] = useState<EmployeeSimulation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadEmployees = useMemo(() => async () => {
    try {
      const { data, error } = await supabase
        .from('employee_simulation')
        .select('id, employee_number, full_name, created_at')
        .order('employee_number', { ascending: true });

      if (error) {
        console.error('Error loading employees:', error);
        return;
      }

      setEmployees(data || []);
    } catch (error) {
      console.error('Error in loadEmployees:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  const getRandomEmployee = useMemo(() => (excludedNames: string[] = []): EmployeeSimulation | null => {
    const availableEmployees = employees.filter(emp => 
      !excludedNames.includes(emp.full_name)
    );
    
    if (availableEmployees.length === 0) {
      return null;
    }
    
    return availableEmployees[Math.floor(Math.random() * availableEmployees.length)];
  }, [employees]);

  return {
    employees,
    isLoading,
    getRandomEmployee,
    loadEmployees
  };
};