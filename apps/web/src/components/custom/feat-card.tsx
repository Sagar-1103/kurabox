import { LucideIcon } from "lucide-react";
import React from "react";

interface featCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatCard({ icon, title, description }: featCardProps) {
  const Icon = icon;

  return (
    <div className="group transition-all duration-300 hover:shadow-xl hover:bg-[#b8ff4c]/10 cursor-pointer bg-white/5 border border-[#b8ff4c]/20 rounded-2xl p-5 w-full text-left space-y-3 flex flex-col justify-between backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#b8ff4c]/10 p-2 rounded-lg text-[#b8ff4c]">
            <Icon className="h-5 w-5" />
          </div>
          <p className="text-[#fcd44c] font-semibold">{title}</p>
        </div>
      </div>
      <p className="text-[15px] text-gray-300 leading-snug">{description}</p>
    </div>
  );
}
