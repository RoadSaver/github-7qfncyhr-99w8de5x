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

interface UnbanConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  userName: string;
  type: 'user' | 'employee';
}

const UnbanConfirmDialog: React.FC<UnbanConfirmDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  userName,
  type,
}) => {
  const getTitle = () => {
    return type === 'user' ? 'Reinstate User Access' : 'Reinstate Employee Access';
  };

  const getDescription = () => {
    return type === 'user' 
      ? `Are you sure you want to reinstate the selected user's access to the application?`
      : `Are you sure you want to reinstate the selected employee's access to the application?`;
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
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
            <div className="mt-3 text-green-600">
              This will restore their access to the system.
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No, don't reinstate and cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-green-600 hover:bg-green-700"
          >
            Yes, reinstate access
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UnbanConfirmDialog;