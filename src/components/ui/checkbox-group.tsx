import React from 'react';

import CheckboxItem from '@/ui/checkbox-item';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Skeleton } from '@/ui/skeleton';

import type { ClassProps, FilterItem } from '@/types/common';
import { cn } from '@/lib/utils';

interface CheckboxGroupProps extends ClassProps {
  title?: string;
  items: FilterItem[];
  limit?: number;
  loading?: boolean;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ className, title, items, limit = 5, loading }) => {
  const defaultItems = items.length > limit ? items.slice(0, limit) : items;
  const [displayedItems, setDisplayedItems] = React.useState(defaultItems);
  const [inputVisibility, setInputVisibility] = React.useState(false);
  const [inputText, setInputText] = React.useState('');

  const showItemsHandler = () => {
    if (items.length === displayedItems.length) {
      setInputVisibility(false);
      setDisplayedItems(items.slice(0, limit));
      setInputText('');
      return;
    }
    setInputVisibility(true);
    setDisplayedItems(items);
  };

  const filterItems = (value: string) => {
    setInputText(value);
  };

  React.useEffect(() => {
    if (inputText.trim()) {
      const clearInputText = inputText.trim().toLowerCase();
      const filteredItems = items.filter((item) => item.text.toLowerCase().includes(clearInputText));
      setDisplayedItems(filteredItems);
      return;
    }
    setDisplayedItems(items.slice(0, limit));
  }, [inputText, items, limit]);

  if (loading) {
    return Array.from({ length: limit }).map((_, idx) => <Skeleton key={idx} className="mb-2 h-6" />);
  }

  return (
    <section className={cn('flex max-h-96 flex-col gap-2 overflow-y-auto pl-1', className)} tabIndex={-1}>
      {title && <h4 className="font-bold">{title}</h4>}
      {inputVisibility && (
        <div className="pt-1 pr-2">
          <Input value={inputText} onChange={(e) => filterItems(e.target.value)} />
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        {displayedItems.map((item) => (
          <CheckboxItem key={item.value} value={item.value} text={item.text} />
        ))}
      </div>
      {items.length > limit && !inputText.trim() && (
        <Button
          variant="link"
          onClick={showItemsHandler}
          className="w-fit justify-start p-0 font-medium text-red-700">
          {items.length === displayedItems.length ? '- Hide' : '+ Show all'}
        </Button>
      )}
    </section>
  );
};

export default CheckboxGroup;
