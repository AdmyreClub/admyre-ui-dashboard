"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const KeywordsFilterUI = ({ onDataFromChild, defaultVal }) => {
  const [keywords, setKeywords] = useState(defaultVal || []);
  const { register, handleSubmit, reset } = useForm();

  const handleKeywordInput = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const newKeyword = event.target.value.trim();
      if (newKeyword && !keywords.includes(newKeyword)) {
        setKeywords([...keywords, newKeyword]);
        event.target.value = '';
      }
    }
  };

  const removeKeyword = (keywordToRemove) => {
    setKeywords(keywords.filter(keyword => keyword !== keywordToRemove));
  };

  const onSubmit = () => {
    onDataFromChild(keywords);
  };

  const clearKeywords = () => {
    setKeywords([]);
    reset();
  };

  return (
    <div className="space-y-8 p-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="keyword-input">Keywords</Label>
          <Input
            id="keyword-input"
            placeholder="Type keywords and press Enter or Space"
            onKeyDown={handleKeywordInput}
            {...register("keywords")}
          />
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {keywords.map((keyword, index) => (
            <span key={index} className="flex items-center gap-2 border px-3 py-1 rounded-full">
              {keyword}
              <button type="button" onClick={() => removeKeyword(keyword)} className="rounded-full text-sm p-1">
                <X size={18} />
              </button>
            </span>
          ))}
        </div>

        <div className="flex justify-between mt-5">
          <Button variant="outline" onClick={clearKeywords}>Clear</Button>
          <Button type="submit">Apply</Button>
        </div>
      </form>
    </div>
  );
};

export default KeywordsFilterUI;
