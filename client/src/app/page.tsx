"use client";
import UpBar from "@/components/layouts/upbar";

export default function Home() {
  return (
    <>
      <UpBar title="Trading Toolkit" back={false} />
      <div className="container mx-auto max-w-[80%] ">
        <h1 className="text-2xl font-bold my-5 py-5 border-b-2">
          Choose Your Toolkit
        </h1>
      </div>
    </>
  );
}
