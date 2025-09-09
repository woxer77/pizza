'use client';

import React from 'react';

import { Input } from '@/ui/input';
import { Search as SearchIcon, X } from 'lucide-react';
import DropdownSearchItem from './dropdown-search-item';
import DropdownSearch from './dropdown-search';

import { cn } from '@/helpers/utils';
import { useSearch } from '@/hooks/search/use-search';
import { useSearchUI } from '@/hooks/search/use-search-ui';
import type { ClassProps } from '@/types/common';

interface SearchProps extends ClassProps, React.ComponentProps<'input'> {}

const Search: React.FC<SearchProps> = ({ className, placeholder }) => {
  const {
    inputText,
    setInputText,
    products,
    isFocused,
    setIsFocused,
    selectedIndex,
    setSelectedIndex,
    isLoading,
    dropdownRef,
    navigate,
    selectCurrent,
    reset
  } = useSearch();

  const { inputRef, containerRef, clearInput, handleKeyDown, handleBlur, handleFocus } = useSearchUI(
    isFocused,
    setInputText,
    setIsFocused,
    navigate,
    selectCurrent,
    reset
  );

  return (
    <>
      <div ref={containerRef} className={cn('group relative mx-16 w-full', className)}>
        <div className="relative z-30">
          <Input
            ref={inputRef}
            type="search"
            placeholder={placeholder}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              'border-1 border-neutral-300 px-10 !text-base transition-shadow duration-300 group-hover:shadow-md',
              isFocused && 'bg-background border-white focus-visible:ring-white/0'
            )}
          />
          <SearchIcon
            size={20}
            onMouseDown={(e) => e.preventDefault()}
            className="absolute top-1/2 left-3 -translate-y-1/2 stroke-neutral-400"
          />
          {inputText && (
            <X
              size={20}
              onMouseDown={clearInput}
              className={cn(
                'absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer stroke-neutral-400 transition-opacity hover:stroke-neutral-600',
                isFocused ? 'opacity-100' : 'opacity-70'
              )}
            />
          )}
        </div>
        <DropdownSearch
          ref={dropdownRef}
          isActive={isFocused && (products.length > 0 || isLoading)}
          className="z-30">
          {isLoading ? (
            <div className="px-4 py-2 text-center text-neutral-500">Searching...</div>
          ) : (
            products.map((product, index) => (
              <DropdownSearchItem
                key={product.id}
                product={product}
                isSelected={index === selectedIndex}
                onMouseEnter={() => setSelectedIndex(index)}
              />
            ))
          )}
        </DropdownSearch>
      </div>
      {isFocused && (
        <div
          className="fixed top-0 left-0 z-20 h-full w-full bg-black/50 transition-opacity"
          onMouseDown={reset}
        />
      )}
    </>
  );
};

export default Search;
