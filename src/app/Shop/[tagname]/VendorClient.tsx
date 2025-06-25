'use client';

import React, { useEffect, useState } from 'react';
import '@/styles/Profile.css';
import Skeleton from 'react-loading-skeleton';
import Product from '@/components/product';
import { motion, AnimatePresence } from 'framer-motion';

export default function VendorClient({ user, products }: { user: any, products: any[] | null }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setLoading(false);
  }, [user]);

  return (
    <div className="ProfileContainer">
      <motion.div
        className="ProfileCover"
        style={{ backgroundImage: user ? `url(${user.img_cover})` : 'none' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: user ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      />

      <div className="ProfileOther">
        <div className="ProfileInfo">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="skeleton-logo" className="ProfileLogo">
                <Skeleton className="ProfileLogo" />
              </motion.div>
            ) : (
              <motion.div
                key="user-logo"
                className="ProfileLogo PLColor"
                style={{ backgroundImage: user ? `url(${user.img_photo})` : 'none' }}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.6 }}
              />
            )}
          </AnimatePresence>

          <div className="ProfileColumn">
            <AnimatePresence mode="wait">
              {loading || !user ? (
                <motion.div key="skeleton-info" className="SkeletonTitles">
                  <Skeleton width="50%" height={40} />
                  <Skeleton width={100} height={15} />
                  <Skeleton width="100%" height={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="user-info"
                  initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
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
          {user && products?.length ? (
            <motion.div
              initial={{ height: 0, opacity: 0, y: 50, filter: 'blur(10px)' }}
              animate={{ height: 'auto', opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ type: 'spring', stiffness: 150, damping: 17, delay: 0.6 }}
            >
              <h2>Products</h2>
              <div className="ProductList">
                {products.map((prod, i) => (
                  <Product ProductElement={prod} styles={{ marginLeft: i > 0 ? '10px' : 0 }} key={prod.id || i} />
                ))}
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
