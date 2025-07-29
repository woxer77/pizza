'use client';

import React from 'react';

import CheckboxGroup from '@/ui/checkbox-group';
import { RadioGroup } from '@/ui/radio-group';
import RadioItem from '@/ui/radio-item';
import { Button } from '@/ui/button';
import PriceFilter from '@/ui/price-filter';

import type { ClassProps, FilterItem } from '@/types/common';
import { cn, upFirstLetter } from '@/lib/utils';

const ingredients: FilterItem[] = [
  { value: 'pepperoni', text: 'Pepperoni' },
  { value: 'mushrooms', text: 'Mushrooms' },
  { value: 'onions', text: 'Onions' },
  { value: 'sausage', text: 'Sausage' },
  { value: 'bacon', text: 'Bacon' },
  { value: 'extra cheese', text: 'Extra Cheese' },
  { value: 'black olives', text: 'Black Olives' },
  { value: 'green peppers', text: 'Green Peppers' },
  { value: 'pineapple', text: 'Pineapple' },
  { value: 'spinach', text: 'Spinach' },
  { value: 'spinach2', text: 'Spinach 2' }
];

const topFilters = [
  { value: 'ready to go', text: 'Ready to go' },
  { value: 'new', text: 'New' }
];

const FilterAside: React.FC<ClassProps> = ({ className }) => {
  return (
    <aside
      className={cn('sticky top-[132px] h-[calc(90vh-132px)] max-w-[244px] overflow-y-auto px-2 pb-2', className)}>
      <h3 className="mb-6 text-2xl font-bold">Filtration</h3>
      <CheckboxGroup items={topFilters} className="mb-6" />
      <hr className="my-6" />
      <h4 className="mb-2 font-bold">Price</h4>
      <PriceFilter max={100} step={1} />
      <hr className="my-6" />
      <CheckboxGroup items={ingredients} title="Ingredients" className="mb-6" />
      <hr className="my-6" />
      <RadioGroup defaultValue="traditional" title="Dough type" className="mb-6">
        <RadioItem value="traditional" text={upFirstLetter('traditional')} />
        <RadioItem value="slim" text={upFirstLetter('slim')} />
      </RadioGroup>
      <Button className="w-full">Submit</Button>
    </aside>
  );
};

export default FilterAside;
