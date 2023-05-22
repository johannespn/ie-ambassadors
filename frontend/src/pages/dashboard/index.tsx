import DashboardHomeHeader from "@/assets/dashboard-home-header.svg";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { Loading } from "@/components/LoadingPage";
import { authedFetcher } from "@/utils/api";
import { clearLocalStorage } from "@/utils/user";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function DashboardIndex() {
  const router = useRouter();

  const { error, isLoading } = useSWR(
    "/ambassador/get-microsite",
    authedFetcher
  );

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    router.push("/login");
    clearLocalStorage();
    return <Loading />;
  }

  function handleButtonClick() {
    router.push("/dashboard/sharing");
  }

  return (
    <DashboardLayout title="Dashboard">
      <Head>
        <title>Dashboard - IE Ambassador</title>
        <meta
          name="description"
          content="Inner Engineering Ambassadors Dashboard"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="self-center w-full">
        <div className="relative w-full h-32 sm:h-44 md:h-56 lg:h-64 xl:h-80 2xl:h-96">
          <Image
            src={DashboardHomeHeader}
            alt="Man facing two women laughing"
            fill={true}
            className="object-cover object-top"
            priority={true}
          />
          <h2 className="absolute top-[40%] left-[7%]">Welcome!</h2>
        </div>
        <div className="mx-8 sm:mx-64 mt-12 flex flex-col gap-6">
          <p>
            To get started, please personalise your Inner Engineering Ambassador
            page.
          </p>
          <p>
            You can record your video, add your message and picture. Then go
            ahead invite your friends to the page.
          </p>
          <button className="font-medium max-w-max" onClick={handleButtonClick}>
            Personalise Your Page
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
