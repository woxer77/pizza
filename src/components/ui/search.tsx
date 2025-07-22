'use client';

import React from 'react';

import { Input } from '@/ui/input';
import { Search as SearchIcon } from 'lucide-react';

import type { ClassProps } from '@/types/common';
import { cn } from '@/lib/utils';
import useDebounce from '@/hooks/useDebounce';

interface ISearch extends ClassProps, React.ComponentProps<'input'> {}

const Search: React.FC<ISearch> = ({ className, placeholder }) => {
  const [inputText, setInputText] = React.useState('');
  const debouncedValue = useDebounce(inputText, 500);

  return (
    <div className={cn('relative mx-16 w-full', className)}>
      <Input
        type="search"
        placeholder={placeholder}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="border-1 border-neutral-300 px-10 py-4 !text-base"
      />
      <SearchIcon
        size={20}
        className="absolute top-1/2 left-3 -translate-y-1/2 stroke-neutral-400"
      />
    </div>
  );
};

export default Search;
