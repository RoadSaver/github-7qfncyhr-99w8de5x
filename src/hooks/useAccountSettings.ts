import { useState, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';

// In a real app, this user data structure and its origin would be more robust.
// For this refactor, we keep it similar to the original simulatedUser.
const initialSimulatedUser = { 
    username: 'user',
    email: 'demo@roadsaver.com',
    phoneNumber: '+359987654321',
    currentPassword: 'password123' 
};

export const useAccountSettings = () => {
    const defaultUserAvatar = '/lovable-uploads/0a354359-97fd-4c78-a387-7423f09f2554.png';
    const [userAvatar, setUserAvatar] = useState<string>(defaultUserAvatar);
    
    const [username, setUsername] = useState(initialSimulatedUser.username);
    const [email, setEmail] = useState(initialSimulatedUser.email);
    const [phoneNumber, setPhoneNumber] = useState(initialSimulatedUser.phoneNumber);
    const [currentPassword, setCurrentPassword] = useState(initialSimulatedUser.currentPassword);

    const handleAvatarChange = useCallback((file: File | null) => {
        if (file) {
            console.log('Avatar file to upload:', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserAvatar(reader.result as string);
                toast({ title: "Avatar Updated", description: "Your avatar has been changed."});
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const handleUsernameSave = useCallback((newUsernameValue: string) => {
        setUsername(newUsernameValue);
    }, []);

    const handleEmailSave = useCallback((newEmailValue: string) => {
        setEmail(newEmailValue);
    }, []);

    const handlePhoneNumberSave = useCallback((newPhoneNumberValue: string) => {
        setPhoneNumber(newPhoneNumberValue);
    }, []);

    const handlePasswordSave = useCallback((newPasswordValue: string) => {
        setCurrentPassword(newPasswordValue);
        // This state update replaces the direct mutation of simulatedUser.currentPassword
    }, []);
    
    return {
        userAvatar,
        defaultUserAvatar,
        username,
        email,
        phoneNumber,
        currentPasswordForVerification: currentPassword,
        handleAvatarChange,
        handleUsernameSave,
        handleEmailSave,
        handlePhoneNumberSave,
        handlePasswordSave,
    };
};
