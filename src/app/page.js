import HomeBlogsSection from "@/components/Home/New/Blogs";
import HomeSectionOne from "@/components/Home/New/Section1";
import HomeSectionTwo from "@/components/Home/New/Section2";
import HomeSectionThree from "@/components/Home/New/Section3";
import HomeSectionFour from "@/components/Home/New/Section4";
import HomeSectionFive from "@/components/Home/New/Section5";
import HomeSectionSix from "@/components/Home/New/Section6";
import HomeSectionSeven from "@/components/Home/New/Section7";
import Section1 from "@/components/Home/Section1";
import Section11 from "@/components/Home/Section11";
import Section5 from "@/components/Home/Section5";
import Section8 from "@/components/Home/Section8";
import Section9 from "@/components/Home/Section9";
import { fetchData } from "@/server/getHomePageData";
import { baseUrl } from "@/util/baseUrl";
import React from "react";

const HomeNew = async () => {
  const [
    homeContent,
    clients,
    worksHomePage,
    gallery,
    googleReviews,
    blogsHomePage,
  ] = await Promise.all([
    fetchData(`${baseUrl}/wp-json/custom/v1/homepage_details?ID=8`),
    fetchData(`${baseUrl}/wp-json/custom/v1/all_clients`),
    fetchData(`${baseUrl}/wp-json/custom/v1/homeprojects`),
    fetchData(`${baseUrl}/wp-json/custom/v1/full_details?ID=8`),
    fetchData(`${baseUrl}/wp-json/custom/v1/google_reviews`),
    fetchData(`${baseUrl}/wp-json/wp/v2/posts?_embed`),
  ]);

  const split = gallery?.show_off_gallery?.length / 2 || 0;

  return (
    <>
      <Section1
        title={homeContent?.web_title}
        subTitle={homeContent?.web_sub_title}
        linkText={homeContent?.web_link_text}
        link={homeContent?.web_link}
        fullVideo={homeContent?.web_video}
        shortVideo={homeContent?.web_video_short}
      />
      {/* <HomeSectionOne content={homeContent} /> */}
      <div className="bg-[#F6F6F4] relative z-50">
        <HomeSectionTwo clientsData={clients} />
        <HomeSectionThree
          title={homeContent.service_heading}
          description={homeContent.service_description}
          countdown={homeContent.service_countdown}
        />
      </div>

      {homeContent?.ai_sections &&
        homeContent?.ai_sections.some((section) =>
          [
            "AI_solutions",
            "Our_approach",
            "Our_AI_stack",
            "Our_Core_Service",
          ].includes(section?.section_type)
        ) && (
          <div className="bg-white relative z-[60] py-14 space-y-10 lg:space-y-12 xl:space-y-16 ">
            {homeContent?.ai_sections?.map((section, index) => {
              switch (section?.section_type) {
                case "AI_solutions":
                  return <HomeSectionFour key={index} sectionData={section} />;

                case "Our_approach":
                  return <HomeSectionFive key={index} sectionData={section} />;

                case "Our_AI_stack":
                  return <HomeSectionSix key={index} sectionData={section} />;

                case "Our_Core_Services":
                  return <HomeSectionSeven key={index} sectionData={section} />;

                default:
                  return null;
              }
            })}
          </div>
        )}

      <div className="bg-white relative  z-50">
        <Section5 data={worksHomePage} isNew={true} />
        <Section8 data={gallery} split={split} isNew={true} />
        <Section11 data={googleReviews} />
        <HomeBlogsSection
          data={blogsHomePage}
          title={homeContent?.blog_heading}
        />
        {/* <Section9 data={blogsHomePage} title={homeContent?.blog_heading} /> */}
      </div>
    </>
  );
};

export default HomeNew;
