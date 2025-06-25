'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Product from '@/components/product';
import ProductSkeleton from '@/components/productSkeleton';
import { motion } from 'framer-motion';
import '@/styles/globals.css';

type Producto = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

const Slogan = '"Lo natural en cada producto"';

const palabraVariant = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
};

const SloganP = () => (
  <motion.p
    initial="hidden"
    animate="visible"
    style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}
  >
    {Slogan.split(" ").map((palabra, i) => (
      <motion.span
        key={i}
        variants={palabraVariant}
        transition={{ duration: 0.8, delay: i * 0.15 + 0.2 }}
        style={{ display: 'inline-block', whiteSpace: 'pre' }}
      >
        {palabra}
      </motion.span>
    ))}
  </motion.p>
);

interface HomeClientProps {
  productos: Producto[];
}

export default function HomeClient({ productos }: HomeClientProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setIsLoading(false);
  }, []);

  return (
    <div className="Home">
      <div className="Welcome">
        <motion.div
          variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.8 }}
          initial="hidden"
          animate="visible"
          className="HomeLogo"
        />
        <motion.h1
          variants={{ hidden: { opacity: 0, y: 50, filter: 'blur(6px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
          transition={{ duration: 0.8, delay: 0.1 }}
          initial="hidden"
          animate="visible"
        >
          Aurilia
        </motion.h1>
        <SloganP />
      </div>

      <div className="ProductsContainer">
        {isLoading ? (
          <ProductSkeleton />
        ) : (
          productos.map((producto, i) => (
            <motion.div
              key={producto.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={palabraVariant}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              <Product ProductElement={producto} styles={{ marginLeft: i > 0 ? '10px' : 0 }} />
            </motion.div>
          ))
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {!isLoading && (
          <motion.button
            initial="hidden"
            whileInView="visible"
            whileHover={{ scale: 1.06, transition: { duration: 0.2, ease: "easeInOut" } }}
            viewport={{ once: true }}
            variants={palabraVariant}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mainButton"
            onClick={() => router.push("/Shop/Aurilia")}
          >
            Ver Todos Los Productos
          </motion.button>
        )}
      </div>
    </div>
  );
}
