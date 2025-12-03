import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function UpBar({ title, back }: { title: string; back: boolean }) {
  const router = useRouter();

  return (
    <div className="bg-[#251F47] min-h-15 flex justify-between items-center px-5">
      {back ? (
        <div className="hover:cursor-pointer" onClick={() => router.push("/")}>
          <ChevronLeft className="text-white" />
        </div>
      ) : (
        <div></div>
      )}

      <Link href={"/"} className="text-2xl font-extrabold text-white">
        {title}
      </Link>
      <div>
        <Link
          target="_blank"
          href={"https://www.linkedin.com/in/evan-keane-j/"}
        >
          <Image
            src="/crayon-sinchan.jpg"
            alt="Evan"
            height={40}
            width={40}
            className="rounded-full"
          />
        </Link>
      </div>
    </div>
  );
}

export default UpBar;
