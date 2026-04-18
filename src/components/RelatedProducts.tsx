"use client";

import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import type { Product } from "@/types/types";

interface RelatedProductsProps {
  currentProductId: string;
  currentProductGender?: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentProductId,
  currentProductGender,
}) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const res = await fetch("http://localhost:5001/products");
        const allProducts: Product[] = await res.json();

        let filtered = allProducts.filter((p) => p.id !== currentProductId);

        if (currentProductGender) {
          filtered = filtered.filter(
            (p) => p.gender.toLowerCase() === currentProductGender.toLowerCase()
          );
        }

        const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, 4);

        setRelatedProducts(shuffled);
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      }
    };

    fetchRelatedProducts();
  }, [currentProductId, currentProductGender]);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="sec-relate-product coza-related-products bg0 p-t-45 p-b-105">
      <div className="container">
        <div className="p-b-45">
          <h3 className="ltext-106 cl5 txt-center">Related Products</h3>
        </div>

        <div className="wrap-slick2">
          <div className="d-flex flex-wrap">
            {relatedProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
