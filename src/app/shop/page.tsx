"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/types/types";

export default function Shop() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      const filterMap: { [key: string]: string } = {
        women: "women",
        man: "man",
      };
      const mappedFilter = filterMap[categoryParam];
      if (mappedFilter) {
        setActiveFilter(mappedFilter);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError("");
        const base =
          process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5001";
        const params = new URLSearchParams();
        if (activeFilter !== "all") params.set("gender_like", activeFilter);
        const trimmed = search.trim();
        if (trimmed) params.set("q", trimmed);
        const url = `${base}/products${
          params.toString() ? `?${params.toString()}` : ""
        }`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (e) {
        if ((e as Error).name !== "AbortError") {
          setError((e as Error).message || "Something went wrong");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
    return () => controller.abort();
  }, [activeFilter, search]);

  return (
    <>
      <div className="coza-shop-page bg0 m-t-23 p-b-140">
        <div className="container">
          <div className="flex-w flex-l-m filter-tope-group m-tb-10 p-b-32">
            {["all", "women", "man"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  if (cat === "all") {
                    setSearch("");
                  }
                  setActiveFilter(cat);
                }}
                className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${
                  activeFilter === cat ? "how-active1" : ""
                }`}
              >
                {cat === "all"
                  ? "All Products"
                  : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="coza-shop-search-wrap p-b-52">
            <div className="panel-search p-t-10 p-b-15">
              <div className="bor8 dis-flex p-l-15">
                <button
                  className="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04"
                  type="button"
                  aria-label="Search"
                >
                  <i className="zmdi zmdi-search"></i>
                </button>

                <input
                  className="mtext-107 cl2 size-114 plh2 p-r-15 w-100"
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row isotope-grid">
            {products.map((product) => (
              <div
                key={product.id}
                className={`col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item ${product.gender}`}
              >
                <div className="block2">
                  <div className="block2-pic hov-img0">
                    <img src={product.img} alt={product.title} />

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
                        {product.title}
                      </Link>

                      <span className="stext-105 cl3">{product.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <p className="stext-105 cl3 p-l-15">Loading products...</p>
            )}
            {!isLoading && products.length === 0 && !error && (
              <p className="stext-105 cl3 p-l-15">There are no results.</p>
            )}
            {error && <p className="stext-105 cl3 p-l-15">{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
}
