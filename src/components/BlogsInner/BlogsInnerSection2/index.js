/** @format */
"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { disableImageOptimization } from "@/util/constants";
function BlogsInnerSection2({ data, blogID }) {
  const router = useRouter();
  return (
    <div className="relative w-screen h-fit pb-20 bg-[#F6F6F4] overflow-x-hidden">
      <div className="w-full flex items-center h-fit flex-col">
        <div className="flex items-end justify-between w-full  px-5 sm:px-10 md:px-12 ">
          <div className="">
            <div className="flex font-sora text-sm my-2 items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D81100]"></div>
              <span>More good stuff</span>
            </div>
            <h3 className="font-sora font-semibold leading-none text-[#101763] text-3xl sm:text-4xl md:text-[50px]">
              What next?
            </h3>
          </div>
          <Link href={"/blogs"}>
            <p className="font-satoshi text-xs sm:text-sm md:text-base mb-1 underline underline-offset-8 text-black ">
              View All
            </p>
          </Link>
        </div>
        <div className="w-full h-fit mt-8 relative pl-5 sm:pl-10 md:pl-12">
          <Swiper
            slidesPerView={"auto"}
            centeredSlides={false}
            spaceBetween={20}
            loop={true}
            grabCursor={true}
            className="w-full h-fit"
          >
            <style jsx global>{`
              .swiper-slide-fit {
                width: fit-content;
              }
            `}</style>

            {data
              ?.filter((blog) => blog?.slug !== blogID)
              ?.map((data, index) => (
                <SwiperSlide
                  key={index}
                  onClick={() => router.push(`/blogs/${data.slug}`)}
                  className="swiper-slide-fit cursor-pointer"
                >
                  <div className="flex flex-col group relative w-[75vw] sm:w-[55vw] md:w-[55vw] lg:w-[35vw]">
                    {data._embedded["wp:featuredmedia"] && (
                      <div className="h-[55vw] sm:h-[40vw] md:h-[40vw] lg:h-[25vw] w-full object-cover relative  object-center">
                        <Image
                          src={data._embedded["wp:featuredmedia"][0].source_url}
                          fill={true}
                          className="rounded-[2rem] object-cover"
                          alt={data.title.rendered}
                          unoptimized={disableImageOptimization}
                        />
                      </div>
                    )}

                    <div className="flex flex-col  px-1 text-black">
                      <span className=" mt-6 mb-2.5 font-sora text-[10px] sm:text-xs md:text-sm ">
                        {" "}
                        {format(new Date(data.date), "EEEE dd MMM")}
                      </span>
                      <p className="font-satoshi pl-1 font-medium group-hover:text-[#D81100] duration-500 transition-colors line-clamp-2 text-base sm:text-lg md:text-xl lg:text-2xl text-[#101763]">
                        {data.title.rendered}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default BlogsInnerSection2;
