"use client";
import gsap from "gsap";
import Link from "next/link";
import React, { useEffect } from "react";

const Buttons = ({ link, color = false, text }) => {
  useEffect(() => {
    const buttons = gsap.utils.toArray(".animated-button");
    buttons.forEach((item) => {
      let span = item.querySelector("span");
      let tl = gsap.timeline({ paused: true });

      tl.to(span, { duration: 0.2, yPercent: -150, ease: "power2.in" });
      tl.set(span, { yPercent: 150 });
      tl.to(span, { duration: 0.2, yPercent: 0 });

      item.addEventListener("mouseenter", () => tl.play(0));
    });
  }, []);

  return (
    <Link
      href={link}
      // aria-label={text}
      className={`animated-button inline-flex items-center justify-center font-satoshi text-base md:text-lg font-medium ${color ? "text-black border-black" : "text-white border-[#fff]"}  border rounded-[4px]  mt-5 px-10 lg:px-16 py-4 relative overflow-hidden w-fit`}
      style={{
        display: "flex",
        alignItems: "center",
        // height: "auto",
        // minHeight: "40px",
      }}
    >
      <span className="relative block">{text}</span>
    </Link>
  );
};

export default Buttons;
