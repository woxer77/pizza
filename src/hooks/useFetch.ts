'use client';

import React from 'react';
/* eslint-disable */
interface UseFetchProps<T> {
  fetchFunc: (...args: any[]) => Promise<T>;
  args?: any[];
}

const useFetch = <T>({ fetchFunc, args = [] }: UseFetchProps<T>) => {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    setLoading(true);
    fetchFunc(...args)
      .then(setData)
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, [fetchFunc, ...args]);

  return { data, loading, error };
};

export default useFetch;
