// app/page.tsx
import HomeClient from './HomeClient';
import { APIURl } from '@/services/APIPath';

export async function generateMetadata() {
  const res = await fetch(`${APIURl}/products/products/isprincipal`);
  const productos = await res.json();

  return {
    title: 'Home',
    description: `"Lo natural en cada producto" – Explora nuestros productos principales en Aurilia.`,
    openGraph: {
      title: 'Home',
      description: 'Lo natural en cada producto',
      images: productos?.[0]?.imageUrl ? [productos[0].imageUrl] : [],
    },
  };
}

export default async function Page() {
  const res = await fetch(`${APIURl}/products/products/isprincipal`, { cache: 'no-store' });
  const productos = await res.json();

  return <HomeClient productos={productos} />;
}
