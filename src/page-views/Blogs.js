/** @format */
"use client";
import BlogsSection1 from "@/components/Blogs/BlogsSection1";
import { fetchData } from "@/server/getHomePageData";
import { baseUrl } from "@/util/baseUrl";
import React from "react";

async function BlogsPage({}) {
  const data = await fetchData(`${baseUrl}/wp-json/wp/v2/posts?_embed`);

  return (
    <>
      <BlogsSection1 data={data} />
    </>
  );
}

export default BlogsPage;
