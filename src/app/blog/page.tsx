"use client";

import React, { useEffect, useState } from "react";
import BlogItem from "../../components/BlogItem";
import PageTitle from "../../components/PageTitle";
import type { Blog } from "@/types/types";

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const categories: { label: string; value: string }[] = [
    { label: "Fashion", value: "fashion" },
    { label: "Beauty", value: "beauty" },
    { label: "Street Style", value: "streetstyle" },
    { label: "Life Style", value: "lifestyle" },
    { label: "DIY & Crafts", value: "diy" },
  ];

  useEffect(() => {
    const controller = new AbortController();
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        setError("");
        const base =
          process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5001";
        const params = new URLSearchParams();
        if (activeCategory !== "all")
          params.set("category_like", activeCategory);
        const trimmed = search.trim();
        if (trimmed) params.set("q", trimmed);
        const url = `${base}/blogs${
          params.toString() ? `?${params.toString()}` : ""
        }`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`);
        const data: Blog[] = await res.json();
        setBlogs(data);
      } catch (e) {
        if ((e as Error).name !== "AbortError") {
          setError((e as Error).message || "Something went wrong");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
    return () => controller.abort();
  }, [activeCategory, search]);

  return (
    <>
      <PageTitle title="Blog" />

      <section className="bg0 p-t-62 p-b-60">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-9 p-b-80 order-2 order-md-1">
              <div className="p-r-45 p-r-0-lg">
                {blogs.map((blog) => (
                  <div key={blog.id} className="m-b-50">
                    <BlogItem blog={blog} />
                  </div>
                ))}

                {isLoading && <p className="stext-105 cl3">Loading blogs...</p>}
                {!isLoading && blogs.length === 0 && !error && (
                  <p className="stext-105 cl3">There are no results.</p>
                )}
                {error && <p className="stext-105 cl3">{error}</p>}
              </div>
            </div>

            <div className="col-md-4 col-lg-3 p-b-80 order-1 order-md-2">
              <div className="side-menu">
                <form
                  className="bor17 of-hidden pos-relative"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    className="stext-103 cl2 plh4 size-116 p-l-28 p-r-55"
                    type="text"
                    name="search"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  <button
                    type="button"
                    aria-label="Search"
                    className="flex-c-m size-122 ab-t-r fs-18 cl4 hov-cl1 trans-04"
                  >
                    <i className="zmdi zmdi-search"></i>
                  </button>
                </form>

                <div className="p-t-55">
                  <h4 className="mtext-112 cl2 p-b-33">Categories</h4>

                  <ul>
                    <li className="bor18">
                      <button
                        className={`dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4 ${
                          activeCategory === "all" ? "how-active1" : ""
                        }`}
                        onClick={() => setActiveCategory("all")}
                      >
                        All
                      </button>
                    </li>
                    {categories.map((c) => (
                      <li key={c.value} className="bor18">
                        <button
                          className={`dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4 ${
                            activeCategory === c.value ? "how-active1" : ""
                          }`}
                          onClick={() => setActiveCategory(c.value)}
                          aria-pressed={activeCategory === c.value}
                        >
                          {c.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
