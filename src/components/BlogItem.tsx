import React from "react";
import Link from "next/link";
import { Blog } from "@/types/types";

interface BlogItemProps {
  blog: Blog;
}

const BlogItem: React.FC<BlogItemProps> = ({ blog }) => {
  return (
    <div className="p-b-63 d-block">
      <Link href={`/blog/${blog.id}`} className="hov-img0 how-pos5-parent">
        <img src={blog.img} alt={blog.title} />
      </Link>

      <span className="flex-w flex-m stext-111 cl2 p-r-30 m-tb-10">
        <span>
          <span className="cl4">By</span> {blog.author}
          <span className="cl12 m-l-4 m-r-6">|</span>
          on <span className="cl4">{blog.date}</span>
        </span>
      </span>

      <div className="p-t-32">
        <h4 className="p-b-15">
          <Link
            href={`/blog/${blog.id}`}
            className="ltext-108 cl2 hov-cl1 trans-04"
          >
            {blog.title}
          </Link>
        </h4>

        <p className="stext-117 cl6 p-b-26">{blog.excerpt}</p>

        <Link
          href={`/blog/${blog.id}`}
          className="stext-101 cl2 hov-cl1 trans-04"
        >
          Continue Reading
          <i className="fa fa-long-arrow-right m-l-9"></i>
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
