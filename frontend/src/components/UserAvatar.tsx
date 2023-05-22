import UserAvatarDefault from "@/assets/user-avatar-default.svg";
import Image from "next/image";

export default function UserAvatar({ className }: { className?: string }) {
  return (
    <Image
      className={`w-10 ${className ? className : ""}`}
      src={UserAvatarDefault}
      alt="User avatar"
    />
  );
}
