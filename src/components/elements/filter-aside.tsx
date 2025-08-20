'use client';

import React from 'react';

import CheckboxGroup from '@/ui/checkbox-group';
import { Button } from '@/ui/button';
import PriceFilter from '@/ui/price-filter';
import FilterSection from '@/elements/filter-section';

import type { ClassProps, PriceRange } from '@/types/common';
import { cn } from '@/helpers/utils';
import useFilterAside from '@/hooks/useFilterAside';
import useSet from '@/hooks/useSet';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'qs';

const MAX_PRICE = 100;

const FilterAside: React.FC<ClassProps> = ({ className }) => {
  const router = useRouter();
  const params = useSearchParams();

  const { ingredients, doughTypes, sizes, isBtnDisabled } = useFilterAside();

  const getParamSet = (category: string) => {
    return new Set<string>(params.has(category) ? params.get(category)?.split(',') : []);
  };

  const defaultSetParams = {
    ingredients: getParamSet('ingredients'),
    doughTypes: getParamSet('doughTypes'),
    sizes: getParamSet('sizes')
  };

  const ingredientSet = useSet<string>(defaultSetParams.ingredients);
  const doughTypeSet = useSet<string>(defaultSetParams.doughTypes);
  const sizeSet = useSet<string>(defaultSetParams.sizes);

  const defaultPriceRange = {
    from: Number(params.get('priceFrom')) || 0,
    to: Number(params.get('priceTo')) || MAX_PRICE
  };
  const [priceRange, setPriceRange] = React.useState<PriceRange<number>>(defaultPriceRange);

  React.useEffect(() => {
    const filters = {
      priceFrom: priceRange.from,
      priceTo: priceRange.to,
      ingredients: Array.from(ingredientSet.values),
      doughTypes: Array.from(doughTypeSet.values),
      sizes: Array.from(sizeSet.values)
    };

    const query = qs.stringify(filters, {
      arrayFormat: 'comma'
    });
    router.push(`?${query}`, {
      scroll: false
    });
  }, [ingredientSet, doughTypeSet, sizeSet, priceRange, router]);

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
          skeletonAmount={2}
          checkedValues={doughTypeSet.values}
          onCheckboxClick={doughTypeSet.toggle}
          name="doughTypes"
        />
      </FilterSection>
      <hr className="my-6" />
      <FilterSection title="Price">
        <PriceFilter
          max={MAX_PRICE}
          step={1}
          onChange={setPriceRange}
          defaultValue={defaultPriceRange}
          className="pl-1"
        />
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
          skeletonAmount={4}
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
