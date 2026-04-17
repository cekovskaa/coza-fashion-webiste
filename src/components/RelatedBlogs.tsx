"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import type { Blog } from "@/types/types";

const RelatedBlogs: React.FC = () => {
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();
    const fetchRelatedBlogs = async () => {
      try {
        setIsLoading(true);
        setError("");
        const base =
          process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5001";

        const randomStart = Math.floor(Math.random() * 10);
        const url = `${base}/blogs?_start=${randomStart}&_limit=3`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok)
          throw new Error(`Failed to fetch related blogs: ${res.status}`);
        const data: Blog[] = await res.json();
        setRelatedBlogs(data);
      } catch (e) {
        if ((e as Error).name !== "AbortError") {
          setError((e as Error).message || "Something went wrong");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchRelatedBlogs();
    return () => controller.abort();
  }, []);

  return (
    <div>
      <h4 className="mtext-112 cl2 mb-3">Related Blogs</h4>

      {isLoading && <p className="stext-105 cl3">Loading...</p>}
      {error && <p className="stext-105 cl3">{error}</p>}

      <ul>
        {relatedBlogs.map((blog) => (
          <li key={blog.id} className="mb-4">
            <Link href={`/blog/${blog.id}`} className="wrao-pic-w">
              <img src={blog.img} alt={blog.title} className="img-fluid" />

              <div className="p-t-8 mt-1">
                <div className="stext-116 cl8 hov-cl1 trans-04 mb-3">
                  {blog.title}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedBlogs;
