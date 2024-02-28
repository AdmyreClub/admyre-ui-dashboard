"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface List {
  id: string;
  name: string;
}

interface Strategy {
  id: string;
  name: string;
  lists: List[];
}

interface SaveProfileDropdownProps {
  profileId: string;
}

const fetchStrategies = async (): Promise<Strategy[]> => {
  const response = await axios.get<Strategy[]>('/api/strategy/get-all');
  // Assume the API returns a sorted array; otherwise, sort it as needed
  return response.data.slice(0, 3); // Take only the first three strategies
};

const fetchListsForStrategy = async (strategyId: string): Promise<List[]> => {
  const response = await axios.get<List[]>(`/api/strategies/lists?q=${strategyId}/`);
  return response.data;
};

export const SaveProfileDropdown: React.FC<SaveProfileDropdownProps> = ({ profileId }) => {
  const [strategies, setStrategies] = useState<Strategy[]>([]);

  useEffect(() => {
    const loadData = async () => {
      let fetchedStrategies = await fetchStrategies();
      // Fetch lists only for the first three strategies
      fetchedStrategies = await Promise.all(fetchedStrategies.map(async (strategy) => {
        const lists = await fetchListsForStrategy(strategy.id);
        return { ...strategy, lists };
      }));
      setStrategies(fetchedStrategies);
    };

    loadData();
  }, []);

  const addProfileToList = async (listId: string) => {
    await axios.post(`/api/lists/${listId}/add-profile`, { profileId });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <DropdownMenuLabel>Save Profile</DropdownMenuLabel>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {strategies.map((strategy) => (
          <DropdownMenuSub key={strategy.id}>
            <DropdownMenuSubTrigger>{strategy.name}</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {strategy.lists.map((list) => (
                <DropdownMenuItem key={list.id} onSelect={() => addProfileToList(list.id)}>
                  {list.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        ))}
        {strategies.length === 0 && (
          <DropdownMenuItem disabled>Loading strategies...</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
