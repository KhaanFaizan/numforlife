"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";

export function AppDownload() {
  const [phone, setPhone] = useState("");
  const reducedMotion = useReducedMotion();

  return (
    <section className="bg-bg">
      <div className="flex min-h-0 flex-col md:min-h-[600px] md:flex-row">
        <div className="relative flex w-full items-center justify-center bg-accent-hover py-12 sm:py-14 md:w-[42%] md:py-0">
          <motion.div
            animate={reducedMotion ? undefined : { y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="relative z-10 px-6 sm:px-8"
          >
            <Image
              src="https://numforlife.com/wp-content/uploads/2025/06/download-2.svg"
              alt="数易赋能 App"
              width={280}
              height={560}
              className="h-auto w-[200px] sm:w-[220px] md:w-[260px] lg:w-[280px]"
              priority
            />
          </motion.div>
        </div>

        <div className="flex w-full flex-col justify-center px-5 py-10 sm:px-6 md:w-[58%] md:px-12 lg:px-20 lg:py-16">
          <FadeIn direction="right">
            <h2 className="font-mono text-xl font-semibold text-fg sm:text-[22px] md:text-[28px]">
              Join us on mobile!
            </h2>
          </FadeIn>

          <FadeIn direction="right" delay={0.1}>
            <p className="mt-4 max-w-md font-mono text-sm leading-relaxed font-semibold text-fg md:text-base">
              Download the &ldquo;数易赋能&rdquo; app to easily stay updated on
              the go.
            </p>
          </FadeIn>

          <FadeIn direction="right" delay={0.2} className="mt-8 max-w-md">
            <form onSubmit={(e) => e.preventDefault()}>
              <label
                htmlFor="app-phone"
                className="font-mono text-xs text-fg-muted md:text-sm"
              >
                Phone number
              </label>
              <input
                id="app-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Add your number"
                className="focus-accent mt-2 w-full border-b border-border bg-transparent pb-3 font-mono text-base text-fg outline-none placeholder:text-fg-subtle focus:border-border-strong sm:text-lg"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, backgroundColor: "#FF4E27" }}
                whileTap={{ scale: 0.98 }}
                className="focus-accent mt-6 min-h-[44px] bg-accent px-8 py-2.5 font-mono text-sm font-medium text-accent-fg transition-colors"
              >
                Send
              </motion.button>
            </form>
          </FadeIn>

          <FadeIn direction="right" delay={0.3} className="mt-8 sm:mt-10">
            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-white p-1 sm:h-[72px] sm:w-[72px]">
                <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden>
                  <rect width="80" height="80" fill="white" />
                  <rect x="8" y="8" width="20" height="20" fill="black" />
                  <rect x="52" y="8" width="20" height="20" fill="black" />
                  <rect x="8" y="52" width="20" height="20" fill="black" />
                  <rect x="32" y="32" width="8" height="8" fill="black" />
                  <rect x="44" y="44" width="6" height="6" fill="black" />
                  <rect x="56" y="56" width="10" height="10" fill="black" />
                </svg>
              </div>

              <div className="flex flex-col gap-3">
                <motion.a
                  href="https://play.google.com/store/apps/details?id=com.wix.android"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                >
                  <Image
                    src="https://numforlife.com/wp-content/uploads/2025/06/Google.png"
                    alt="Google Play"
                    width={160}
                    height={48}
                    className="h-10 w-auto sm:h-11"
                  />
                </motion.a>
                <motion.a
                  href="https://apps.apple.com/us/app/spaces-follow-businesses/id1099748482"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                >
                  <Image
                    src="https://numforlife.com/wp-content/uploads/2025/06/apple.avif"
                    alt="App Store"
                    width={160}
                    height={48}
                    className="h-10 w-auto sm:h-11"
                  />
                </motion.a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
