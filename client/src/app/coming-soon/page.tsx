"use client";
import UpBar from "@/components/layouts/upbar";

export default function NotFound() {
  return (
    <>
      <UpBar title="Not Found" back={true} />
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-500">
          The page you are looking for does not exist.
        </p>
        <p className="text-gray-500">So curious, aren't you? 😏</p>
      </div>
    </>
  );
}
