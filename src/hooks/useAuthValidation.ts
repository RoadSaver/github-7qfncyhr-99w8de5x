
import { useFieldValidation, loadBlacklist } from './useFieldValidation';
import { useState, useEffect } from 'react';

// Simulated "database" - moved from RegisterForm
const simulatedExistingUsernames = ['admin', 'testuser', 'user123', 'account_admin'];
const simulatedExistingEmails = ['admin@example.com', 'test@example.com', 'roadsaverapp.acc.manager@gmail.com'];

export const useUsernameValidation = (t: (key: string) => string) => {
  const [usernameBlacklist, setUsernameBlacklist] = useState<string[]>([]);

  useEffect(() => {
    loadBlacklist('/lovable-uploads/bad-words.txt').then(setUsernameBlacklist);
  }, []);

  return useFieldValidation<string>(
    '',
    [
      (username) => {
        if (!username) {
          return { isValid: false, errorMessage: '' };
        }
        
        // Convert to lowercase for validation
        const lowerUsername = username.toLowerCase();
        
        // Length validation
        if (username.length < 6 || username.length > 20) {
          return { isValid: false, errorMessage: 'Username must be between 6-20 characters' };
        }
        
        // Must begin with alphanumeric character
        if (!/^[a-z0-9]/.test(lowerUsername)) {
          return { isValid: false, errorMessage: 'Username must begin with a letter or number' };
        }
        
        // Allowed characters only
        if (!/^[a-z0-9._'-]+$/.test(lowerUsername)) {
          return { isValid: false, errorMessage: 'Username can only contain letters, numbers, periods, dashes, underscores, and apostrophes' };
        }
        
        // No consecutive periods
        if (lowerUsername.includes('..')) {
          return { isValid: false, errorMessage: 'Username cannot contain consecutive periods' };
        }
        
        // No spaces
        if (username.includes(' ')) {
          return { isValid: false, errorMessage: 'Username cannot contain spaces' };
        }
        
        // Check against existing usernames
        if (simulatedExistingUsernames.includes(lowerUsername)) {
          return { isValid: false, errorMessage: t('username-taken-error') };
        }
        
        // Check against blacklist
        if (usernameBlacklist.some(word => lowerUsername.includes(word))) {
          return { isValid: false, errorMessage: 'Username contains inappropriate content' };
        }
        
        return { isValid: true, errorMessage: null };
      }
    ],
    [t, usernameBlacklist]
  );
};

export const useEmailValidation = (t: (key: string) => string) => {
  return useFieldValidation<string>(
    '',
    [
      (email) => {
        if (!email) {
          return { isValid: false, errorMessage: '' };
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return { isValid: false, errorMessage: t('email-invalid-format') };
        }
        if (simulatedExistingEmails.includes(email.toLowerCase())) {
          return { isValid: false, errorMessage: t('email-taken-error') };
        }
        return { isValid: true, errorMessage: null };
      }
    ],
    [t]
  );
};

export const usePhoneNumberValidation = (t: (key: string) => string) => {
  return useFieldValidation<string>(
    '+359',
    [
      (phoneNumber) => {
        // Allow empty or default placeholder initially without error
        if (!phoneNumber || phoneNumber === '+359' || phoneNumber.trim() === '+359') {
          return { isValid: true, errorMessage: null };
        }
        // Validate only if it's not empty and not the placeholder
        if (phoneNumber.length !== 13 || !phoneNumber.startsWith('+359')) {
          return { isValid: false, errorMessage: t('phone-invalid-format') };
        }
        return { isValid: true, errorMessage: null };
      }
    ],
    [t]
  );
};

export const usePasswordValidation = (t: (key: string) => string) => {
  const [passwordBlacklist, setPasswordBlacklist] = useState<string[]>([]);

  useEffect(() => {
    loadBlacklist('/lovable-uploads/password blacklist.txt').then(setPasswordBlacklist);
  }, []);

  return useFieldValidation<string>(
    '',
    [
      (password) => {
        if (!password) {
          return { isValid: false, errorMessage: '' };
        }
        
        // Length validation
        if (password.length < 8) {
          return { isValid: false, errorMessage: 'Password must be at least 8 characters long' };
        }
        
        // Uppercase letter validation
        if (!/[A-Z]/.test(password)) {
          return { isValid: false, errorMessage: 'Password must contain at least one uppercase letter' };
        }
        
        // Lowercase letter validation
        if (!/[a-z]/.test(password)) {
          return { isValid: false, errorMessage: 'Password must contain at least one lowercase letter' };
        }
        
        // Number validation
        if (!/[0-9]/.test(password)) {
          return { isValid: false, errorMessage: 'Password must contain at least one number' };
        }
        
        // Special character validation
        if (!/[~`!@#$%^&*()\-_+={}[\]|\\;:"<>,./?]/.test(password)) {
          return { isValid: false, errorMessage: 'Password must contain at least one special character' };
        }
        
        // Check against blacklist
        if (passwordBlacklist.some(word => password.toLowerCase().includes(word.toLowerCase()))) {
          return { isValid: false, errorMessage: 'Password contains forbidden content' };
        }
        
        return { isValid: true, errorMessage: null };
      }
    ],
    [t, passwordBlacklist]
  );
};

export const useConfirmPasswordValidation = (password: string, t: (key: string) => string) => {
  return useFieldValidation<string>(
    '',
    [
      (confirmPassword) => {
        if (!confirmPassword && !password) {
          return { isValid: false, errorMessage: '' };
        }
        if (password && confirmPassword && password !== confirmPassword) {
          return { isValid: false, errorMessage: t('passwords-do-not-match') };
        }
        if (password && !confirmPassword) {
          return { isValid: false, errorMessage: t('passwords-do-not-match') };
        }
        if (!password && confirmPassword) {
          return { isValid: false, errorMessage: '' };
        }
        return { isValid: true, errorMessage: null };
      }
    ],
    [password, t]
  );
};
