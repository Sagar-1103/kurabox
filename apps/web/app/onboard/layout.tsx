import React from "react";

interface OnBoardLayoutProps {
  children: React.ReactNode;
}

export default function OnBoardLayout({ children }: OnBoardLayoutProps) {
  return (
    <div className="w-[100%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] max-w-md mx-auto min-h-screen flex items-center justify-center px-4">
      {children}
    </div>
  );
}
