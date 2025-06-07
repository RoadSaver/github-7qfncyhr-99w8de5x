import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Plus, Edit, Eye, EyeOff, Ban, UserCheck } from 'lucide-react';
import { EmployeeAccountService } from '@/services/employeeAccountService';
import { toast } from '@/components/ui/use-toast';
import CreateEmployeeModal from './CreateEmployeeModal';
import EditEmployeeModal from './EditEmployeeModal';
import BanConfirmDialog from './BanConfirmDialog';
import UnbanConfirmDialog from './UnbanConfirmDialog';

interface EmployeeAccount {
  id: string;
  username: string;
  email: string;
  phone_number?: string;
  employee_role?: string;
  status?: string;
  real_name?: string;
  created_at: string;
}

interface EmployeeManagementProps {
  onBack: () => void;
}

const EmployeeManagement: React.FC<EmployeeManagementProps> = ({ onBack }) => {
  const [employees, setEmployees] = useState<EmployeeAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPasswords, setShowPasswords] = useState<{[key: string]: boolean}>({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBanDialog, setShowBanDialog] = useState(false);
  const [showUnbanDialog, setShowUnbanDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeAccount | null>(null);

  const loadEmployees = async () => {
    try {
      const employeeData = await EmployeeAccountService.getAllEmployees();
      setEmployees(employeeData || []);
    } catch (error) {
      console.error('Error loading employees:', error);
      toast({
        title: "Error",
        description: "Failed to load employees",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleEmployeeCreated = () => {
    // Reload the employees list after a new employee is created
    loadEmployees();
  };

  const handleEmployeeUpdated = () => {
    loadEmployees();
    setSelectedEmployee(null);
  };

  const handleEditEmployee = (employee: EmployeeAccount) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  const handleBanEmployee = (employee: EmployeeAccount) => {
    setSelectedEmployee(employee);
    setShowBanDialog(true);
  };

  const handleUnbanEmployee = (employee: EmployeeAccount) => {
    setSelectedEmployee(employee);
    setShowUnbanDialog(true);
  };

  const confirmBanEmployee = async () => {
    if (!selectedEmployee) return;

    try {
      await EmployeeAccountService.updateEmployeeStatus(selectedEmployee.id, 'suspended');
      toast({
        title: "Employee Restricted",
        description: `${selectedEmployee.username} has been restricted from using the app`
      });
      loadEmployees();
    } catch (error) {
      console.error('Error banning employee:', error);
      toast({
        title: "Error",
        description: "Failed to restrict employee",
        variant: "destructive"
      });
    } finally {
      setShowBanDialog(false);
      setSelectedEmployee(null);
    }
  };

  const confirmUnbanEmployee = async () => {
    if (!selectedEmployee) return;

    try {
      await EmployeeAccountService.updateEmployeeStatus(selectedEmployee.id, 'active');
      toast({
        title: "Employee Access Reinstated",
        description: `${selectedEmployee.username}'s access has been restored`
      });
      loadEmployees();
    } catch (error) {
      console.error('Error unbanning employee:', error);
      toast({
        title: "Error",
        description: "Failed to reinstate employee access",
        variant: "destructive"
      });
    } finally {
      setShowUnbanDialog(false);
      setSelectedEmployee(null);
    }
  };

  const togglePasswordVisibility = (employeeId: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [employeeId]: !prev[employeeId]
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Employee Management</h1>
          <p className="text-muted-foreground">Manage employee accounts</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Employees ({employees.length})
            <Button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create New Employee
            </Button>
          </CardTitle>
          <CardDescription>
            View and manage all employee accounts from the Employee Accounts database
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading employees...</div>
          ) : employees.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No employees found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Password Tools</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.real_name || 'N/A'}</TableCell>
                    <TableCell className="font-medium">{employee.username}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.phone_number || 'N/A'}</TableCell>
                    <TableCell>{employee.employee_role || 'technician'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        employee.status === 'suspended' 
                          ? 'bg-red-100 text-red-800' 
                          : employee.status === 'inactive'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {employee.status === 'suspended' ? 'Restricted' : 
                         employee.status === 'inactive' ? 'Inactive' : 'Active'}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(employee.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => togglePasswordVisibility(employee.id)}
                      >
                        {showPasswords[employee.id] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditEmployee(employee)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        {employee.status === 'suspended' ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleUnbanEmployee(employee)}
                            className="border-green-500 text-green-600 hover:bg-green-50"
                          >
                            <UserCheck className="h-4 w-4 mr-1" />
                            Unban
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleBanEmployee(employee)}
                            className="border-red-500 text-red-600 hover:bg-red-50"
                          >
                            <Ban className="h-4 w-4 mr-1" />
                            Ban
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <CreateEmployeeModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onEmployeeCreated={handleEmployeeCreated}
      />

      {selectedEmployee && (
        <EditEmployeeModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedEmployee(null);
          }}
          onEmployeeUpdated={handleEmployeeUpdated}
          employee={selectedEmployee}
        />
      )}

      <BanConfirmDialog
        isOpen={showBanDialog}
        onClose={() => {
          setShowBanDialog(false);
          setSelectedEmployee(null);
        }}
        onConfirm={confirmBanEmployee}
        userName={selectedEmployee?.username || ''}
        type="employee"
      />

      <UnbanConfirmDialog
        open={showUnbanDialog}
        onOpenChange={() => {
          setShowUnbanDialog(false);
          setSelectedEmployee(null);
        }}
        onConfirm={confirmUnbanEmployee}
        userName={selectedEmployee?.username || ''}
        type="employee"
      />
    </div>
  );
};

export default EmployeeManagement;