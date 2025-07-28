'use client';

import React from 'react';

import CheckboxGroup from '@/ui/checkbox-group';
import CheckboxItem from '@/components/ui/checkbox-item';
import { RadioGroup } from '@/ui/radio-group';
import RadioItem from '@/ui/radio-item';
import { Button } from '@/ui/button';
import PriceFilter from '@/ui/price-filter';

import type { ClassProps } from '@/types/common';
import { cn, upFirstLetter } from '@/lib/utils';

const ingredients = [
  'pepperoni',
  'mushrooms',
  'onions',
  'sausage',
  'bacon',
  'extra cheese',
  'black olives',
  'green peppers',
  'pineapple',
  'spinach'
];

const FilterAside: React.FC<ClassProps> = ({ className }) => {
  return (
    <aside
      className={cn(
        'sticky top-[108px] mt-10 h-[calc(100vh-108px)] max-w-[244px] overflow-y-auto p-2', // TODO: make all elem height fit the screen
        className
      )}>
      <h3 className="mb-6 text-2xl font-bold">Filtration</h3>
      <CheckboxGroup className="mb-6">
        <CheckboxItem value="readyToBuild" text="Ready to build" />
        <CheckboxItem value="new" text="New" />
      </CheckboxGroup>
      <hr className="my-6" />
      <h4 className="mb-2 font-bold">Price</h4>
      <PriceFilter max={100} step={1} />
      <hr className="my-6" />
      <CheckboxGroup title="Ingredients" className="mb-6">
        {ingredients.map((elem) => (
          <CheckboxItem key={elem} value={elem} text={upFirstLetter(elem)} />
        ))}
      </CheckboxGroup>
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
