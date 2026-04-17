"use client";

import BlogItem from "@/components/BlogItem";
import PageTitle from "@/components/PageTitle";
import ProductItem from "@/components/ProductItem";
import { Blog, Product } from "@/types/types";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const [blogsResponse, productsResponse] = await Promise.all([
          fetch(`http://localhost:5001/blogs?q=${encodeURIComponent(query)}`),
          fetch(
            `http://localhost:5001/products?q=${encodeURIComponent(query)}`
          ),
        ]);

        if (!blogsResponse.ok) {
          throw new Error(`Failed to fetch blogs: ${blogsResponse.status}`);
        }

        if (!productsResponse.ok) {
          throw new Error(
            `Failed to fetch products: ${productsResponse.status}`
          );
        }

        const blogsData: Blog[] = await blogsResponse.json();
        const productsData: Product[] = await productsResponse.json();

        setBlogs(blogsData);
        setProducts(productsData);
      } catch (err) {
        console.error("Search error:", err);
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while searching"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const renderLoadingSkeleton = (
    type: "blog" | "product",
    count: number = 3
  ) => {
    return Array.from({ length: count }, (_, index) => (
      <div
        key={index}
        className={
          type === "blog" ? "col-4" : "col-sm-6 col-md-4 col-lg-3 p-b-35"
        }
      >
        <div className="animate-pulse">
          <div className="bg-gray-300 h-48 w-full mb-4 rounded"></div>
          <div className="bg-gray-300 h-4 w-3/4 mb-2 rounded"></div>
          <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
        </div>
      </div>
    ));
  };

  const hasBlogs = blogs.length > 0;
  const hasProducts = products.length > 0;
  const showBothSections = hasBlogs && hasProducts;
  const showOnlyBlogs = hasBlogs && !hasProducts;
  const showOnlyProducts = !hasBlogs && hasProducts;

  return (
    <>
      <Head>
        <title>Store - Search</title>
        <meta name="description" content="Search results" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageTitle title="Search" />

      <div className="bg0 m-t-23 p-b-140 mt-5">
        <div className="container">
          {error && (
            <div className="alert alert-danger mb-4">
              <p>Error: {error}</p>
            </div>
          )}

          {!query.trim() ? (
            <div className="text-center p-5">
              <h3>Please enter a search term</h3>
            </div>
          ) : (
            <>
              {showBothSections && (
                <>
                  <div className="mb-5">
                    <h2 className="mb-5">Blogs</h2>
                    <div className="row isotope-grid">
                      {isLoading
                        ? renderLoadingSkeleton("blog")
                        : blogs.map((blog) => (
                            <div key={blog.id} className="col-4">
                              <BlogItem blog={blog} />
                            </div>
                          ))}
                    </div>
                  </div>

                  <div className="mb-5">
                    <h2 className="mb-5">Products</h2>
                    <div className="row isotope-grid">
                      {isLoading
                        ? renderLoadingSkeleton("product", 4)
                        : products.map((product) => (
                            <ProductItem key={product.id} product={product} />
                          ))}
                    </div>
                  </div>
                </>
              )}

              {showOnlyBlogs && (
                <div className="mb-5">
                  <h2 className="mb-5">Blogs</h2>
                  <div className="row isotope-grid">
                    {isLoading
                      ? renderLoadingSkeleton("blog")
                      : blogs.map((blog) => (
                          <div key={blog.id} className="col-4">
                            <BlogItem blog={blog} />
                          </div>
                        ))}
                  </div>
                </div>
              )}

              {showOnlyProducts && (
                <div className="mb-5">
                  <h2 className="mb-5">Products</h2>
                  <div className="row isotope-grid">
                    {isLoading
                      ? renderLoadingSkeleton("product", 4)
                      : products.map((product) => (
                          <ProductItem key={product.id} product={product} />
                        ))}
                  </div>
                </div>
              )}

              {isLoading && !hasBlogs && !hasProducts && (
                <div className="text-center p-5">
                  <p>Searching...</p>
                </div>
              )}

              {!isLoading && !hasBlogs && !hasProducts && (
                <div className="text-center p-5">
                  <p>No results for "{query}"</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
