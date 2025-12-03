import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function UpBar({ title, back }: { title: string; back: boolean }) {
  const router = useRouter();

  return (
    <div className="bg-[#251F47] min-h-15 flex justify-between items-center px-5">
      {back ? (
        <div className="hover:cursor-pointer" onClick={() => router.push("/")}>
          <ChevronLeft />
        </div>
      ) : (
        <div></div>
      )}

      <div className="text-2xl font-extrabold text-white">{title}</div>
      <div></div>
    </div>
  );
}

export default UpBar;
