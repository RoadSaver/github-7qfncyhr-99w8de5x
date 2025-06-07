import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface BanConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
  type: 'user' | 'employee';
}

const BanConfirmDialog: React.FC<BanConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  userName,
  type
}) => {
  const getTitle = () => {
    return type === 'user' ? 'Restrict User Access' : 'Restrict Employee Access';
  };

  const getDescription = () => {
    return type === 'user' 
      ? `Are you sure you want to restrict the selected user from using the app?`
      : `Are you sure you want to restrict the selected employee from using the app?`;
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{getTitle()}</AlertDialogTitle>
          <AlertDialogDescription>
            {getDescription()}
            {userName && (
              <div className="mt-2">
                <strong>{type === 'user' ? 'Username' : 'Employee'}:</strong> {userName}
              </div>
            )}
            <div className="mt-3 text-red-600">
              This action will prevent the {type} from accessing the system.
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel and don't restrict</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            Yes, restrict
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BanConfirmDialog;