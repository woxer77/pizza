'use client';

import React from 'react';

import CheckboxGroup from '@/ui/checkbox-group';
import { Button } from '@/ui/button';
import PriceFilter from '@/ui/price-filter';
import FilterSection from '@/elements/filter-section';

import type { ClassProps, FilterItem } from '@/types/common';
import { cn } from '@/lib/utils';
import useFetch from '@/hooks/useFetch';
import Api from '@/services/api-client';

const FilterAside: React.FC<ClassProps> = ({ className }) => {
  const { data: ingredients, loading: ingredLoading } = useFetch({ fetchFunc: Api.ingredient.getAll });
  const ingredientItems: FilterItem[] =
    ingredients?.map((item) => ({ value: String(item.id), text: item.name })) || [];

  const { data: doughTypes, loading: doughLoading } = useFetch({ fetchFunc: Api.doughType.getAll });
  const doughTypeItems: FilterItem[] =
    doughTypes?.map((item) => ({ value: String(item.id), text: item.name })) || [];

  return (
    <aside
      className={cn(
        'sticky top-[132px] h-[calc(80vh-132px)] max-w-[244px] min-w-[150px] overflow-y-auto pr-2 pb-2',
        className
      )}
      tabIndex={-1}>
      <FilterSection title="Price">
        <PriceFilter max={100} step={1} className="pl-1" />
      </FilterSection>
      <hr className="my-6" />
      <FilterSection title="Ingredients">
        <CheckboxGroup items={ingredientItems} loading={ingredLoading} className="pb-1" />
      </FilterSection>
      <hr className="my-6" />
      <FilterSection title="Dough type">
        <CheckboxGroup items={doughTypeItems} loading={doughLoading} className="pl-1" />
      </FilterSection>
      <Button className="w-full">Submit</Button>
    </aside>
  );
};

export default FilterAside;
