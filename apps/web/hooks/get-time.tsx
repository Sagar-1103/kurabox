import React, { useEffect } from "react";

export function getTime() {
  useEffect(() => {
    const saveTime = () => {
      localStorage.setItem("lastActive", Date.now().toString());
    };

    window.addEventListener("beforeunload", saveTime);
    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") saveTime();
    });

    return () => {
      window.removeEventListener("beforeunload", saveTime);
      window.removeEventListener("visibilitychange", saveTime);
    };
  }, []);

  return;
}
