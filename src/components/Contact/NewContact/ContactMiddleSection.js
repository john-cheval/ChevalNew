import Link from "next/link";
import Phone from "../../../../public/Contact/call.svg";
import email from "../../../../public/Contact/mail.svg";
import location from "../../../../public/Contact/location.svg";

import facebook from "../../../../public/Contact/contct/fb.svg";
import instagram from "../../../../public/Contact/contct/insta.svg";
import linkedin from "../../../../public/Contact/contct/link.svg";

import React from "react";
import Image from "next/image";

const ContactMiddleSection = () => {
  return (
    <div className="px-5 sm:px-10 md:px-12 mt-10 md:mt-[75px] lg:mt-[65px]  ">
      <div className="flex md:items-center justify-center flex-col">
        <h2
          className="text-[#101763] md:text-center font-sora text-3xl md:text-4xl lg:text-[40px] font-normal leading-[140%] w-[80%] lg:w-[551px] mb-4 md:mb-7 "
          style={{
            lineHeight: "140%",
          }}
        >
          Let<span className="text-[#d81100]">’</span>s create something great
          together.
        </h2>
        <div className="bg-[#d81100] w-[76px] h-[6px]" />
        <div className="flex  space-x-2 mt-7 mb-3 ">
          <Image
            src={Phone}
            alt="phone"
            height={0}
            width={0}
            sizes="100vw"
            className="h-[15px] w-[15px] mt-2 "
          />
          <div className="flex items-center gap-2 ">
            <Link
              href={"tel:  +971 50 356 0927   "}
              className="text-[#101763] font-satoshi text-base md:text-xl font-medium leading-[154%]"
            >
              +971 50 356 0927
            </Link>
            <span className="text-[#101763] font-satoshi text-base md:text-xl font-medium leading-[154%]">
              |
            </span>

            <Link
              href={"tel:  +971 4 551 6085   "}
              className="text-[#101763] font-satoshi text-base md:text-xl font-medium leading-[154%]"
            >
              +971 4 551 6085
            </Link>
          </div>
        </div>
        <div className="flex  space-x-3 ">
          <Image
            src={email}
            alt="email"
            height={0}
            width={0}
            sizes="100vw"
            className="h-[15px] w-[15px] mt-2 "
          />
          <Link
            href={"mailto:info@chevalme.com"}
            className="text-[#101763] font-satoshi text-base md:text-xl font-medium leading-[154%]"
          >
            info@chevalme.com
          </Link>
        </div>
        <div className="flex  space-x-3 mt-3 mb-8 ">
          <Image
            src={location}
            alt="location"
            height={0}
            width={0}
            sizes="100vw"
            className="h-[15px] w-[15px] mt-2 "
          />
          <Link
            href={
              "https://www.google.com/maps/place/Cheval+ME/@25.1780349,55.2713491,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f699813fd9451:0xc4b554ceb43cff51!8m2!3d25.1780349!4d55.273924!16s%2Fg%2F11txt0bwbq?entry=tts&shorturl=1"
            }
            target="_blank"
            className="text-[#101763] font-satoshi text-base md:text-xl font-medium leading-[154%]"
          >
            Suite 1, 101, Capital Golden Tower, Business Bay, Dubai, UAE
          </Link>
        </div>
        <div className="flex space-x-3 mb-5 md:mb-11">
          <Link
            href={"https://www.facebook.com/chevalmiddleeast"}
            target="_blank"
          >
            <Image
              src={facebook}
              alt="facebook"
              height={0}
              width={0}
              sizes="100vw"
              className="h-12 w-12"
            />
          </Link>

          <Link
            href={"https://www.instagram.com/chevalmiddleeast/"}
            target="_blank"
          >
            <Image
              src={instagram}
              alt="instagram"
              height={0}
              width={0}
              sizes="100vw"
              className="h-12 w-12"
            />
          </Link>

          <Link
            href={"https://www.linkedin.com/company/chevalmiddleeast/"}
            target="_blank"
          >
            <Image
              src={linkedin}
              alt="facebook"
              height={0}
              width={0}
              sizes="100vw"
              className="h-12 w-12"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactMiddleSection;
