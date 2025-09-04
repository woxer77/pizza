'use client';

import React from 'react';

import { Input } from '@/ui/input';
import { Search as SearchIcon, X } from 'lucide-react';
import DropdownSearchItem from './dropdown-search-item';
import DropdownSearch from './dropdown-search';

import type { ClassProps } from '@/types/common';
import { cn } from '@/helpers/utils';
import useDebounce from '@/hooks/useDebounce';
import Api from '@/services/api-client';
import type { Product } from '@/shared/types/product.interface';

interface SearchProps extends ClassProps, React.ComponentProps<'input'> {}

const Search: React.FC<SearchProps> = ({ className, placeholder }) => {
  const [inputText, setInputText] = React.useState('');
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isFocused, setIsFocused] = React.useState(false);

  const query = useDebounce(inputText, 200);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const clearInput = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.preventDefault();
    setInputText('');
    setProducts([]);
  };

  React.useEffect(() => {
    const fetchProducts = async () => {
      if (!query.trim()) {
        setProducts([]);
        return;
      }
      try {
        const products = await Api.product.search(query.trim());
        setProducts(products);
      } catch (error) {
        console.error(error); // TODO: error in UI
      }
    };

    fetchProducts();
  }, [query]);

  React.useEffect(() => {
    if (isFocused) {
      document.body.style.overflow = 'hidden';
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isFocused]);

  return (
    <>
      <div className={cn('group relative mx-16 w-full', className)}>
        <div ref={inputRef} onFocus={() => setIsFocused(true)} className="relative z-30">
          <Input
            type="search"
            placeholder={placeholder}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
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
          <X
            size={20}
            onMouseDown={clearInput}
            className={cn(
              'invisible absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer stroke-neutral-400 opacity-0 transition-opacity',
              isFocused && 'visible opacity-100'
            )}
          />
        </div>
        <DropdownSearch isActive={isFocused && products.length > 0} className="z-30">
          {products.map((product) => (
            <DropdownSearchItem key={product.id} product={product} />
          ))}
        </DropdownSearch>
      </div>
      <div
        className={cn(
          'invisible fixed top-0 left-0 z-20 h-full w-full bg-black opacity-0 transition-[opacity,visibility]',
          isFocused && 'visible opacity-50'
        )}
      />
    </>
  );
};

export default Search;
