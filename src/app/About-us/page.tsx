"use client";
import React from "react";
import  Link  from 'next/link'

function AboutUs() {
  return (
    <div className="AboutUsPage">
      <h1>Sobre Nosotros</h1>
      <h2>¿Quiénes somos?</h2>
      <p>
        Somos una empresa que se dedica a la venta de productos médicos basados en
        plantas y elementos de origen natural.
      </p>
      <h2>¿Dónde nos encuentras?</h2>
      <p>
        Nuestra empresa es de origen poblano, Aunque por ahora no existen tiendas físicas donde
        puedas adquirir nustros productos, por el momento puedes contactarnos por nuestro correo

      </p>
      <h3>aurilia@aurilia.com</h3>
      <Link href={'/Shop/Aurilia'}>Tienda Oficial</Link>
    </div> 
  )
}

export default AboutUs;