// app/product/[id]/page.tsx

import { APIURl } from '@/services/APIPath';
import ProductDedicatedPage from './ProductClient';
export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const res = await fetch(`${APIURl}/products/product/${params.id}`, {
      // No-cache por si los metadatos cambian frecuentemente
      next: { revalidate: 60 } 
    });

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
  } catch (error) {
    console.error('Error en generateMetadata:', error);
    return { title: 'Product Error' };
  }
}

export default function Page({ params }: { params: { id: string } }) {
  // No se pasa productInicial: lo carga el cliente
  return <ProductDedicatedPage id={params.id} />;
}
