"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getPassword, getSeedPhrase } from "utils/storage";

export function PathGuard() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    async function checkAccess() {
      const password = await getPassword();

      if (!password) {
        if (!(pathname === "/" || pathname.startsWith("/onboard"))) {
          router.replace("/");
        }
        return;
      }

      const seedPhrase = await getSeedPhrase();

      if (!seedPhrase) {
        if (
          !(
            pathname === "/" ||
            pathname.startsWith("/onboard") ||
            pathname === "/onboard/done"
          )
        ) {
          router.replace("/");
        }
        return;
      }

      if (pathname !== "/wallet") {
        router.replace("/wallet");
      }
    }

    checkAccess();
  }, [pathname]);
  return null;
}
