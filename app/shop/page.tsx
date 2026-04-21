"use client";

import { Parser } from "html-to-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Shop() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    }

    loadProducts();
  }, []);

  console.log(products);

  return (
    <div className="grid grid-cols-3 gap-4 p-6 min-h-screen mt-[65px]">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded h-min">
          <div className="flex w-full">
            {product.images.map((img: any) => (
              <div>
                <Image
                  key={img.id}
                  src={img.src}
                  alt={product.name?.pt}
                  width={100}
                  height={100}
                  priority
                />
              </div>
            ))}
          </div>
          <h2 className="font-bold">{product.name?.pt}</h2>
          <p>{Parser().parse(product.description?.pt)}</p>
          <p>R$ {product.variants?.[0]?.price}</p>
        </div>
      ))}
    </div>
  );
}
