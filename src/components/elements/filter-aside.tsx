'use client';

import React from 'react';

import CheckboxGroup from '@/ui/checkbox-group';
import { Button } from '@/ui/button';
import PriceFilter from '@/ui/price-filter';
import FilterSection from '@/elements/filter-section';

import type { ClassProps } from '@/types/common';
import { cn } from '@/lib/utils';
import useFilterAside from '@/hooks/useFilterAside';

const FilterAside: React.FC<ClassProps> = ({ className }) => {
  const { ingredients, doughTypes, sizes, isBtnDisabled } = useFilterAside();
  const [ingredientValues, setIngredientValues] = React.useState(new Set<string>([]));
  const [doughTypeValues, setDoughTypeValues] = React.useState(new Set<string>([]));
  const [sizeValues, setSizeValues] = React.useState(new Set<string>([]));

  console.log(ingredientValues, doughTypeValues, sizeValues);

  const toggleSet = React.useCallback(<T,>(setValue: React.Dispatch<React.SetStateAction<Set<T>>>, id: T) => {
    setValue((prev) => {
      const newValue = new Set(prev);

      if (prev.has(id)) {
        newValue.delete(id);
      } else {
        newValue.add(id);
      }

      return newValue;
    });
  }, []);

  const handleIngredientsClick = React.useCallback(
    (id: string) => {
      toggleSet(setIngredientValues, id);
    },
    [toggleSet]
  );
  const handleDoughTypesClick = React.useCallback(
    (id: string) => {
      toggleSet(setDoughTypeValues, id);
    },
    [toggleSet]
  );
  const handleSizesClick = React.useCallback(
    (id: string) => {
      toggleSet(setSizeValues, id);
    },
    [toggleSet]
  );

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
          onCheckboxClick={handleDoughTypesClick}
          name="doughTypes"
        />
      </FilterSection>
      <FilterSection title="Price">
        <PriceFilter max={100} step={1} className="pl-1" />
      </FilterSection>
      <hr className="my-6" />
      <FilterSection title="Ingredients">
        <CheckboxGroup
          items={ingredients.data}
          loading={ingredients.loading}
          name="ingredients"
          onCheckboxClick={handleIngredientsClick}
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
          onCheckboxClick={handleSizesClick}
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
