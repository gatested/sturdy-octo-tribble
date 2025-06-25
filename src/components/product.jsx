"use client"; // Necesario para usar useRouter

import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "@/styles/Product.css";

export default function Product({ ProductElement, styles }) {
  const router = useRouter();

  return (
    <button
      className="Product"
      onClick={() => router.push("/Product/" + ProductElement.id)}
      style={styles}
    >
      <div
        className="cover"
        style={{ backgroundImage: "url(" + ProductElement.image_url + ")" }}
      />
      <h3>{ProductElement.name}</h3>
      <p>{ProductElement.description}</p>
    </button>
  );
}
