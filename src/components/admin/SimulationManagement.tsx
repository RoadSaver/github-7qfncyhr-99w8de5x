
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Plus, Edit } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface SimulationEmployee {
  id: number;
  employee_number: number;
  full_name: string;
  created_at: string;
}

interface SimulationManagementProps {
  onBack: () => void;
}

const SimulationManagement: React.FC<SimulationManagementProps> = ({ onBack }) => {
  const [simulationEmployees, setSimulationEmployees] = useState<SimulationEmployee[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSimulationEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from('employee_simulation')
        .select('*')
        .order('employee_number');

      if (error) throw error;
      setSimulationEmployees(data || []);
    } catch (error) {
      console.error('Error loading simulation employees:', error);
      toast({
        title: "Error",
        description: "Failed to load simulation employees",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSimulationEmployees();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Simulation Employee Management</h1>
          <p className="text-muted-foreground">Manage simulation employee accounts</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Simulation Employees ({simulationEmployees.length})
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create New Simulation Employee
            </Button>
          </CardTitle>
          <CardDescription>
            View and manage all simulation employee accounts from the Employee Simulation database
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading simulation employees...</div>
          ) : simulationEmployees.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No simulation employees found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee Number</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {simulationEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">#{employee.employee_number}</TableCell>
                    <TableCell>{employee.full_name}</TableCell>
                    <TableCell>{new Date(employee.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SimulationManagement;
