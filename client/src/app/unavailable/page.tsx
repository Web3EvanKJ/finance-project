"use client";
import UpBar from "@/components/layouts/upbar";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <UpBar title="Coming Soon" back={true} />
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <h1 className="text-3xl font-bold mb-4">Upcoming Feature Soon...</h1>
        <p className="text-gray-500">
          Have an idea? Comment on my tiktok{" "}
          <span className="underline">
            <Link href="https://www.tiktok.com/@evankeanej">@evankeanej</Link>
          </span>
        </p>
        <p className="text-gray-500">Any feedback would be appreciated! 😁</p>
      </div>
    </>
  );
}
