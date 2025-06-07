import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';

interface LoginFormProps {
  onLogin: (credentials: { username: string; password: string }) => void;
  onCreateAccount?: () => void;
  isEmployee?: boolean;
  isAdmin?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onCreateAccount, isEmployee = false, isAdmin = false }) => {
  const { language } = useApp();
  const t = useTranslation(language);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: t("error-title"),
        description: t("please-enter-both"),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // For admin authentication, pass credentials directly to parent handler
    if (isAdmin) {
      onLogin({ username, password });
      setIsLoading(false);
      return;
    }
    
    // For demo purposes, we'll simulate authentication for other user types
    setTimeout(() => {
      // Check for test accounts
      if (isEmployee && username === 'admin' && password === 'Admin1') {
        onLogin({ username, password });
      } else if (!isEmployee && username === 'user' && password === 'Useruser1') {
        onLogin({ username, password });
      } else {
        toast({
          title: t("auth-error"),
          description: t("invalid-username-password"),
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const primaryColor = isEmployee ? 'blue' : isAdmin ? 'purple' : 'green';
  const focusClasses = isEmployee 
    ? 'focus:ring-blue-600 focus:border-blue-600' 
    : isAdmin 
    ? 'focus:ring-purple-600 focus:border-purple-600'
    : 'focus:ring-green-600 focus:border-green-600';
  const buttonClasses = isEmployee 
    ? 'bg-blue-600 hover:bg-blue-700' 
    : isAdmin
    ? 'bg-purple-600 hover:bg-purple-700'
    : 'bg-green-600 hover:bg-green-700';
  const outlineClasses = isEmployee 
    ? 'border-blue-600 text-blue-600 hover:bg-blue-50' 
    : isAdmin
    ? 'border-purple-600 text-purple-600 hover:bg-purple-50'
    : 'border-green-600 text-green-600 hover:bg-green-50';

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{t('Sign In')}</CardTitle>
        <CardDescription>
          {isEmployee ? t('Welcome back to RoadSaver') : isAdmin ? t('Welcome back to RoadSaver') : t('Welcome back to RoadSaver')}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">{t('Username')}</Label>
            <Input
              id="username"
              placeholder={t('enter-username-placeholder')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className={`border-2 ${focusClasses}`}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t('Password')}</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={t('enter-password-placeholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className={`border-2 pr-10 ${focusClasses}`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-gray-500" />
                ) : (
                  <Eye size={18} className="text-gray-500" />
                )}
              </button>
            </div>
          </div>
        </CardContent>
        <CardFooter className={`flex ${onCreateAccount ? 'justify-between' : 'justify-end'} flex-wrap gap-2`}>
          {onCreateAccount && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCreateAccount}
              className={outlineClasses}
            >
              {t('Create Account')}
            </Button>
          )}
          <Button 
            type="submit" 
            className={buttonClasses}
            disabled={isLoading}
          >
            {isLoading ? t('signing-in') : t('Sign In')}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
