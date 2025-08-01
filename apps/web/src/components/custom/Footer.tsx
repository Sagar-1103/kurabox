import React from "react";
// import Link from "next/link";
// import { Download, PlayCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full backdrop-blur-md border-t border-gray-700 py-3">
      <div className="flex flex-col items-center space-y-3">
        <p className="text-gray-400 text-sm tracking-wide">
          © <span className="text-white font-semibold">Kurabox</span>
        </p>
        <div className="flex space-x-6">
          {/* <Link href="/install" className="flex items-center gap-2 text-sm text-blue-400 hover:text-[#c1f94c] transition">
            <Download size={16} />
            <span>Install the App</span>
          </Link>
          <Link href="/demo" className="flex items-center gap-2 text-sm text-blue-400 hover:text-[#c1f94c] transition">
            <PlayCircle size={16} />
            <span>Watch Demo</span>
          </Link> */}
        </div>
      </div>
    </footer>
  );
}
