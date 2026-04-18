"use client";

import PageTitle from "@/components/PageTitle";
import RelatedBlogs from "@/components/RelatedBlogs";
import React, { useEffect, useState } from "react";
import type { Blog } from "@/types/types";
import { useParams } from "next/navigation";

export default function BlogDetail() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params?.id[0] : (params?.id as string);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    const fetchBlog = async () => {
      try {
        setIsLoading(true);
        setError("");
        const base =
          process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5001";
        const res = await fetch(`${base}/blogs/${id}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Failed to fetch blog: ${res.status}`);
        const data: Blog = await res.json();
        setBlog(data);
      } catch (e) {
        if ((e as Error).name !== "AbortError") {
          setError((e as Error).message || "Something went wrong");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
    return () => controller.abort();
  }, [id]);

  return (
    <>
      <PageTitle title={blog?.title || "Blog"} />

      <section className="coza-blog-detail bg0 p-t-52 p-b-20">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-9 p-b-80">
              <div className="p-r-45 p-r-0-lg">
                {isLoading && <p className="stext-105 cl3">Loading...</p>}
                {error && <p className="stext-105 cl3">{error}</p>}
                {!isLoading && !error && blog && (
                  <>
                    <div className="wrap-pic-w how-pos5-parent">
                      <img src={blog.img} alt={blog.title} />
                    </div>

                    <div className="p-t-32">
                      <span className="flex-w align-items-center flex-m stext-111 cl2 p-b-19">
                        <span className="flex-c-m mr-3 bor7 p-lr-15 trans-04">
                          {blog.category}
                        </span>

                        <span>
                          <span className="cl4">By</span> {blog.author}
                          <span className="cl12 m-l-4 m-r-6">|</span>
                        </span>

                        <span>{blog.date}</span>
                      </span>

                      <h4 className="ltext-109 cl2 p-b-28">{blog.title}</h4>

                      <p className="stext-117 cl6 p-b-26">
                        {blog.first_content}
                      </p>

                      <p className="stext-117 cl6 p-b-26">
                        {blog.second_content}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="col-md-4 col-lg-3 p-b-80">
              <div className="side-menu">
                <RelatedBlogs />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
