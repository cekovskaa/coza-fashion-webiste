import React from "react";
import Link from "next/link";
import type { Product } from "@/types/types";

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  if (!product || !product.img) {
    return (
      <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item">
        <div className="block2">
          <div className="block2-pic hov-img0">
            <div className="placeholder-image">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item">
      <div className="block2">
        <div className="block2-pic hov-img0">
          <img
            src={product.img}
            alt={product.title || "Product image"}
            onError={(e) => {
              console.error("Image failed to load:", product.img);
            }}
          />

          <Link
            href={`/shop/${product.id}`}
            className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04"
          >
            View Details
          </Link>
        </div>

        <div className="block2-txt flex-w flex-t p-t-14">
          <div className="block2-txt-child1 flex-col-l ">
            <Link
              href={`/shop/${product.id}`}
              className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
            >
              {product.title || "Untitled Product"}
            </Link>

            <span className="stext-105 cl3">
              {product.price || "Price not available"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
