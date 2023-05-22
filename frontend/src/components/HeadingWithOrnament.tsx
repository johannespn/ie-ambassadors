import Ornament from "@/assets/heading-ornament.svg";
import Image from "next/image";
import React from "react";

interface HeadingProps
  extends React.FC<{ children: React.ReactNode; className?: string }> {}

export const HeadingWithOrnament: HeadingProps = ({ className, children }) => (
  <div className={`${className} sm:flex sm:flex-col sm:items-center`}>
    <h2 className="mb-1">{children}</h2>
    <Image src={Ornament} alt="heading ornament" />
  </div>
);
