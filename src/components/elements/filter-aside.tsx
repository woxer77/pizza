'use client';

import React from 'react';

import CheckboxGroup from '@/ui/checkbox-group';
import { Button } from '@/ui/button';
import PriceFilter from '@/ui/price-filter';
import FilterSection from '@/elements/filter-section';

import type { ClassProps } from '@/types/common';
import { cn } from '@/lib/utils';
import useFilterAside from '@/hooks/useFilterAside';
import useSet from '@/hooks/useSet';

const MAX_PRICE = 100;

const FilterAside: React.FC<ClassProps> = ({ className }) => {
  const { ingredients, doughTypes, sizes, isBtnDisabled } = useFilterAside();

  const ingredientSet = useSet<string>();
  const doughTypeSet = useSet<string>();
  const sizeSet = useSet<string>();

  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, MAX_PRICE]);

  return (
    <aside
      className={cn(
        'sticky top-[132px] h-[calc(80vh-132px)] max-w-[244px] min-w-[150px] overflow-y-auto pr-2 pb-2',
        className
      )}
      tabIndex={-1}>
      <FilterSection title="Dough type">
        <CheckboxGroup
          items={doughTypes.data}
          loading={doughTypes.loading}
          predictedLength={2}
          checkedValues={doughTypeSet.values}
          onCheckboxClick={doughTypeSet.toggle}
          name="doughTypes"
        />
      </FilterSection>
      <hr className="my-6" />
      <FilterSection title="Price">
        <PriceFilter max={MAX_PRICE} step={1} onChange={setPriceRange} className="pl-1" />
      </FilterSection>
      <hr className="my-6" />
      <FilterSection title="Ingredients">
        <CheckboxGroup
          items={ingredients.data}
          loading={ingredients.loading}
          name="ingredients"
          checkedValues={ingredientSet.values}
          onCheckboxClick={ingredientSet.toggle}
          className="pb-1"
        />
      </FilterSection>
      <hr className="my-6" />
      <FilterSection title="Sizes">
        <CheckboxGroup
          items={sizes.data}
          loading={sizes.loading}
          predictedLength={4}
          name="sizes"
          checkedValues={sizeSet.values}
          onCheckboxClick={sizeSet.toggle}
          className="pb-1"
        />
      </FilterSection>
      <div className="pl-1">
        <Button disabled={isBtnDisabled} className="w-full">
          Submit
        </Button>
      </div>
    </aside>
  );
};

export default FilterAside;
