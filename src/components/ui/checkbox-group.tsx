import React from 'react';

import CheckboxItem from '@/ui/checkbox-item';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';

import type { ClassProps, FilterItem } from '@/types/common';
import { cn } from '@/lib/utils';
import useDebounce from '@/hooks/useDebounce';

interface CheckboxGroupProps extends ClassProps {
  title?: string;
  items: FilterItem[];
  limit?: number;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ className, title, items, limit = 5 }) => {
  const defaultItems = items.length > limit ? items.slice(0, limit) : items;
  const [displayedItems, setDisplayedItems] = React.useState(defaultItems);
  const [inputVisibility, setInputVisibility] = React.useState(false);
  const [inputText, setInputText] = React.useState('');
  const debouncedValue = useDebounce(inputText, 300);

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
    if (!inputVisibility) return;
    if (!debouncedValue.trim()) {
      setDisplayedItems(items);
      return;
    }

    const debounceLowerCase = debouncedValue.trim().toLowerCase();
    const filteredItems = items.filter((item) => item.value.toLowerCase().includes(debounceLowerCase));
    setDisplayedItems(filteredItems);
  }, [debouncedValue, inputVisibility, items]);

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
      {items.length > limit && !debouncedValue.trim() && (
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
