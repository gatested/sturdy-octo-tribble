'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import '@/styles/PDP.css';
import { APIURl } from '@/services/APIPath';

const blurvalue = '10px';

export default function ProductDedicatedPage({ id }: any) {
  const [product, setProduct] = useState<any>(null);
  const [parsedFeatures, setParsedFeatures] = useState<any[]>([]);
  const [marketServiceLoaded, setMarketServiceLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
        window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // o 'auto'
    });
    }, [id]);
  useEffect(() => {
    fetch(`${APIURl}/products/product/${id}`)
      .then((res) => res.json())
      .then(data => {
        console.log(data)
            if (data && data.length > 0) {
                setProduct(data[0]);
                setLoading(false);
              } else {
                console.warn("Producto no encontrado o respuesta vacía.");
                setProduct({}); // o {} si prefieres
              }
          })
      .catch((err) => console.error('Error cargando producto en cliente:', err))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!product?.features) return;

    try {
      if (typeof product.features === 'string') {
        const temp = JSON.parse(product.features);
        if (Array.isArray(temp)) setParsedFeatures(temp);
      } else if (Array.isArray(product.features)) {
        setParsedFeatures(product.features);
      }
    } catch (error) {
      console.warn('Error al parsear features:', error);
      setParsedFeatures([]);
    }
  }, [product]);

  useEffect(() => {
    document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const isLoading = loading || !product || Object.keys(product).length === 0;

  return (
    <div className="ProductDedicatedPage">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div key="cover-skeleton" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, delay: 0.3 }} style={{ width: '100%' }}>
            <Skeleton className="Cover" />
          </motion.div>
        ) : (
          <motion.div key="cover-loaded" className="Cover Coverloaded" style={{ backgroundImage: `url(${product.cover_url})` }} initial={{ opacity: 0, y: 20, filter: `blur(${blurvalue})` }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 20, duration: 0.8 }} />
        )}
      </AnimatePresence>

      <div className="ProductInfo">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div key="product-skeletons" className="SkeletonGroup">
              <Skeleton className="Image" />
              <Skeleton className="Texts" width="100%" height={40} />
              <Skeleton className="Texts" width="50%" height={13} />
              <Skeleton className="Texts" width="50%" height={20} />
              <Skeleton className="Texts" width="100%" height={220} />
            </motion.div>
          ) : (
            <>
              <motion.div key="image-loaded" className="Image loaded" style={{ backgroundImage: `url(${product.image_url})`, marginBottom: '21px' }} initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} />

              <motion.div key="product-content" className="ProductInfo" initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
                <h1>{product.name}</h1>

                <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                  <Link href={`/Shop/${product.vendor_info?.username}`}>
                    {product.vendor_info?.display_name}
                  </Link>
                </p>

                <h2>Price</h2>
                <div className="productMarket">
                  <p>
                    ${new Intl.NumberFormat('en-US').format(product.price)}{' '}
                    {marketServiceLoaded ? null : '(Waiting for MarketHandlerAsyncService)'}
                  </p>
                  {marketServiceLoaded ? (
                    <button>Buy</button>
                  ) : (
                    <Skeleton className="buttonSkeleton" width={150} height={35} />
                  )}
                </div>

                <h2>Description</h2>
                <p>{product.description}</p>

                {parsedFeatures.length > 0 ? (
                  parsedFeatures.map((feature, index) => (
                    <div key={index}>
                      <h2 style={{ marginTop: '20px' }}>{feature.title}</h2>
                      <div className="espec">
                        <ul style={{ marginLeft: '15px' }}>
                          {feature.elements.map((item: any, idx: number) => (
                            <li key={idx}>
                              <strong>{item.titulo}</strong>: {item.descripcion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))
                ) : (
                  <strong>No hay especificaciones disponibles</strong>
                )}

                <h2>Comments</h2>
                <Skeleton width={'100%'} height={35} count={5} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
