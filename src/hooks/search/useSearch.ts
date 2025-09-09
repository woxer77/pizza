import React from 'react';
import { useRouter } from 'next/navigation';
import useDebounce from '@/hooks/useDebounce';
import Api from '@/services/api-client';
import type { Product } from '@/shared/types/product.interface';

export const useSearch = () => {
  const [inputText, setInputText] = React.useState('');
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isFocused, setIsFocused] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const query = useDebounce(inputText, 200);
  const dropdownRef = React.useRef<HTMLDivElement>(null!);

  const scrollToSelected = (index: number) => {
    const element = dropdownRef.current?.children[index] as HTMLElement;
    if (element) {
      element.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  };

  const navigate = (direction: 'up' | 'down') => {
    if (products.length === 0) return;

    const newIndex =
      direction === 'down'
        ? selectedIndex < products.length - 1
          ? selectedIndex + 1
          : 0
        : selectedIndex > 0
          ? selectedIndex - 1
          : products.length - 1;

    setSelectedIndex(newIndex);
    scrollToSelected(newIndex);
  };

  const selectCurrent = () => {
    if (selectedIndex >= 0 && selectedIndex < products.length) {
      router.push(`/products/${products[selectedIndex].id}`);
    }
  };

  const reset = () => {
    setIsFocused(false);
    setSelectedIndex(-1);
  };

  // Fetch products
  React.useEffect(() => {
    const fetchProducts = async () => {
      if (!query.trim()) {
        setProducts([]);
        setSelectedIndex(-1);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const products = await Api.product.search(query.trim());
        setProducts(products);
        setSelectedIndex(-1);
      } catch (error) {
        console.error('Search error:', error);
        setProducts([]);
        setSelectedIndex(-1);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  return {
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
  };
};
