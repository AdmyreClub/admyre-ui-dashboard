"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Input } from "postcss";
export default function DashboardPage() {
  const { user } = useUser();
  const userName = user?.fullName;

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      <div>
        <div className="mb-8 space-y-4 pt-[4.5rem] ">
          <h1 className="text-center mt-6 text-[28px] mb-0 font-bold">
            Search from the largest database
          </h1>
          <p
            className="text-center text-[18px] font-normal "
            style={{ marginTop: "5px" }}
          >
            Welcome, {userName} 👋
          </p>
          <Card className="flex justify-center border-none shadow-none bg-inherit">
            <Button className="rounded-l-3xl rounded-r-none h-12">
              <p className="mr-2"><Link href={"/discover"}>Search</Link></p> <i className="fa-solid fa-magnifying-glass text-white"></i>
            </Button>
            <Link href={"/discover"} >
            <Card className="rounded-r-3xl rounded-l-none h-12 text-center align-middle justify-center flex w-[460px]">
              <p className="self-center">Discover influencers</p>
            </Card>
            </Link>
          </Card>
        </div>
      </div>
    </>
  );
}
