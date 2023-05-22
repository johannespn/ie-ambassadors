import Handshake from "@/assets/benefits-handshake.svg";
import Idea from "@/assets/benefits-idea.svg";
import Knot from "@/assets/benefits-knot.svg";
import Lotus from "@/assets/benefits-lotus.svg";
import Scale from "@/assets/benefits-scale.svg";
import Seedling from "@/assets/benefits-seedling.svg";
import SadhguruAvatar from "@/assets/sadhguru-avatar.svg";
import { AmbassadorLayout } from "@/components/Ambassador/AmbassadorLayout";
import { AmbassadorNotFound } from "@/components/Ambassador/AmbassadorNotFound";
import { BlueHeadingContainer } from "@/components/BlueHeadingContainer";
import { HeadingWithOrnament } from "@/components/HeadingWithOrnament";
import { Loading } from "@/components/LoadingPage";
import YouTube from "@/components/YouTube";
import { authedFetcher, fetcher, MicrositeData } from "@/utils/api";
import { isLoggedIn } from "@/utils/user";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";

export default function Ambassador() {
  const router = useRouter();
  const { pagename } = router.query;
  const [isPreview, setIsPreview] = useState(false);
  const [isVerticalVideo, setIsVerticalVideo] = useState(false);
  const videoRef = useRef(null);

  function handleLoadVideo() {
    if (videoRef.current) {
      const { videoHeight, videoWidth } = videoRef.current;
      setIsVerticalVideo(videoHeight / videoWidth > 1);
    }
  }

  const { data, error, isLoading } = useSWR(
    pagename ? "/ambassador/get-microsite-by-name?name=" + pagename : null,
    fetcher
  );

  const [siteData, setSiteData] = useState<MicrositeData>();

  useEffect(() => {
    async function fetchAuthedMicrosite() {
      return await authedFetcher("/ambassador/get-microsite");
    }

    if (data) {
      setSiteData(data);
    }
    if (data?.status === "Offline") {
      if (isLoggedIn()) {
        fetchAuthedMicrosite()
          .then((data) => {
            if (data?.userId) {
              setSiteData(data);
            }
          })
          .catch(() => {
            console.log("Something went wrong");
          });
      }
    }
  }, [data, isLoading, error]);

  if (isLoading || !siteData) {
    return <Loading />;
  }

  if (
    data.status === "Error" ||
    (data.status === "Offline" && !siteData.userId)
  ) {
    return (
      <AmbassadorLayout userName="Not Found">
        <AmbassadorNotFound />
      </AmbassadorLayout>
    );
  }

  return (
    <AmbassadorLayout userName={siteData.userName}>
      {data.status === "Offline" && (
        <div className="h-12 sm:h-16 flex flex-col justify-center bg-red-500 text-center">
          The page status is offline. Only you can preview this page.
        </div>
      )}
      <div className="w-full bg-white">
        {siteData.videoSharing && (
          <div
            className={`relative w-full ${
              isVerticalVideo ? "h-screen" : "h-56 sm:h-[504px]"
            }  max-h-[44rem] bg-beige-900 items-center`}
          >
            <video
              ref={videoRef}
              className="absolute bottom-0 w-full max-w-full max-h-full object-contain bg-black bg-opacity-30 overflow-hidden"
              controls
              onLoadedMetadata={handleLoadVideo}
            >
              <source src={siteData.videoSharing} />
              Your browser does not support HTML5 video.
            </video>
          </div>
        )}

        {siteData.bannerImage ? (
          <div className="w-full relative h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 2xl:h-72">
            <Image
              className="object-cover object-center"
              fill={true}
              src={siteData.bannerImage}
              alt="custom banner image"
              priority={true}
            />
          </div>
        ) : (
          <div className="flex h-32 sm:h-48 bg-blue-900 text-white justify-center items-center">
            Customize your banner image!
          </div>
        )}
        <div className="-mt-8 sm:-mt-12 ml-5 relative sm:text-center">
          <div className="inline-block">
            <div
              className={`${
                siteData.profilePicture ? "" : "bg-orange-900"
              } w-20 h-20 sm:w-36 sm:h-36 relative flex flex-col justify-center rounded-full ring ring-white ring-offset-base-100 ring-offset-2`}
            >
              {siteData.profilePicture ? (
                <Image
                  className="object-fill object-center rounded-full"
                  src={siteData.profilePicture}
                  alt="profile picture"
                  fill={true}
                />
              ) : (
                <p className="text-center text-white text-xs sm:text-base">
                  Customize
                  <br />
                  your picture!
                </p>
              )}
            </div>
          </div>
          <br className="hidden sm:block" />
          <div className="sm:hidden self-center relative top-6 left-8 inline-block text-blue-900 tracking-widest">
            <p className="font-semibold font-arial">{siteData.userName}</p>
            <p>{siteData.profession || "Profession"}</p>
            <p>{siteData.country || "Country"}</p>
          </div>
          <div className="hidden sm:block ml-5 relative top-2 inline-block text-blue-900 tracking-widest">
            <p className="inline font-semibold font-arial">
              {siteData.userName}
            </p>
            <p className="inline">
              , {siteData.profession || "Profession"},{" "}
              {siteData.country || "Country"}
            </p>
          </div>
        </div>
        <div className="px-5 py-5 leading-loose">
          <p className="text-xl leading-loose font-semibold">Hi!</p>
          <p className="text-justify">
            {siteData.aboutMe || "Custom About me"}
          </p>
        </div>
        <div className="mb-8 p-5 bg-beige-500">
          <p className="font-semibold">My experience of Inner Engineering</p>
          <p className="text-justify">
            {siteData.shareExperience || "Custom Sharing"}
          </p>
        </div>
        <HeadingWithOrnament className="mb-6 ml-5">
          About <br className="sm:hidden" />
          Inner Engineering
        </HeadingWithOrnament>
        <div className="mb-3 p-5 bg-beige-900 items-center text-center flex flex-col">
          <Image
            className="mb-3 w-24"
            src={SadhguruAvatar}
            alt="Sadhguru Avatar"
          />
          <p className="italic">
            “As there is a science and technology to create external well-being,
            there is a whole dimension of science and technology for inner
            well-being.”
          </p>
          <p className="font-semibold">Sadhguru</p>
        </div>
        <div className="mb-3 p-5">
          <p className="text-justify">
            <strong>Inner Engineering</strong> is offered as a comprehensive
            course for personal growth that brings about a shift in the way you
            perceive and experience your life, your work, and the world that you
            live in.
            <br />
            <br />
            The objective of the program is to allow you to explore your highest
            potential through powerful processes of self transformation,
            classical yoga, meditations to address key aspects of life and
            secrets of ancient wisdom. Inner Engineering offers a unique
            opportunity for self-exploration and transformation, leading to a
            life of fulfillment and joy.
          </p>
        </div>
        <HeadingWithOrnament className="mb-5 ml-5">
          <span className="ml-2 sm:ml-0">Benefits</span>
        </HeadingWithOrnament>
        <Benefits />
        <div className="mb-5 p-5">
          <button
            className="w-full"
            onClick={() => {
              window.open("https://innerengineering.sadhguru.org");
            }}
          >
            Start Your IE Journey
          </button>
        </div>
        <YouTube videoId="L9-WwLCy8XY" />
        <BlueHeadingContainer className="mb-5">
          Transform your Life with
          <br />
          Sadhguru
          <br />
          Yogi, Mystic & Visionary
        </BlueHeadingContainer>
        <HeadingWithOrnament className="mb-5 ml-5">
          About Sadhguru
        </HeadingWithOrnament>
        <ul className="mx-5 pb-8">
          <li>New York Times Bestselling Author</li>
          <li>Named amongst the 50 most influential people in India</li>
          <li>
            Recipient of presidential awards for exceptional service,
            environmental & social initiatives
          </li>
        </ul>
      </div>
    </AmbassadorLayout>
  );
}

function Benefits() {
  return (
    <div className="m-5 grid grid-cols-[1fr_4fr] sm:grid-cols-[1fr_4fr_1fr_4fr] gap-5 items-center">
      <div className="w-16 h-16 relative justify-self-center">
        <Image fill={true} src={Idea} alt="benefit icon" />
      </div>
      <p>Maintain high energy & alertness throughout the day</p>
      <div className="w-16 h-16 relative justify-self-center ">
        <Image fill={true} src={Handshake} alt="benefit icon" />
      </div>
      <p>Improve communication & interpersonal relationships</p>
      <div className="w-16 h-16 relative justify-self-center">
        <Image fill={true} src={Scale} alt="benefit icon" />
      </div>
      <p>Enhance mental clarity, emotional balance & productivity</p>
      <div className="w-28 h-16 relative justify-self-center ml-3 ">
        <Image fill={true} src={Knot} alt="benefit icon" />
      </div>
      <p>Eliminate stress, fear and anxiety</p>
      <div className="w-16 h-16 relative justify-self-center">
        <Image fill={true} src={Seedling} alt="benefit icon" />
      </div>
      <p>Stress-free life that can alleviate chronic ailments</p>
      <div className="w-20 h-20 relative justify-self-center ">
        <Image fill={true} src={Lotus} alt="benefit icon" />
      </div>
      <p>Achieve joy, tranquility and fulfillment</p>
    </div>
  );
}
