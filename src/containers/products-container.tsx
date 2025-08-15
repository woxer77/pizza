'use client';

import React from 'react';

import Products from '@/components/elements/products';

import useFetch from '@/hooks/useFetch';
import Api from '@/services/api-client';

const ProductsContainer: React.FC = () => {
  const { data, loading, error } = useFetch({ fetchFunc: Api.category.getAllWithProducts });

  if (error) return <div>Error! {error.message}</div>;
  if (loading || data === null) return <div>Loading...</div>; // TODO: skeleton
  return <Products categories={data} />;
};

export default ProductsContainer;
