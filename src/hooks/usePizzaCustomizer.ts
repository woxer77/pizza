import React from 'react';

import { DOUGH_TYPES } from '@/constants/dough-type.constants';
import { SIZES } from '@/constants/size.constants';

import type { PizzaCustomizerProps } from '@/components/elements/pizza-customizer';
import type { SegmentItem } from '@/shared/types/common';
import type { DoughTypeValues } from '@/shared/types/dough-type.interface';
import type { SizeValues } from '@/shared/types/size.interface';
import { calculatePrice } from '@/helpers/utils';

interface AvailableOptions {
  sizes: Partial<Record<SizeValues, DoughTypeValues[]>> & { ids: SizeValues[] };
  doughTypes: Partial<Record<DoughTypeValues, SizeValues[]>> & { ids: DoughTypeValues[] };
}

const usePizzaCustomizer = ({ product, sizes, doughTypes }: Omit<PizzaCustomizerProps, 'className'>) => {
  const availableOptions = product.variations.reduce(
    (acc: AvailableOptions, variation) => {
      const sizeId = variation.size?.id as SizeValues;
      const doughTypeId = variation.doughType?.id as DoughTypeValues;

      if (sizeId !== undefined && !isNaN(sizeId)) {
        if (!acc.sizes[sizeId]) {
          acc.sizes[sizeId] = [];
          acc.sizes.ids.push(sizeId);
        }

        if (doughTypeId !== undefined && !acc.sizes[sizeId].includes(doughTypeId)) {
          acc.sizes[sizeId] = [...acc.sizes[sizeId], doughTypeId];
        }
      }

      if (doughTypeId !== undefined && !isNaN(doughTypeId)) {
        if (!acc.doughTypes[doughTypeId]) {
          acc.doughTypes[doughTypeId] = [];
          acc.doughTypes.ids.push(doughTypeId);
        }

        if (sizeId !== undefined && !acc.doughTypes[doughTypeId].includes(sizeId)) {
          acc.doughTypes[doughTypeId] = [...acc.doughTypes[doughTypeId], sizeId];
        }
      }
      return acc;
    },
    { sizes: { ids: [] }, doughTypes: { ids: [] } }
  );

  const defaultActiveSize = availableOptions.sizes.ids.includes(SIZES.LARGE)
    ? SIZES.LARGE
    : (availableOptions.sizes.ids.at(-1) ?? SIZES.SMALL);

  const [activeSize, setActiveSize] = React.useState<SizeValues>(defaultActiveSize);
  const [activeDoughType, setActiveDoughType] = React.useState<DoughTypeValues>(DOUGH_TYPES.TRADITIONAL);
  const [ingredients, setIngredients] = React.useState<number[]>([]);

  const sizeSegments: SegmentItem<number>[] = sizes.map((size) => ({
    value: size.id,
    name: size.name,
    disabled: !availableOptions.sizes[size.id as SizeValues]?.length
  }));

  const doughSegments: SegmentItem<number>[] = doughTypes.map((dough) => ({
    value: dough.id,
    name: dough.name,
    disabled: !availableOptions.sizes[activeSize]?.includes(dough.id as DoughTypeValues)
  }));

  const totalPrice = React.useMemo(
    () =>
      calculatePrice({
        product,
        sizeId: activeSize,
        sizes,
        doughTypeId: activeDoughType,
        doughTypes,
        ingredientIds: ingredients
      }),
    [product, activeSize, sizes, activeDoughType, doughTypes, ingredients]
  );

  const ingredientClick = (id: number) => {
    setIngredients((prev) => (!prev.includes(id) ? [...prev, id] : prev.filter((item) => item !== id)));
  };

  React.useEffect(() => {
    const availableDoughTypes = availableOptions.sizes[activeSize];
    if (availableDoughTypes && !availableDoughTypes.includes(activeDoughType)) {
      switch (activeDoughType) {
        case DOUGH_TYPES.TRADITIONAL:
          setActiveDoughType(DOUGH_TYPES.THIN);
          break;
        case DOUGH_TYPES.THIN:
          setActiveDoughType(DOUGH_TYPES.TRADITIONAL);
          break;
        default:
          const _exhaustiveCheck: never = activeDoughType;
          throw new Error(`Unexpected dough type: ${_exhaustiveCheck}`);
      }
    }
  }, [activeSize, availableOptions.sizes, activeDoughType]);

  return {
    sizeSegments,
    doughSegments,
    activeSize,
    setActiveSize,
    activeDoughType,
    setActiveDoughType,
    ingredients,
    ingredientClick,
    totalPrice
  };
};

export default usePizzaCustomizer;
