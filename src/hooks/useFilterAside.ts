'use client';

import Api from '@/services/api-client';
import useFetch from './useFetch';
import type { FilterItem } from '@/shared/types/common';

interface FilterAsideDataGroup {
  data: FilterItem[];
  loading: boolean;
  error: Error | null;
}

const useFilterAside = () => {
  const {
    data: ingredientsData,
    loading: ingredLoading,
    error: ingredError
  } = useFetch({ fetchFunc: Api.ingredient.getAll });
  const ingredients: FilterAsideDataGroup = {
    data:
      ingredientsData?.map((item) => ({
        value: String(item.id),
        text: item.name
      })) || [],
    loading: ingredLoading,
    error: ingredError
  };

  const {
    data: doughTypesData,
    loading: doughLoading,
    error: doughError
  } = useFetch({ fetchFunc: Api.doughType.getAll });
  const doughTypes: FilterAsideDataGroup = {
    data: doughTypesData?.map((item) => ({ value: String(item.id), text: item.name })) || [],
    loading: doughLoading,
    error: doughError
  };

  const { data: sizesData, loading: sizesLoading, error: sizesError } = useFetch({ fetchFunc: Api.sizes.getAll });
  const sizes: FilterAsideDataGroup = {
    data: sizesData?.map((item) => ({ value: String(item.id), text: item.name })) || [],
    loading: sizesLoading,
    error: sizesError
  };

  const isBtnDisabled = ingredLoading || doughLoading || sizesLoading;

  return { ingredients, doughTypes, sizes, isBtnDisabled };
};

export default useFilterAside;
