"use client";

import { useMemo, useState } from "react";
import {
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import { useSiteContent } from "@/components/providers/site-content-provider";
import { FooterTapedDesign } from "@/components/ui/footer-taped-design";
import { SiteNavbar } from "@/components/ui/site-navbar";
import { getLucideIcon } from "@/lib/cms/icon-map";

export function WhyChooseUsPage() {
  const { siteContent } = useSiteContent();
  const { business, whyChoosePage } = siteContent;

  const detailTabs = useMemo(
    () =>
      whyChoosePage.features.map((feature) => ({
        ...feature,
        iconComponent: getLucideIcon(feature.icon, ShieldCheck),
      })),
    [whyChoosePage.features]
  );

  const [activeTab, setActiveTab] = useState(detailTabs[0]);

  return (
    <div className="relative min-h-screen">
      <SiteNavbar />
      <main className="relative z-10">
        <section className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-8 rounded-[2rem] border border-amber-300/35 bg-white/58 p-5 shadow-[0_24px_70px_rgba(176,106,31,0.10)] backdrop-blur-md sm:p-8">
              <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
                <div>
                  <span className="inline-flex rounded-full border border-amber-300/50 bg-[#fff6df] px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-[#9a5a1a] shadow-sm">
                    {whyChoosePage.badge}
                  </span>
                  <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-[#5a2a17] sm:text-5xl lg:text-6xl">
                    {whyChoosePage.title}
                  </h1>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-[#7a5842] sm:text-lg sm:leading-8">
                    {whyChoosePage.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={`tel:${business.phone}`}
                    className="inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-[#2a120d] transition hover:bg-amber-300"
                  >
                    {whyChoosePage.callLabel}
                  </a>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center rounded-full border border-amber-300/45 bg-white/80 px-6 py-3 text-sm font-semibold text-[#7a4b24] transition hover:bg-[#fff3dd]"
                  >
                    {whyChoosePage.backLabel}
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {whyChoosePage.highlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.5rem] border border-amber-300/30 bg-[#fffaf1] p-5 shadow-sm"
                  >
                    <p className="text-xl font-semibold text-[#5a2a17]">{item.value}</p>
                    <p className="mt-2 text-sm text-[#7a5842]">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-amber-300/35 bg-white/55 p-5 shadow-[0_24px_70px_rgba(176,106,31,0.08)] backdrop-blur-md sm:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b06a1f]">
                {whyChoosePage.interactiveBadge}
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-1">
                {detailTabs.map((tab) => {
                  const Icon = tab.iconComponent;
                  const isActive = activeTab.id === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`rounded-[1.4rem] border px-4 py-4 text-left transition ${
                        isActive
                          ? "border-amber-400 bg-amber-100/90 shadow-sm"
                          : "border-amber-200/70 bg-white/70 hover:bg-[#fff4e4]"
                      }`}
                    >
                      <Icon className="h-5 w-5 text-[#9a5a1a]" />
                      <p className="mt-3 text-sm font-semibold text-[#5a2a17]">
                        {tab.label}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-amber-300/35 bg-white/60 p-5 shadow-[0_24px_70px_rgba(176,106,31,0.08)] backdrop-blur-md sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
                  transition={{ duration: 0.32 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-amber-100 p-3">
                      <activeTab.iconComponent className="h-6 w-6 text-[#9a5a1a]" />
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b06a1f]">
                      {activeTab.label}
                    </p>
                  </div>

                  <h2 className="mt-5 text-3xl font-semibold leading-tight text-[#5a2a17] sm:text-4xl">
                    {activeTab.title}
                  </h2>

                  <p className="mt-4 max-w-2xl text-base leading-7 text-[#7a5842] sm:text-lg sm:leading-8">
                    {activeTab.description}
                  </p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    {activeTab.points.map((point) => (
                      <div
                        key={point}
                        className="rounded-[1.4rem] border border-amber-200/70 bg-[#fff8ee] p-4"
                      >
                        <p className="text-sm leading-6 text-[#6d4630]">{point}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] border border-amber-300/35 bg-white/58 p-6 shadow-[0_24px_70px_rgba(176,106,31,0.08)] backdrop-blur-md sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b06a1f]">
                {whyChoosePage.standardsBadge}
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-[#5a2a17] sm:text-4xl">
                {whyChoosePage.standardsTitle}
              </h2>
              <div className="mt-6 space-y-4 text-[#7a5842]">
                {whyChoosePage.standardsParagraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-7 sm:text-lg sm:leading-8"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-amber-300/35 bg-[#fffaf1] p-6 shadow-[0_24px_70px_rgba(176,106,31,0.08)] sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b06a1f]">
                {whyChoosePage.contactBadge}
              </p>
              <div className="mt-6 space-y-5">
                <a
                  href={`tel:${business.phone}`}
                  className="flex items-start gap-4 rounded-[1.4rem] border border-amber-200/70 bg-white/75 p-4 transition hover:bg-white"
                >
                  <Phone className="mt-1 h-5 w-5 text-[#9a5a1a]" />
                  <div>
                    <p className="text-sm text-[#9a5a1a]">Call Us</p>
                    <p className="text-lg font-semibold text-[#5a2a17]">{business.phone}</p>
                  </div>
                </a>

                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-4 rounded-[1.4rem] border border-amber-200/70 bg-white/75 p-4 transition hover:bg-white"
                >
                  <MapPin className="mt-1 h-5 w-5 text-[#9a5a1a]" />
                  <div>
                    <p className="text-sm text-[#9a5a1a]">Visit Us</p>
                    <p className="text-lg font-semibold text-[#5a2a17]">
                      {business.location}
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        <FooterTapedDesign />
      </main>
    </div>
  );
}
