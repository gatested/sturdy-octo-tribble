"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useWindowSize } from "@/hooks/useWindowSize";
import { FaHome, FaBoxOpen, FaQuestionCircle, FaInfoCircle } from 'react-icons/fa';
import "@/styles/Topbar.css";

// Variantes para el contenedor (solo opacidad)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  exit: { opacity: 0 }
};

// Variantes para los items hijos
const itemVariants = {
  hidden: { y: -20, opacity: 0, filter: 'blur(10px)' },
  visible: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 300, damping: 24 } },
  exit: { y: -20, opacity: 0, filter: 'blur(10px)' }
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { width } = useWindowSize();
  const isMobile = width <= 900;

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  // Cierra menú al navegar
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Desmonta menú si pasa a pantalla grande
  useEffect(() => {
    if (!isMobile) {
      setMenuOpen(false);
    }
  }, [isMobile]);

  return (
    <>
      <div className={`TopBar ${menuOpen ? "Tactive" : ""}`}>
        <Link href="/">
          <div className="TopbarLogo" />
        </Link>

        {isMobile && (
          <button className="TopbarMenuButton" onClick={toggleMenu}>
            {menuOpen ? "✕" : "☰"}
          </button>
        )}

        {!isMobile && (
          <ul className="TopbarDirections">
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/Shop/Aurilia">Productos</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/About-us">Sobre nosotros</Link></li>
          </ul>
        )}
      </div>

      {/* Menú móvil animado */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            className="MobileMenu"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.ul>
              <motion.li variants={itemVariants}>
                <Link href="/">
                    <FaHome className="MobileIcon" />
                    Inicio
                </Link>
              </motion.li>

              <motion.li variants={itemVariants}>
                <Link href="/Shop/Aurilia">

                    <FaBoxOpen className="MobileIcon" />
                    Productos

                </Link>
              </motion.li>

              <motion.li variants={itemVariants}>
                <Link href="/faq">
                    <FaQuestionCircle className="MobileIcon" />
                    FAQ
                </Link>
              </motion.li>

              <motion.li variants={itemVariants}>
                <Link href="/About-us">

                    <FaInfoCircle className="MobileIcon" />
                    Sobre nosotros

                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
