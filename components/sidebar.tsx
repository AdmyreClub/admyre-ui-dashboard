"use client";

import { cn } from "@/lib/utils";
import { Database, Hash, LayoutDashboard, Microscope } from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Home",
    icon: LayoutDashboard,
    href: "/home",
    color: "text-white",
  },
  {
    label: "Find Influencers (Try New AI)",
    icon: Database,
    href: "/discover",
    color: "text-white",
  },
  {
    label: "Track & Enrich",
    icon: Microscope,
    href: "/actions",
    color: "text-white",
  },
  {
    label: "Campaigns",
    icon: Hash,
    href: "/campaigns",
    color: "text-white",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#000000] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href={`/home`} className="flex items-center pl-3 mb-14">
          <div className="flex align-text-bottom ">
            <svg
              width="32"
              fill="none"
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 89.76 97.56"
            >
              <ellipse
                cx="16.97"
                cy="79.39"
                rx="16.97"
                ry="16.56"
                fill="#cad6e2 "
              ></ellipse>
              <path
                d="m43.3,1.62c5.42,4.53,8.61,10.24,12.4,15.93,10.82,16.55,21.49,33.3,31.4,50.35,5.46,9.44,2.24,21.52-7.2,26.99,0,0-.01,0-.02.01-10.72,6.38-25.1.75-28.73-11.14-5.9-18.82-11.07-38-16-57.14-1.64-6.63-3.7-12.84-3.4-19.9.19-3.89,3.5-6.9,7.39-6.71,1.52.07,2.98.64,4.16,1.61Z"
                fill="#cad6e2"
              ></path>
            </svg>
            <div className="flex flex-col">
              <span className="font-mont text-[36px] font-[900] text-slate-300 ml-3">
                Admyre
              </span>
              <span className="font-mont text-[12px] font-[600] text-slate-300 ml-[120px] mt-[-16px]">
                .club
              </span>
            </div>
          </div>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
