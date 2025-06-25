// app/product/[id]/page.tsx
import ProductDedicatedPage from './ProductClient'; // Este será tu componente con "use client"
import { APIURl } from '@/services/APIPath';
export async function generateMetadata({ params }: any) {
  const res = await fetch(`${APIURl}/products/product/${params.id}`);
  const data = await res.json();
  const product = data?.[0];

  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name} - ${product.vendor_info?.display_name ?? ''}`,
    description: product.description?.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image_url],
    },
  };
}

export default async function Page({ params }: any) {
  const res = await fetch(`${APIURl}/products/product/${params.id}`, {
    cache: 'no-store',
  });
  const data = await res.json();
  const product = data?.[0];

  return <ProductDedicatedPage product={product} />;
}
