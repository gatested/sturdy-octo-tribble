// app/vendor/[tagname]/page.tsx
import VendorClient from './VendorClient';
import { APIURl } from '@/services/APIPath';

// --- Metadata ---
export async function generateMetadata({params}: any) {
  const res = await fetch(`${APIURl}/vendors/bytagname/${params.tagname}`);
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
}

// --- Main Page ---
export default async function Page({params}: any) {
  const res = await fetch(`${APIURl}/vendors/bytagname/${params.tagname}`, {
    cache: 'no-store',
  });
  const data = await res.json();
  const user = data?.[0] || null;

  let products = null;
  if (user) {
    const resp2 = await fetch(
      `${APIURl}/vendors/${user.id}/products`,
      { cache: 'no-store' }
    );
    products = await resp2.json();
  }

  return <VendorClient user={user} products={products} />;
}
