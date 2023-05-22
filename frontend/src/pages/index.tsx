import { isLoggedIn } from "@/utils/user";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn()) {
      router.push("/dashboard");
    } else {
      router.push("/register");
    }
  });

  return <div></div>;
}
