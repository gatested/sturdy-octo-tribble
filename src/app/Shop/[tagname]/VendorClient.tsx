'use client';

import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import '@/styles/Profile.css';
import Product from '@/components/product';
import { APIURl } from '@/services/APIPath';

interface VendorClientProps {
  tagname: string;
}

interface User {
  id: number;
  display_name: string;
  username: string;
  img_cover: string;
  img_photo: string;
  description: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  isPrincipal?: boolean;
  // otros campos si es necesario
}

export default function VendorClient({ tagname }: VendorClientProps) {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    const fetchAll = async () => {
      try {
        const userRes = await fetch(`${APIURl}/vendors/bytagname/${tagname}`);
        const userData = await userRes.json();
        const fetchedUser = userData?.[0] || null;
        setUser(fetchedUser);

        if (fetchedUser?.id) {
          const productRes = await fetch(`${APIURl}/vendors/${fetchedUser.id}/products`);
          const productData = await productRes.json();
          setProducts(productData || []);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error('Error cargando datos desde cliente:', err);
        setUser(null);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [tagname]);

  return (
    <div className="ProfileContainer">
      <motion.div
        className="ProfileCover"
        style={{
          backgroundImage: user && !loading ? `url(${user.img_cover})` : 'none',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8 }}
      />
      <div className="ProfileOther">
        <div className="ProfileInfo">
          <AnimatePresence mode="wait">
            {loading || !user ? (
              <motion.div
                key="skeleton-logo"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="ProfileLogo"
              >
                <Skeleton className="ProfileLogo" />
              </motion.div>
            ) : (
              <motion.div
                key="user-logo"
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="ProfileLogo PLColor"
                style={{
                  backgroundImage: `url(${user?.img_photo})`,
                }}
              />
            )}
          </AnimatePresence>

          <div className="ProfileColumn">
            <AnimatePresence mode="wait">
              {loading || !user ? (
                <motion.div
                  key="skeleton-info"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="SkeletonTitles"
                >
                  <Skeleton width="50%" height={40} />
                  <Skeleton width={100} height={15} />
                  <Skeleton width="100%" height={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="user-info"
                  initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1>{user.display_name}</h1>
                  <p style={{ color: 'var(--secondary-text-color)' }}>@{user.username}</p>
                  <p>{user.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="ProfileProducts">
          {!loading && products?.length ? (
            <motion.div
              initial={{ height: 0, opacity: 0, y: 50, filter: 'blur(10px)' }}
              animate={{ height: 'auto', opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ type: 'spring', stiffness: 150, damping: 17, delay: 0.6 }}
            >
              <h2>Products</h2>
              <div className="ProductList">
                {products.map((producto, i) => (
                  <Product
                    ProductElement={producto}
                    styles={{ marginLeft: i > 0 ? '10px' : 0 }}
                    key={producto.id || i}
                  />
                ))}
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
