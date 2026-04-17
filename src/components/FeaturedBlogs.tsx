"use client";

import React, { useEffect, useState } from "react";
import { Blog } from "@/types/types";
import BlogItem from "@/components/BlogItem";
import Link from "next/link";

const FeaturedBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch("http://localhost:5001/blogs/?_limit=3");
      const data: Blog[] = await res.json();
      setBlogs(data);
    };

    fetchBlogs();
  }, []);

  return (
    <section className="sec-blog bg0 p-t-60 p-b-90">
      <div className="container">
        <div className="p-b-66">
          <h3 className="ltext-105 cl5 txt-center respon1">Our Blogs</h3>
        </div>

        <div className="row">
          {blogs.map((blog) => (
            <div key={blog.id} className="col-sm-6 col-md-4 p-b-40">
              <Link href={`/blog/${blog.id}`}>
                <BlogItem blog={blog} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
