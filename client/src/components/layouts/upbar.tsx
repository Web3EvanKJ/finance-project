"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function UpBar({ title, back }: { title: string; back: boolean }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login state (via localStorage JWT)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="bg-[#251F47] min-h-15 flex justify-between items-center px-5">
      {/* Back button */}
      {back ? (
        <div className="hover:cursor-pointer" onClick={() => router.push("/")}>
          <ChevronLeft className="text-white" />
        </div>
      ) : (
        <div></div>
      )}

      {/* Title */}
      <p className="min-w-[30%] text-2xl font-extrabold text-white text-center">
        {title}
      </p>

      {/* Right side */}
      {/* <div>
        {!isLoggedIn ? (
          <button
            className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold"
            onClick={() => router.push("/sign-in")}
          >
            Sign In
          </button>
        ) : (
          <Link
            href="/trade-position"
            className="text-white bg-sky-600 px-3 py-2 rounded-md text-sm"
          >
            Trade
          </Link>
        )}
      </div> */}
    </div>
  );
}

export default UpBar;
