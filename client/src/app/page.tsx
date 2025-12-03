"use client";
import OptionCard from "@/components/layouts/optionCard";
import UpBar from "@/components/layouts/upbar";
import {
  InstagramLogoIcon,
  LinkedinLogoIcon,
  TiktokLogoIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <UpBar title="Stocks/Crypto Toolkit" back={false} />
      <div className="container mx-auto max-w-[80%] ">
        <h1 className="text-3xl font-bold my-5 py-5 border-b-2">
          Choose Your Toolkit
        </h1>
        <div className="grid place-items-center grid-cols-2 md:grid-cols-4 gap-4">
          <OptionCard url="pnl-calculator" title="PnL Leverage Calculator">
            <Image
              src="/calculatorpnl.png"
              alt="PnLCalculator"
              height={150}
              width={150}
            />
          </OptionCard>
          <OptionCard title="Dollar Cost Averaging" url="dca">
            <Image
              src="/dca.png"
              alt="Dollar Cost Averaging"
              height={150}
              width={150}
            />
          </OptionCard>
          <OptionCard title="Coming Soon" url="unavailable">
            <Image
              src="/unavailable.png"
              alt="Unavailable"
              height={150}
              width={150}
            />
          </OptionCard>
        </div>
        <div className="border-t-2 flex justify-center gap-4 pt-5">
          <Link href={"https://www.instagram.com/evankeanej/"}>
            <InstagramLogoIcon size={25} />
          </Link>
          <Link href={"https://www.tiktok.com/@evankeanej"}>
            <TiktokLogoIcon size={25} />
          </Link>
          <Link href={"https://www.linkedin.com/in/evan-keane-j/"}>
            <LinkedinLogoIcon size={25} />
          </Link>
        </div>
      </div>
    </>
  );
}
