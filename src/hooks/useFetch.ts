'use client';

import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useFetch = <T>(fetchFunc: (...args: any[]) => Promise<T>, ...args: any[]) => {
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
