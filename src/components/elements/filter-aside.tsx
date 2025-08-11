'use client';

import React from 'react';

import CheckboxGroup from '@/ui/checkbox-group';
import { RadioGroup } from '@/ui/radio-group';
import RadioItem from '@/ui/radio-item';
import { Button } from '@/ui/button';
import PriceFilter from '@/ui/price-filter';
import FilterSection from '@/elements/filter-section';

import type { ClassProps } from '@/types/common';
import { cn, upFirstLetter } from '@/lib/utils';
import { ingredients, topFilters } from '@/constants/common';

const FilterAside: React.FC<ClassProps> = ({ className }) => {
  const TEMP_INGREDIENTS = ingredients.map((item) => {
    return { value: item.name.toLowerCase(), text: item.name };
  });

  return (
    <aside
      className={cn(
        'sticky top-[132px] h-[calc(90vh-132px)] max-w-[244px] min-w-[150px] overflow-y-auto pr-2 pb-2',
        className
      )}
      tabIndex={-1}>
      <FilterSection title="Filtration" titleClassName="text-2xl">
        <CheckboxGroup items={topFilters} />
      </FilterSection>
      <hr className="my-6" />
      <FilterSection title="Price">
        <PriceFilter max={100} step={1} className="pl-1" />
      </FilterSection>
      <hr className="my-6" />
      <FilterSection title="Ingredients">
        <CheckboxGroup items={TEMP_INGREDIENTS} className="pb-1" />
      </FilterSection>
      <hr className="my-6" />
      <FilterSection title="Dough type">
        <RadioGroup defaultValue="traditional" className="pl-1">
          <RadioItem value="traditional" text={upFirstLetter('traditional')} />
          <RadioItem value="slim" text={upFirstLetter('slim')} />
        </RadioGroup>
      </FilterSection>
      <Button className="w-full">Submit</Button>
    </aside>
  );
};

export default FilterAside;
