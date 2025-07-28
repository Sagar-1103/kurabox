"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Settings,
  Shield,
  ChevronRight,
  Code2,
} from "lucide-react";
import { toast } from "sonner";
import { saveMode } from "utils/storage";

const settingsItems = [
  {
    title: "Security & Privacy",
    icon: <Shield className="w-4 h-4 text-pink-400" />,
    toggle: false,
  },
  {
    title: "Testnet Mode",
    icon: <Code2 className="w-4 h-4 text-green-400" />,
    toggle: true,
  },
];

interface SettingsDialogProps {
  children: React.ReactNode;
  mode:"mainnet"|"testnet";
  setMode:(newMode:"mainnet"|"testnet")=>void;
}

export default function SettingsDialog({ children,mode,setMode }: SettingsDialogProps) {
  const toggleMode = async() => {
    if(mode==="mainnet") {
      setMode("testnet");
      await saveMode("testnet");
      toast.success("Switched to Testnet",{
        description:"You are now on the development network."
      });
    } else {
      setMode("mainnet");
      await saveMode("mainnet");
      toast.success("Switched to Mainnet",{
        description:"You are now on the main network."
      });
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="bg-[#0a0e14] text-white sm:max-w-md rounded-xl border border-gray-700 px-6 py-5">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold flex items-center gap-2">
            <Settings className="w-5 h-5 text-white" />
            Settings
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 flex flex-col gap-4">
          {settingsItems.map((item, index) => (
            <div
              key={index}
              onClick={item.toggle?toggleMode:()=>{}}
              className="flex items-center cursor-pointer justify-between bg-[#14191f] border border-gray-700 rounded-lg px-4 py-3 hover:bg-[#1c212a] transition-colors"
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-sm font-medium">{item.title}</span>
              </div>

              {item.toggle ? (
                <p className="text-sm text-gray-400">{mode==="testnet"?"ON":"OFF"}</p>
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
