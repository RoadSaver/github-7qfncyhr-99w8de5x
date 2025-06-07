
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { UserAccountService } from '@/services/userAccountService';
import { EmployeeAccountService } from '@/services/employeeAccountService';
import { Database, Users, UserCheck, RefreshCw, UserCog } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import UserManagement from './UserManagement';
import EmployeeManagement from './EmployeeManagement';
import SimulationManagement from './SimulationManagement';

const MigrationPanel: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'users' | 'employees' | 'simulation'>('dashboard');
  const [migrationStats, setMigrationStats] = useState({
    pendingUsers: 0,
    existingUsers: 0,
    employees: 0,
    simulationEmployees: 0
  });

  const refreshStats = async () => {
    try {
      const [pendingUsers, employees, existingUsers] = await Promise.all([
        UserAccountService.getPendingNewUsers(), 
        EmployeeAccountService.getAllEmployees(),
        UserAccountService.getExistingUsers()
      ]);
      
      // Get simulation employees count
      const { data: simulationEmployees } = await supabase
        .from('employee_simulation')
        .select('*');
      
      setMigrationStats({
        pendingUsers: pendingUsers.length,
        existingUsers: existingUsers?.length || 0,
        employees: employees.length,
        simulationEmployees: simulationEmployees?.length || 0
      });
    } catch (error) {
      console.error('Error refreshing stats:', error);
    }
  };

  React.useEffect(() => {
    refreshStats();
  }, []);

  if (currentView === 'users') {
    return <UserManagement onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'employees') {
    return <EmployeeManagement onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'simulation') {
    return <SimulationManagement onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">RoadSaver Account Manager Panel</h1>
        <p className="text-muted-foreground">
          Manage user and employee accounts
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{migrationStats.existingUsers}</div>
            <p className="text-xs text-muted-foreground mb-2">
              Existing users
            </p>
            <Button 
              onClick={() => setCurrentView('users')} 
              variant="outline" 
              size="sm" 
              className="w-full"
            >
              Manage Users
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employees</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{migrationStats.employees}</div>
            <p className="text-xs text-muted-foreground mb-2">
              Existing Employees
            </p>
            <Button 
              onClick={() => setCurrentView('employees')} 
              variant="outline" 
              size="sm" 
              className="w-full"
            >
              Manage Employees
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Simulation</CardTitle>
            <UserCog className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{migrationStats.simulationEmployees}</div>
            <p className="text-xs text-muted-foreground mb-2">
              Simulation employees
            </p>
            <Button 
              onClick={() => setCurrentView('simulation')} 
              variant="outline" 
              size="sm" 
              className="w-full"
            >
              Manage Employees simulation
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Refresh Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Refresh Statistics</CardTitle>
          <CardDescription>
            Update the statistics display with current database counts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={refreshStats} variant="secondary" className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Stats
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MigrationPanel;
