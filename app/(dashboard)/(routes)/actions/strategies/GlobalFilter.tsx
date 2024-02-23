import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

interface GlobalFilterProps {
  filter: string;
  setFilter: (value: string | undefined) => void;
  placeholder: string;
}

const GlobalFilter: React.FC<GlobalFilterProps> = ({ filter, setFilter, placeholder }) => {
  const [value, setValue] = useState<string | undefined>(filter);

  const onChange = (value: string) => {
    setFilter(value || undefined);
  }

  return (
    <span className='mt-[-30px]'>
      
      <Input
      className='w-[200px] '
      placeholder={placeholder}
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </span>
  );
};

export default GlobalFilter;
