"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

// Define types for your suggestions and selected locations
type LocationType = {
  cities: string[];
  states: string[];
  countries: string[];
};

// Define the schema using zod
const locationSchema = z.object({
  location: z.string().optional(),
});

type LocationSchemaType = z.infer<typeof locationSchema>;

export default function LocationFilterUI() {
  const [locations, setLocations] = useState<LocationType>({ cities: [], states: [], countries: [] });
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const { handleSubmit, reset, register, formState: { errors } } = useForm<LocationSchemaType>({
    resolver: zodResolver(locationSchema),
  });

  useEffect(() => {
    axios.get('/api/locations')
    .then(response => {
      // Process data to remove duplicates with explicit type assertion
      const uniqueCities = Array.from(new Set(response.data.cities)) as string[];
      const uniqueStates = Array.from(new Set(response.data.states)) as string[];
      const uniqueCountries = Array.from(new Set(response.data.countries)) as string[];
      setLocations({ cities: uniqueCities, states: uniqueStates, countries: uniqueCountries });
    })
    .catch(error => console.error('Failed to fetch locations:', error));

  }, []);

  useEffect(() => {
    // Set default suggestions when the component mounts
    setSuggestions(['Mumbai', 'Bangalore', 'Delhi', 'Chennai', 'Ahmedabad']);

    // Only filter suggestions if there is a query
    if (query) {
      const combinedLocations = [
        ...locations.cities,
        ...locations.states,
        ...locations.countries
      ].filter(Boolean); // Filter out null or undefined values

      const filteredSuggestions = combinedLocations.filter(location =>
        location.toLowerCase().includes(query.toLowerCase())
      );

      setSuggestions(filteredSuggestions);
    }
  }, [query, locations]);


  const handleSelectSuggestion = (suggestion: string): void => {
    setSelectedLocations(prev => !prev.includes(suggestion) ? [...prev, suggestion] : prev);
    setQuery('');
  };

  const handleRemoveLocation = (location: string): void => {
    setSelectedLocations(prev => prev.filter(l => l !== location));
  };

  const onSubmit: SubmitHandler<LocationSchemaType> = (data) => {
    console.log('Selected Locations:', selectedLocations);
  };

  return (
    <div className="space-y-8 p-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('location')}
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder="Type to search for locations"
               className="w-full px-4 py-2 border rounded-md" />

        <ScrollArea className="h-[200px] mt-2 rounded-md border p-2">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                 onClick={() => handleSelectSuggestion(suggestion)}>
              {suggestion}
            </div>
          ))}
        </ScrollArea>

        <div className="flex flex-wrap gap-2 mt-4">
          {selectedLocations.map((location, index) => (
            <span key={index} className="flex items-center gap-2 border px-3 py-1 rounded-full">
              {location}
              <button type="button" onClick={() => handleRemoveLocation(location)} className="rounded-full text-sm p-1">
                <X size={18} />
              </button>
            </span>
          ))}
        </div>

        {errors.location && <p className="text-red-500">{errors.location.message}</p>}

        <div className="flex justify-between mt-5">
        <Button variant="outline" onClick={() => {
          reset(); // Resets form fields to default values
          setSelectedLocations([]); // Clears the selected locations
        }}>Clear</Button>

          <Button type="submit">Apply</Button>
        </div>
      </form>
    </div>
  );
}

