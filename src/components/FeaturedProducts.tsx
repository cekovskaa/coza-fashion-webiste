"use client";

import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import type { Product } from "@/types/types";

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5001/products/?_limit=4");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: Product[] = await res.json();
        console.log("Fetched products:", data);

        const validProducts = data.filter(
          (product) => product && product.id && product.img && product.title
        );

        if (validProducts.length !== data.length) {
          console.warn("Some products are missing required fields");
        }

        setProducts(validProducts);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="sec-product bg0 p-t-100 p-b-50">
        <div className="container">
          <div className="p-b-32">
            <h3 className="ltext-105 cl5 txt-center respon1">
              Loading Products...
            </h3>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="sec-product bg0 p-t-100 p-b-50">
        <div className="container">
          <div className="p-b-32">
            <h3 className="ltext-105 cl5 txt-center respon1">Error: {error}</h3>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="sec-product bg0 p-t-100 p-b-50">
      <div className="container">
        <div className="p-b-32">
          <h3 className="ltext-105 cl5 txt-center respon1">Store Overview</h3>
        </div>

        <div className="tab01">
          <div className="tab-content p-t-50">
            <div
              className="tab-pane fade show active"
              id="best-seller"
              role="tabpanel"
            >
              <div className="wrap-slick2">
                <div className="row">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <ProductItem key={product.id} product={product} />
                    ))
                  ) : (
                    <div className="col-12">
                      <p className="txt-center">No products available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
