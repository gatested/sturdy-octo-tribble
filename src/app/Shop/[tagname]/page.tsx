// app/Shop/[tagname]/page.tsx
import dynamic from 'next/dynamic';
import { APIURl } from '@/services/APIPath';
import VendorClient from './VendorClient';

// 1. Mantén los metadatos en el servidor (esto está bien)
export async function generateMetadata({ params }: any) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500); // 2.5s de timeout

    const res = await fetch(`${APIURl}/vendors/bytagname/${params.tagname}`, {
      signal: controller.signal,
      cache: 'no-store',
    });

    clearTimeout(timeout);

    const data = await res.json();
    const user = data?.[0];

    if (!user) {
      return { title: 'Vendor Not Found' };
    }

    return {
      title: `${user.display_name} - Shop`,
      description: user.description?.slice(0, 160),
      openGraph: {
        title: user.display_name,
        description: user.description,
        images: [user.img_cover || user.img_photo],
      },
    };
  } catch (error) {
    console.warn('Fallo al generar metadata, usando fallback.', error);
    return {
      title: 'Unknow - Shop',
      description: 'Explora nuestra tienda',
    };
  }
}


export default function Page({ params }: any) {
  return <VendorClient tagname={params.tagname} />;
}