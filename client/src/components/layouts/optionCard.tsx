import Link from "next/link";

function OptionCard({
  title,
  url,
  children,
}: {
  title: string;
  url: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={`/${url}`}
      className="w-full max-w-[180px] md:max-w-[240px] aspect-square rounded-xl flex flex-col justify-center items-center p-5 transition-all cursor-pointer hover:scale-103"
    >
      {children}
      <p className="font-semibold text-center text-sm md:text-md">{title}</p>
    </Link>
  );
}
export default OptionCard;
