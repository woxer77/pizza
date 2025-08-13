'use client';

import React from 'react';

import Categories from '@/components/elements/categories';

import useFetch from '@/hooks/useFetch';
import Api from '@/services/api-client';

const CategoryContainer: React.FC = () => {
  const { data, loading, error } = useFetch(Api.category.getAll);

  if (error) return <div>Error! {error.message}</div>;
  if (loading || data === null) return <div>Loading...</div>; // TODO: skeleton
  return <Categories categories={data} />;
};

export default CategoryContainer;
