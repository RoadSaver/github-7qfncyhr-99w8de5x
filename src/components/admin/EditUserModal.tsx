import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: any;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, user }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p>Edit user functionality will be implemented here.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;