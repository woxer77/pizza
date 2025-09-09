'use client';

import React from 'react';

import Api from '@/services/api/api-client';
import useFetch from './use-fetch';
import type { FilterItem } from '@/shared/types/common';

interface FilterAsideDataGroup {
  data: FilterItem[];
  loading: boolean;
  error: Error | null;
}

const useFilterAside = () => {
  const {
    data: ingredData,
    loading: ingredLoading,
    error: ingredError
  } = useFetch({ fetchFunc: Api.ingredient.getAll });
  const ingredients: FilterAsideDataGroup = React.useMemo(
    () => ({
      data:
        ingredData?.map((item) => ({
          value: String(item.id),
          text: item.name
        })) || [],
      loading: ingredLoading,
      error: ingredError
    }),
    [ingredData, ingredLoading, ingredError]
  );

  const {
    data: doughTypesData,
    loading: doughLoading,
    error: doughError
  } = useFetch({ fetchFunc: Api.doughType.getAll });
  const doughTypes: FilterAsideDataGroup = React.useMemo(
    () => ({
      data: doughTypesData?.map((item) => ({ value: String(item.id), text: item.name })) || [],
      loading: doughLoading,
      error: doughError
    }),
    [doughTypesData, doughLoading, doughError]
  );

  const { data: sizesData, loading: sizesLoading, error: sizesError } = useFetch({ fetchFunc: Api.size.getAll });
  const sizes: FilterAsideDataGroup = React.useMemo(
    () => ({
      data: sizesData?.map((item) => ({ value: String(item.id), text: item.name })) || [],
      loading: sizesLoading,
      error: sizesError
    }),
    [sizesData, sizesLoading, sizesError]
  );

  const isBtnDisabled = React.useMemo(
    () => ingredLoading || doughLoading || sizesLoading,
    [ingredLoading, doughLoading, sizesLoading]
  );

  return { ingredients, doughTypes, sizes, isBtnDisabled };
};

export default useFilterAside;
