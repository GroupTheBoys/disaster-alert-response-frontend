import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Search, MapPin, Home } from 'lucide-react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";

interface Location {
  lat: number;
  lng: number;
}

interface Disaster {
  id: number;
  type: string;
  location: Location;
  severity: string;
}

interface Shelter {
  id: number;
  name: string;
  location: Location;
}

interface EvacuationRoute {
  id: number;
  path: Location[];
}

// Mock data
const disasters: Disaster[] = [
  { id: 1, type: 'Flood', location: { lat: 34.052235, lng: -118.243683 }, severity: 'High' },
  { id: 2, type: 'Wildfire', location: { lat: 34.069444, lng: -118.445278 }, severity: 'Medium' },
];

const shelters: Shelter[] = [
  { id: 1, name: 'City Hall Shelter', location: { lat: 34.054208, lng: -118.242766 } },
  { id: 2, name: 'Community Center', location: { lat: 34.052030, lng: -118.243700 } },
];

const evacuationRoutes: EvacuationRoute[] = [
  { id: 1, path: [
    { lat: 34.052235, lng: -118.243683 },
    { lat: 34.054208, lng: -118.242766 }
  ]},
  { id: 2, path: [
    { lat: 34.069444, lng: -118.445278 },
    { lat: 34.052030, lng: -118.243700 }
  ]},
];

// Custom icons
const disasterIcon = new Icon({
  iconUrl: '/disaster-icon.png', // Replace with your icon
  iconSize: [25, 25],
});

const shelterIcon = new Icon({
  iconUrl: '/shelter-icon.png', // Replace with your icon
  iconSize: [25, 25],
});

const SafetyMaps: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const center: Location = { lat: 34.052235, lng: -118.243683 };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Safety Maps & Evacuation Routes</h1>
      
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="relative flex-grow mr-2">
            <Input
              type="text"
              placeholder="Search by location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Search
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardContent className="p-0">
            <MapContainer
              center={[center.lat, center.lng]}
              zoom={13}
              style={{ height: '600px', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              {disasters.map((disaster) => (
                <Marker
                  key={disaster.id}
                  position={[disaster.location.lat, disaster.location.lng]}
                  icon={disasterIcon}
                >
                  <Popup>
                    <strong>{disaster.type}</strong><br />
                    Severity: {disaster.severity}
                  </Popup>
                </Marker>
              ))}

              {shelters.map((shelter) => (
                <Marker
                  key={shelter.id}
                  position={[shelter.location.lat, shelter.location.lng]}
                  icon={shelterIcon}
                >
                  <Popup>{shelter.name}</Popup>
                </Marker>
              ))}

              {evacuationRoutes.map((route) => (
                <Polyline
                  key={route.id}
                  positions={route.path.map(pos => [pos.lat, pos.lng])}
                  color="blue"
                />
              ))}
            </MapContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Legend</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-red-500 mr-2" />
                <span>Disaster Area</span>
              </div>
              <div className="flex items-center">
                <Home className="h-5 w-5 text-green-500 mr-2" />
                <span>Shelter</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-0.5 bg-blue-500 mr-2"></div>
                <span>Evacuation Route</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SafetyMaps;