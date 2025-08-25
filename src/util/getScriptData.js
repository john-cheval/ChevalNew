import { baseUrl } from "./baseUrl";

async function generatePageScripts(id, slug = false) {
  try {
    const res = await fetch(
      `${baseUrl}/wp-json/custom/v1/full_details_meta?${slug ? "slug" : "ID"}=${id}`
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.error("MetaScripts fetch error:", error);
  }
}

export default generatePageScripts;
