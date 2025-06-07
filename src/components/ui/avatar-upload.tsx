
import React, { useRef, useState } from 'react';
import { Button } from './button';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';
import { Plus, Upload } from 'lucide-react';
import { toast } from './use-toast';
import { cn } from '@/lib/utils'; // Import cn utility

interface AvatarUploadProps {
  currentAvatar?: string;
  onAvatarChange: (file: File | null) => void;
  defaultAvatar: string;
  size?: number;
  variant?: 'user' | 'employee';
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  currentAvatar,
  onAvatarChange,
  defaultAvatar,
  size = 48,
  variant = 'user',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(currentAvatar || defaultAvatar);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PNG, JPEG, JPG, GIF, or SVG file",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (2MB limit)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 2MB",
        variant: "destructive"
      });
      return;
    }

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onAvatarChange(file);

    toast({
      title: "Avatar uploaded",
      description: "Your avatar has been updated successfully"
    });
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const circleColor = variant === 'user' ? 'bg-green-600' : 'bg-blue-600';
  const hoverCircleColor = variant === 'user' ? 'hover:bg-green-700' : 'hover:bg-blue-700';

  return (
    <div className="relative inline-block">
      <div
        className={`relative rounded-full overflow-hidden border-2 ${variant === 'user' ? 'border-green-600' : 'border-blue-600'}`}
        style={{ width: size, height: size }}
      >
        <Avatar className="w-full h-full">
          <AvatarImage src={previewUrl} alt="Avatar" className="object-cover" />
          <AvatarFallback className={`${circleColor} text-white`}>
            <Upload className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </div>
      
      <Button
        size="icon"
        variant="default"
        className={cn(
          "absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-2 border-white",
          circleColor,
          hoverCircleColor,
          "animate-[pulse_3s_ease-in-out_alternate_infinite]" // Custom animation: alternating between fast and slow pulse
        )}
        onClick={triggerFileSelect}
      >
        <Plus className="h-3 w-3" />
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".png,.jpeg,.jpg,.gif,.svg"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default AvatarUpload;

