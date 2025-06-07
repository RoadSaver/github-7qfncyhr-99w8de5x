
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface GoogleMapsSetupProps {
  children: React.ReactNode;
}

// Default API key provided
const DEFAULT_API_KEY = 'AIzaSyCZUaQ2lpBKB7j5_BQMrPgXWAw2yLx9j20';

const GoogleMapsSetup: React.FC<GoogleMapsSetupProps> = ({ children }) => {
  const [apiKey, setApiKey] = useState(DEFAULT_API_KEY);
  const [isLoading, setIsLoading] = useState(false);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  useEffect(() => {
    // Check if API key is already stored
    const storedApiKey = localStorage.getItem('google_maps_api_key');
    if (storedApiKey) {
      setIsSetupComplete(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setIsLoading(true);
      localStorage.setItem('google_maps_api_key', apiKey.trim());
      setTimeout(() => {
        setIsSetupComplete(true);
        setIsLoading(false);
      }, 500);
    }
  };

  if (isSetupComplete) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle>Google Maps Setup</CardTitle>
          <CardDescription>
            Enter your Google Maps API key to enable interactive maps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Enter Google Maps API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-2">
                A default API key is pre-filled for your convenience
              </p>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={!apiKey.trim() || isLoading}
            >
              {isLoading ? 'Setting up...' : 'Enable Maps'}
            </Button>
          </form>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700">
              <strong>How to get an API key:</strong><br />
              1. Go to Google Cloud Console<br />
              2. Create or select a project<br />
              3. Enable Maps JavaScript API<br />
              4. Create credentials (API Key)<br />
              5. Restrict the key to your domain
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleMapsSetup;
