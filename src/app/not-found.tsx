import Link from "next/link"

export default function notFound() {
    return (
        <div style={{ marginTop: "100px", textAlign: "center" }}>
      <h1>404</h1>
      <h2>¡Lo sentimos!</h2>
      <p>La página que buscas no existe</p>
      <Link href="/">Volver a la página principal</Link>
    </div>
    )
};