
import { toast } from "@/components/ui/use-toast";

export const useServiceValidation = () => {
  const validateMessage = (message: string, type: string): boolean => {
    const requiresDescription = type === 'other-car-problems';
    const messageMinLength = requiresDescription ? 20 : 0;
    const messageMaxLength = 300;

    if (requiresDescription && (message.length < messageMinLength || message.length > messageMaxLength)) {
      toast({
        title: "Invalid Description",
        description: `Description must be between ${messageMinLength} and ${messageMaxLength} characters.`,
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  return { validateMessage };
};
