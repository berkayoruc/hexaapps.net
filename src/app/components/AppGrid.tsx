"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { apps, categoryTint, type AppCategory } from "../data/apps";

type Filter = "all" | AppCategory;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "games", label: "Games" },
  { id: "mobile", label: "Mobile apps" },
  { id: "web", label: "Web & tools" },
];

export default function AppGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = apps.filter((a) => filter === "all" || a.category === filter);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter by category"
        className="-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:mb-9 sm:inline-flex sm:flex-wrap sm:gap-1.5 sm:overflow-visible sm:rounded-full sm:border sm:border-line sm:bg-white sm:p-1.5"
      >
        {FILTERS.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.id)}
              className={`min-h-[44px] shrink-0 whitespace-nowrap rounded-full border-[1.5px] px-4 text-sm font-semibold transition-colors sm:border-0 sm:px-[18px] ${
                active
                  ? "border-ink bg-ink text-white"
                  : "border-ink bg-white text-[#3A3D42] hover:bg-paper sm:bg-transparent"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <ul className="flex flex-col gap-3.5 sm:grid sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] sm:gap-5">
        {visible.map((app) => (
          <li key={app.name} className="flex">
            <Link
              href={app.href}
              target={app.external ? "_blank" : undefined}
              rel={app.external ? "noopener noreferrer" : undefined}
              className="group flex w-full items-center gap-3.5 rounded-[20px] border-[1.5px] border-ink bg-white p-3 shadow-pop-sm transition-transform hover:-translate-y-1 sm:flex-col sm:items-stretch sm:gap-0 sm:overflow-hidden sm:rounded-3xl sm:p-0 sm:shadow-pop"
            >
              <span
                className={`flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-2xl sm:h-60 sm:w-auto sm:items-start sm:rounded-none ${categoryTint[app.category]}`}
              >
                {app.image ? (
                  <Image
                    src={app.image}
                    alt=""
                    sizes="(min-width: 640px) 240px, 72px"
                    className="h-full w-full object-cover object-top transition-transform duration-300 sm:mx-auto sm:mt-7 sm:h-[260px] sm:w-[62%] sm:rounded-t-[22px] sm:shadow-[0_0_0_2px_#121417] sm:group-hover:-translate-y-2"
                  />
                ) : (
                  <span className="font-display text-[22px] font-bold tracking-tighter text-mint-ink sm:self-center sm:text-6xl">
                    {app.mono}
                  </span>
                )}
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-1 sm:gap-2.5 sm:border-t-[1.5px] sm:border-ink sm:px-6 sm:pb-6 sm:pt-[22px]">
                <span className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted sm:text-xs">
                    {app.platform}
                  </span>
                  <svg className="hidden sm:block" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </span>
                <h3 className="font-display text-lg font-semibold tracking-tight sm:text-2xl">
                  {app.name}
                </h3>
                <span className="text-[13px] leading-snug text-muted sm:text-[15px] sm:leading-normal">
                  {app.desc}
                </span>
              </div>
              <svg className="shrink-0 sm:hidden" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
