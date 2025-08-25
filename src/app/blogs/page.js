/** @format */

// import { fetchData } from "@/server/getHomePageData";
import generatePageScripts from "@/util/getScriptData";
import BlogsPage from "../../page-views/Blogs";
import { baseUrl } from "@/util/baseUrl";
export async function generateMetadata(parent) {
  const data = await fetch(`${baseUrl}/wp-json/wp/v2/posts?_embed`).then(
    (res) => res.json()
  );

  return {
    title:
      data?.meta_title ||
      "Best Web Developers in Dubai | Software Developers in Dubai",
    description:
      data?.meta_description ||
      "Best Web Developers in Dubai | Software Developers in Dubai",
    alternates: {
      canonical: `https://chevalme.com/blogs/`,
    },
  };
}
export default async function Blogs() {
  // const pageData = await generatePageScripts(
  //   "web-design-company-abu-dhabi",
  //   true
  // );
  // const {
  //   meta_schema,
  //   faqs_heading_footer,
  //   faqs_list_footer,
  //   faqs_list_footer_schema,
  // } = pageData;

  return (
    <>
      <BlogsPage /* faq_title={faqs_heading_footer} faq_list={faqs_list_footer}  */
      />
    </>
  );
}
