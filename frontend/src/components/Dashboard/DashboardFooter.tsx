import FacebookLogo from "@/assets/footer-facebook.svg";
import InstagramLogo from "@/assets/footer-instagram.svg";
import TwitterLogo from "@/assets/footer-twitter.svg";
import YouTubeLogo from "@/assets/footer-youtube.svg";
import Image from "next/image";

export interface DashboardFooterProps {
  className: string;
}

export default function DashboardFooter({ className }: DashboardFooterProps) {
  return (
    <div
      className={`${className} px-8 pb-6 pt-10 w-screen flex flex-wrap sm:flex-nowrap gap-8 justify-center sm:justify-between items-center bg-black bg-opacity-80 text-white items-end text-sm`}
    >
      <div className="text-center sm:text-left flex flex-col gap-1">
        <a
          href="https://www.ishayoga.eu/index.php/terms-and-conditions/"
          target={"_blank"}
          rel="noreferrer"
        >
          Terms and Conditions
        </a>
        <a
          href="https://www.ishayoga.eu/index.php/privacy-policy"
          target={"_blank"}
          rel="noreferrer"
        >
          Privacy Policy
        </a>
      </div>
      <p>Copyright (c) 2023 by Isha Foundation</p>
      <div className="flex gap-4 items-baseline">
        <a
          href="https://twitter.com/InnrEngineering"
          target={"_blank"}
          rel="noreferrer"
        >
          <Image src={TwitterLogo} alt="Twitter Logo" />
        </a>
        <a
          href="https://www.facebook.com/IshaEurope"
          target={"_blank"}
          rel="noreferrer"
        >
          <Image src={FacebookLogo} alt="Facebook Logo" />
        </a>
        <a
          href="https://www.instagram.com/inner_engineering"
          target={"_blank"}
          rel="noreferrer"
        >
          <Image src={InstagramLogo} alt="Instagram Logo" />
        </a>
        <a
          href="https://www.youtube.com/channel/UCrlzk1AOX0dB9r5nf1TUsFA"
          target={"_blank"}
          rel="noreferrer"
        >
          <Image src={YouTubeLogo} alt="YouTube Logo" />
        </a>
      </div>
    </div>
  );
}
