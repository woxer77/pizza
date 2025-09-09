import { BLUR_RESET_DELAY_MS } from '@/constants/common';
import React from 'react';

export const useSearchUI = (
  isFocused: boolean,
  setInputText: (text: string) => void,
  setIsFocused: (focused: boolean) => void,
  navigate: (direction: 'up' | 'down') => void,
  selectCurrent: () => void,
  reset: () => void
) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const clearInput = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    setInputText('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isFocused) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        navigate('down');
        break;
      case 'ArrowUp':
        event.preventDefault();
        navigate('up');
        break;
      case 'Enter':
        event.preventDefault();
        selectCurrent();
        break;
      case 'Escape':
      case 'Tab':
        reset();
        if (event.key === 'Escape') {
          event.preventDefault();
          inputRef.current?.blur();
        }
        break;
    }
  };

  const handleBlur = () => {
    setTimeout(() => reset(), BLUR_RESET_DELAY_MS);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  // Click outside effect
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        reset();
      }
    };

    if (isFocused) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFocused, reset]);

  return {
    inputRef,
    containerRef,
    clearInput,
    handleKeyDown,
    handleBlur,
    handleFocus
  };
};
