
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import GoogleMap from './GoogleMap';

interface MapInputProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  initialLocation?: { lat: number; lng: number };
}

const MapInput: React.FC<MapInputProps> = ({ onLocationSelect, initialLocation }) => {
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newLocation = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      setSelectedLocation(newLocation);
    }
  };

  const handleConfirm = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-2">Click on the map to select your current location</p>
      <div className="h-[300px] relative">
        <GoogleMap 
          userLocation={selectedLocation} 
          height="300px"
          onMapClick={handleMapClick} 
        />
      </div>
      <div className="flex justify-end">
        <Button 
          onClick={handleConfirm}
          disabled={!selectedLocation}
          className="bg-roadsaver-primary hover:bg-roadsaver-primary/90"
        >
          Confirm Location
        </Button>
      </div>
    </div>
  );
};

export default MapInput;
