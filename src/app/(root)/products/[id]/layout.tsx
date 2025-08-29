import ProductRecommend from '@/components/elements/product-recommend';

export default function ProductLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-20 pt-10 pb-20">
      {children}
      <ProductRecommend />
    </div>
  );
}
