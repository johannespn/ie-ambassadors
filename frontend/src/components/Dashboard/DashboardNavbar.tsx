import BackArrow from "@/assets/back-arrow.svg";
import { clearLocalStorage } from "@/utils/user";
import Image from "next/image";
import { useRouter } from "next/router";

export type DashboardNavbarProps = {
  title: string;
  backButton?: boolean;
};

export default function DashboardNavbar({
  title,
  backButton,
}: DashboardNavbarProps) {
  const router = useRouter();

  function handleLogoutClick() {
    clearLocalStorage();
    router.push("/login");
  }
  function handleBackClick() {
    router.back();
  }

  return (
    <div className="px-8 flex w-screen justify-between bg-blue-700 text-white">
      <div>
        {backButton && (
          <div className="mr-8 sm:mr-32 inline-block" onClick={handleBackClick}>
            <Image
              className="mr-3 sm:mr-3 inline-block"
              src={BackArrow}
              alt="back arrow"
            />
            <p className="inline-block">Back</p>
          </div>
        )}
        <p className="my-4 sm:my-6 inline-block">{title}</p>
      </div>
      <div className="flex sm:gap-3 items-center">
        <p
          className="mr-4 underline vertical-align-middle"
          onClick={handleLogoutClick}
        >
          Logout
        </p>
        {/* <UserAvatar className="hidden sm:block" /> */}
      </div>
    </div>
  );
}
