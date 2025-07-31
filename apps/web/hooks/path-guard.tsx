"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getPassword, isSeedStored } from "utils/storage";

export function PathGuard() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const lastClosedAt = localStorage.getItem("lastActive");
    const timer = parseInt(localStorage.getItem("timer") ?? "15");
    if (lastClosedAt) {
      const lastTime = parseInt(lastClosedAt, 10);
      const now = Date.now();
      const diffInMinutes = (now - lastTime) / 60000;
      if (diffInMinutes > timer) {
        localStorage.setItem("locked", "true");
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    async function checkAccess() {
      const locked = localStorage.getItem("locked");
      const isPassword = localStorage.getItem("isPassword");
      const isSeed = localStorage.getItem("isSeed");


      if (locked === "true") {
        if (pathname !== "/password") {
          router.replace("/password");
        }
        return;
      }

      // const password = await getPassword();
      // const seedPhrase = await isSeedStored();

      if (isSeed && isPassword) {
        if (pathname !== "/wallet") {
          router.replace("/wallet");
        }
        return;
      }

      if (!isSeed) {
        const allowedPaths = ["/", "/onboard", "/onboard/done"];
        if (!allowedPaths.includes(pathname)) {
          router.replace("/");
        }
        return;
      }
    }

    checkAccess();
  }, [pathname, router]);

  return null;
}
