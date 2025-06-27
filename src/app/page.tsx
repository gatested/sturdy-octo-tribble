// app/page.tsx
import HomeClient from './HomeClient';
import { APIURl } from '@/services/APIPath';

export async function generateMetadata() {
  try {
    const res = await fetch(`${APIURl}/products/products/isprincipal`, {
      // Previene caché, opcional
      cache: 'no-store',
      // Establece un timeout máximo en algunos entornos
      next: { revalidate: 0 }
    });

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
  } catch (error) {
    console.error('Error al generar metadata:', error);

    return {
      title: 'Aurilia',
      description: `"Lo natural en cada producto"`,
    };
  }
}


export default function Page() {
  return <HomeClient/>;
}

