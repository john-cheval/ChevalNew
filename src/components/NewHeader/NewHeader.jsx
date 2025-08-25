"use client";
import React, { useEffect, useRef, useState } from "react";
// import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
// import ScrollTrigger from "gsap/dist/ScrollTrigger";

import logo from "../../../public/logo.svg";
import { ArrowRight } from "lucide-react";
import menu from "../../../public/menu1.svg";
import fb from "../../../public/Header/fb.svg";
import insta from "../../../public/Header/insta.svg";
import linkedin from "../../../public/Header/linkedin.svg";
import close from "../../../public/close.svg";
import logoWhite from "../../../public/Header/logo_white.svg";
import menuWhite from "../../../public/menu_white.svg";
import Phone from "../../../public/Header/call.svg";
import Mail from "../../../public/Header/mail.svg";

import Image from "next/image";
import Link from "next/link";
import BigMenu from "./BigMenu";
import whatsapp from "../../../public/whatsapp.png";
import { disableImageOptimization } from "@/util/constants";
import AdsNavbar from "../Ads/Navbar/AdsNavbar";

const NewHeader = ({ navLinksNew }) => {
  const pathname = usePathname();

  const darkBG = ["/services/", "/projects/"];
  const [active, setActive] = useState(pathname);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerRef = useRef(null);
  const bigMenuRef = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (pathname.includes("/ads")) return;
    setActive(pathname);
  }, [pathname, active]);

  const menuGGRef = useRef(null);

  useEffect(() => {
    // if (pathname.includes("/ads")) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // if (pathname.includes("/ads")) return;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    // if (pathname.includes("/ads")) return;
    menuGGRef.current = gsap.timeline({ paused: true });

    gsap.set(
      "#mblMenuHeader img, #mblMenuHeader p, #mblMenuFooter #button, #mblMenuFooter p, #mblMenuFooter div, #mblMenuItems p",
      { y: 20, opacity: 0 }
    );

    menuGGRef.current
      .set("#mblMenu", {
        zIndex: 10077774444,
        visibility: "visible",
        opacity: 0,
      })
      .to("#mblMenu", {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })
      .to(
        "#mblMenuHeader img, #mblMenuHeader p, #mblMenuItems p, #mblMenuFooter #button, #mblMenuFooter p, #mblMenuFooter div",
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2"
      );
  }, []);

  function menuOpen() {
    menuGGRef.current.play();
  }

  function menuClose() {
    setOpenDropdown(null);
    setOpenSubmenu(null);
    menuGGRef.current.reverse().eventCallback("onReverseComplete", () => {
      gsap.set("#mblMenu", { visibility: "hidden" });
    });
  }

  useEffect(() => {
    // if (pathname.includes("/path")) return;
    gsap.set(bigMenuRef.current, { opacity: 0, y: 20, pointerEvents: "none" });

    const servicesLink = document.querySelector("#servicesLink");
    const bigMenu = bigMenuRef.current;
    const navLinks = document.querySelectorAll("#navLinks p");

    if (!bigMenu || !servicesLink || navLinks.length === 0) return;

    let isInsideBigMenu = false;

    const showBigMenu = () => {
      gsap.to("#bigMenuOverlay", {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(bigMenu, {
        opacity: 1,
        y: 0,
        visibility: "visible",
        duration: 0.2,
        ease: "power2.out",
        pointerEvents: "auto",
      });
    };

    navLinks.forEach((link) => {
      if (link !== servicesLink) {
        link.addEventListener("mouseenter", () => {
          gsap.to("#bigMenuOverlay", {
            opacity: 0,
            pointerEvents: "none",
            duration: 0.1,
            ease: "power2.out",
          });
          gsap.to(bigMenu, {
            opacity: 0,
            y: 20,
            height: "0px",
            visibility: "hidden",
            duration: 0.2,
            ease: "power2.out",
            pointerEvents: "none",
          });
        });
      }
    });

    const hideBigMenu = () => {
      setTimeout(() => {
        if (!isInsideBigMenu) {
          gsap.to("#bigMenuOverlay", {
            opacity: 0,
            pointerEvents: "none",
            duration: 0.1,
            ease: "power2.out",
          });

          gsap.to(bigMenu, {
            opacity: 0,
            y: 20,
            height: "0px",
            visibility: "hidden",
            duration: 0.2,
            ease: "power2.out",
            pointerEvents: "none",
          });
        }
      }, 100);
    };

    bigMenu.addEventListener("mouseenter", () => {
      isInsideBigMenu = true;
    });

    bigMenu.addEventListener("mouseleave", () => {
      isInsideBigMenu = false;
      hideBigMenu();
    });

    servicesLink.addEventListener("mouseenter", showBigMenu);

    return () => {
      servicesLink.removeEventListener("mouseenter", showBigMenu);
      servicesLink.removeEventListener("mouseleave", hideBigMenu);
      bigMenu.removeEventListener("mouseenter", () => {});
      bigMenu.removeEventListener("mouseleave", () => {});
    };
  }, []);

  const closeMegaMenu = () => {
    gsap.to("#bigMenuOverlay", {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.1,
      ease: "power2.out",
    });
    gsap.to(bigMenuRef.current, {
      opacity: 0,
      y: 20,
      visibility: "hidden",
      duration: 0.3,
      ease: "power2.out",
      pointerEvents: "none",
    });
  };

  const isWhiteNav = pathname === "/services" || pathname === "/projects";

  const baseStyles =
    "fixed top-0 z-[999955555] font-satoshi w-full transition-transform duration-300";

  const visibilityClass = isVisible ? "translate-y-0" : "-translate-y-full";

  const scrolledStyles = isScrolled
    ? "backdrop-blur-xl-- bg-white shadow-lg text-[#000] h-fit"
    : isWhiteNav
      ? "bg-transparent text-white"
      : "bg-transparent text-black";

  const headerClassName = `${baseStyles} ${visibilityClass} ${scrolledStyles}`;
  const adsHeaderClassNames = `${baseStyles} ${scrolledStyles}`;

  return (
    <>
      {pathname?.includes("/ads") ? (
        <>
          <p className="font-sora px-5 sm:px-10 md:px-12 text-sm md:text-base leading-[150.6%] text-[#101763] w-full text-center bg-[#F1F1F1] py-3 ">
            <span className="!text-[#d81100] font-bold">Attention -</span>{" "}
            founders of services/product companies who have{" "}
            {pathname?.includes("/ads/website-development")
              ? "website development"
              : "mobile app development"}{" "}
            budget of more than{" "}
            {pathname?.includes("/ads/website-development") ? "30k" : "50k"}
          </p>
          <header ref={headerRef} id="header" className={adsHeaderClassNames}>
            <AdsNavbar scroll={isScrolled} />
          </header>
        </>
      ) : (
        <>
          <header ref={headerRef} id="header " className={headerClassName}>
            <div className="max-w-screen mx-auto w-full">
              <div id="headerContainer" className="px-5 sm:px-10 md:px-12    ">
                <div className="flex items-center justify-between border-b-[#e1e1e1]/60 sm:border-b-0 border-b-[1px] py-5 md:py-8 lg:py-9 xl:py-10 transition-all ease-out duration-300   w-full h-fit max-w-screen">
                  <Link href={"/"} aria-label="Go to Home page">
                    <Image
                      id="headerLogo"
                      src={
                        isScrolled || !darkBG.includes(pathname)
                          ? logo
                          : logoWhite
                      }
                      className="h-6 xl:h-8 object-contain"
                      alt="logo"
                      priority
                      height={100}
                      width={100}
                      sizes="100vw"
                      unoptimized={disableImageOptimization}
                    />
                  </Link>

                  <div
                    id="navLinks"
                    className="hidden lg:flex items-center text-sm font-medium space-x-6 md:space-x-8 lg:space-x-10 uppercase"
                  >
                    {navLinksNew &&
                      navLinksNew?.["0"]?.map(
                        ({ title, url, id, attr_title }) => (
                          <div key={id}>
                            <p
                              id={url === "/services" ? "servicesLink" : ""}
                              className={`${
                                active?.startsWith(url) ||
                                (url === "/services" &&
                                  active.includes("/service"))
                                  ? "text-[#D81100] activeNavLink"
                                  : isScrolled
                                    ? "text-black"
                                    : darkBG.includes(pathname)
                                      ? "text-white"
                                      : "text-black"
                              }`}
                            >
                              <Link
                                className="hover:text-[#D81100] transition-colors duration-300"
                                href={url}
                                onClick={closeMegaMenu}
                                aria-label={`Go to ${title} page`}
                                title={attr_title}
                              >
                                {title}
                              </Link>
                            </p>
                          </div>
                        )
                      )}
                    {/* <div> */}
                    <Link
                      href={"tel:+971 50 356 0927"}
                      aria-label="phone"
                      className="hover:text-[#D81100]! transition-colors duration-300"
                    >
                      <p
                        className={`hover:text-[#D81100] transition-colors duration-300 flex items-center gap-2 font-medium normal-case ${
                          isScrolled
                            ? "text-black"
                            : darkBG.includes(pathname)
                              ? "text-white"
                              : "text-black"
                        }`}
                      >
                        <Image
                          className="h-[18px] w-[18px]  object-cover"
                          src={Phone}
                          alt="phone"
                          sizes="100vw"
                          height={20}
                          width={20}
                        />
                        <span className="hidden lg:block">
                          +971 50 356 0927
                        </span>
                      </p>
                    </Link>
                    {/* </div> */}

                    {/* <div> */}
                    <Link href={"mailto:info@chevalme.com"} aria-label="Email">
                      <p
                        className={`hover:text-[#D81100] transition-colors duration-300 flex items-center gap-2 font-medium normal-case ${
                          isScrolled
                            ? "text-black"
                            : darkBG.includes(pathname)
                              ? "text-white"
                              : "text-black"
                        }`}
                      >
                        <Image
                          className="h-[18px] w-[18px]  object-cover"
                          src={Mail}
                          alt="Mail"
                          sizes="100vw"
                          height={20}
                          width={20}
                        />
                        <span className="hidden lg:block">
                          info@chevalme.com
                        </span>
                      </p>
                    </Link>
                    {/* </div> */}
                  </div>
                  <div
                    id="navLinks"
                    className="lg:hidden flex gap-6 items-center"
                  >
                    {/* <div> */}
                    <Link href={"tel:+971 50 356 0927"} aria-label="Phone">
                      <p
                        className={`hover:text-[#D81100] transition-colors duration-300 flex items-center gap-2 font-medium ${
                          isScrolled
                            ? "text-black"
                            : darkBG.includes(pathname)
                              ? "text-white"
                              : "text-black"
                        }`}
                      >
                        <Image
                          className="h-[22px] w-[22px]  object-cover"
                          src={Phone}
                          alt="phone"
                          sizes="100vw"
                          height={20}
                          width={20}
                        />
                        <span className="hidden sm:block">
                          +971 50 356 0927
                        </span>
                      </p>
                    </Link>
                    {/* </div> */}

                    {/* <div> */}
                    <Link href={"mailto:info@chevalme.com"} aria-label="Email">
                      <p
                        className={`hover:text-[#D81100] transition-colors duration-300 flex items-center gap-2 font-medium ${
                          isScrolled
                            ? "text-black"
                            : darkBG.includes(pathname)
                              ? "text-white"
                              : "text-black"
                        }`}
                      >
                        <Image
                          className="h-[22px] w-[22px]  object-cover"
                          src={Mail}
                          alt="Mail"
                          sizes="100vw"
                          height={20}
                          width={20}
                        />
                        <span className="hidden sm:block">
                          info@chevalme.com
                        </span>
                      </p>
                    </Link>
                    {/* </div> */}
                    <div onClick={menuOpen} className="cursor-pointer">
                      <Image
                        // onClick={menuOpen}
                        src={
                          isScrolled || !darkBG.includes(pathname)
                            ? menu
                            : menuWhite
                        }
                        className="h-9 object-contain"
                        alt="menu"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={bigMenuRef}
              className={`opacity-0 h-0 lg:-mt-[1.53px] hidden lg:block pointer-events-none `}
            >
              <BigMenu
                headerRef={headerRef}
                megaMenuLink={navLinksNew}
                closeMegaMenu={closeMegaMenu}
              />
            </div>
          </header>
          <div className="fixed bottom-4 right-3 xl:bottom-24 xl:right-6 z-[10000000]">
            <Link
              // href="https://web.whatsapp.com/send?phone=%2B971503560927&text=Hello!+I+am+interested+in+your+service"
              href="https://api.whatsapp.com/send/?phone=971503560927&text=Hello%21+I+am+interested+in+your+service&type=phone_number&app_absent=0"
              target="_blank"
              aria-label="Go to Whats app"
            >
              <div className="whapp animated pulse">
                <div className="whapp-btn">
                  <Image
                    className="w-8 object-contain"
                    src={whatsapp}
                    alt="WhatsApp"
                    width={32}
                    height={32}
                    unoptimized={disableImageOptimization}
                  />
                  <span className="red-dot"></span>
                </div>
              </div>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div
            className="fixed lg:hidden opacity-0 h-[100dvh] w-full -z-10- overflow-y-auto overflow-x-hidden bg-white"
            id="mblMenu"
          >
            <div className="max-w-screen mx-auto absolute top-0 w-full">
              <div
                id="mblMenuHeader"
                className="px-4 sm:px-6 flex items-center justify-between py-6 w-full"
              >
                <Link
                  href={"/"}
                  aria-label="Go to Home page"
                  onClick={menuClose}
                >
                  <Image
                    src={logo}
                    className="h-6 xl:h-8 object-contain"
                    alt="logo"
                    priority
                  />
                </Link>
                <div className="lg:hidden flex" onClick={menuClose}>
                  <Image
                    src={close}
                    className="h-9 object-contain cursor-pointer"
                    alt="close"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col  h-[100dvh] w-screen items-center  pt-24 sm:pt-32 space-y-16 ">
              <div
                id="mblMenuItems"
                className="flex flex-col font-sora font-semibold text-3xl text-[#101763] items-center justify-center w-screen h-fit space-y-4 px-5 sm:px-10 md:px-12"
              >
                {navLinksNew?.["0"] &&
                  navLinksNew?.["0"]?.map(
                    ({ title, url, id, attr_title }, index) => {
                      return (
                        <div key={id}>
                          <div className="flex justify-center w-full text-center pt-4 items-center cursor-pointer transition-colors duration-300 uppercase">
                            <p>
                              <Link
                                href={url}
                                className="text-[30px] uppercase"
                                onClick={menuClose}
                                aria-label={`Go to ${title} page`}
                                title={attr_title}
                              >
                                {title}
                              </Link>
                            </p>
                          </div>

                          {title === "Services" &&
                            navLinksNew?.["3803"]?.map((item) => (
                              <div
                                key={item.id}
                                className="flex justify-center w-full text-center pt-3 items-center cursor-pointer transition-colors duration-300 uppercase"
                              >
                                <p>
                                  <Link
                                    onClick={menuClose}
                                    href={`/services?section=${item?.title?.toLowerCase()}`}
                                    className="text-xl sm:text-[22px]"
                                    aria-label="Menu Close"
                                  >
                                    {item?.title}
                                  </Link>
                                </p>
                              </div>
                            ))}
                        </div>
                      );
                    }
                  )}
              </div>

              <div
                id="mblMenuFooter"
                className="flex flex-col items-center justify-center  space-y-6"
              >
                <Link
                  id="button"
                  href={"/contact-us"}
                  aria-label="Go to Contact page"
                  className="bg-[#D81100] w-[150px] md:w-[158px] font-satoshi h-14 md:h-14 rounded-[10px]  text-white text-sm md:text-base font-medium leading-[154%] flex items-center gap-x-5 justify-center"
                >
                  Enquire <ArrowRight />
                </Link>
                <div className="flex flex-row space-x-8">
                  <Link
                    target="_blank"
                    className="cursor-pointer"
                    aria-label="Go to Facebook "
                    href={"https://www.facebook.com/chevalmiddleeast"}
                  >
                    <Image
                      src={fb}
                      className="w-3 h-auto object-contain"
                      alt="facebook"
                    />
                  </Link>
                  <Link
                    target="_blank"
                    className="cursor-pointer"
                    aria-label="Go to instagram "
                    href={"https://www.instagram.com/chevalmiddleeast/"}
                  >
                    <Image
                      src={insta}
                      className="w-5 h-auto object-contain"
                      alt="instagram"
                    />
                  </Link>
                  <Link
                    target="_blank"
                    className="cursor-pointer"
                    aria-label="Go to linkedin "
                    href={"https://www.linkedin.com/company/chevalmiddleeast/"}
                  >
                    <Image
                      src={linkedin}
                      className="w-5 h-auto object-contain"
                      alt="linkedin"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div
            id="bigMenuOverlay"
            className="fixed inset-0 z-10 backdrop-blur-md bg-white/30 opacity-0 pointer-events-none transition-opacity duration-300"
          ></div>
        </>
      )}
    </>
  );
};

export default NewHeader;
