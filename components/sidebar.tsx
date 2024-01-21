"use client";

import { cn } from "@/lib/utils";
import { Database, Hash, LayoutDashboard, Microscope } from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({weight: "600", subsets: ["latin"]});

const routes = [
    {
        label: "Home",
        icon: LayoutDashboard,
        href: "/home",
        color: "text-white"
    },
    {
        label: "Find Influencers (Try New AI)",
        icon: Database,
        href: "/discover",
        color: "text-white"
    },
    {
        label: "Enrich",
        icon: Microscope,
        href: "/import",
        color: "text-white"
    },
    {
        label: "Campaigns",
        icon: Hash,
        href: "/campaigns",
        color: "text-white"
    },
]

const Sidebar = () => {
    const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#000000] text-white">
        <div className="px-3 py-2 flex-1">
            <Link href={`/home`} className="flex items-center pl-3 mb-14">
                <div className="relative w-8 h-8 mr-4">
                    {/* <Image
                    fill
                    alt="Logo"
                    src="./logo.svg"
                    /> */}
                </div>
                <h1 className={cn("text-xxl font-bold", montserrat.className)}>
                    influencersearch.club
                </h1>
            </Link>
            <div className="space-y-1">
                {routes.map((route) => (
                    <Link
                        href={route.href}
                        key={route.href}
                        className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                        pathname === route.href ? "text-white bg-white/10" : "text-zinc-400")}>
                            <div className="flex items-center">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>

                    </Link>
                ))}
            </div>
        </div>

    </div>
  )
}

export default Sidebar
