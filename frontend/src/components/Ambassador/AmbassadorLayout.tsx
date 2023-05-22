import FooterGraphicSm from "@/assets/footer-graphic-sm.svg";
import FooterGraphic from "@/assets/footer-graphic.svg";
import Head from "next/head";
import Image from "next/image";
import { IshaNavbar } from "../IshaNavbar";

type AmbassadorLayoutProps = {
  children: React.ReactNode;
  userName: string;
};

export function AmbassadorLayout({
  children,
  userName,
}: AmbassadorLayoutProps) {
  return (
    <>
      <Head>
        <title>{userName} - IE Ambassador</title>
        <meta name="description" content="Inner Engineering Ambassadors" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex flex-col h-full min-h-screen justify-between bg-beige-300">
        <div className="flex flex-col">
          <IshaNavbar />
          <main className="leading-relaxed max-w-full sm:max-w-4xl self-center overflow-x-hidden">
            {children}
          </main>
        </div>
        <div>
          <div className="w-screen h-24 sm:hidden relative">
            <Image
              className="object-cover"
              src={FooterGraphic}
              fill={true}
              alt="footer graphic"
              priority={true}
            />
          </div>
          <div className="w-screen h-36 hidden sm:block relative">
            <Image
              className="object-cover object-center"
              src={FooterGraphicSm}
              fill={true}
              alt="footer graphic"
              priority={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}
