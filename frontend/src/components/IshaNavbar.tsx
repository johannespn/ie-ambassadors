import Logo from "@/assets/isha-logo.svg";
// import Menu from "@/assets/menu.svg";
// import Search from "@/assets/search.svg";
import Image from "next/image";
import Link from "next/link";

type variantType = "no-menu";

export function IshaNavbar({ variant }: { variant?: variantType }) {
  return (
    <div className="pl-6 pr-6 flex w-full justify-between bg-beige-900">
      <Link href="/">
        <div className="relative w-16 h-16">
          <Image
            className="pt-3 pb-2 absolute"
            fill={true}
            src={Logo}
            alt="isha logo"
          />
        </div>
      </Link>
      {/* {variant !== "no-menu" && (
        <div className="flex self-center">
          <Image
            className="mr-4"
            width={20}
            height={20}
            src={Search}
            alt="search icon"
          />
          <Image width={20} height={20} src={Menu} alt="menu icon" />
        </div>
      )} */}
    </div>
  );
}
