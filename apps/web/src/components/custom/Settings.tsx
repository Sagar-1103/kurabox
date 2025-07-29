"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Settings,
  ChevronRight,
  Code2,
  KeyRound,
  Lock,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import { saveMode } from "utils/storage";
import ResetPin from "./reset-pin";
import SecretPhrase from "./secret-phrase";

const settingsItems = [
  {
    title: "Reset Pin",
    icon: <KeyRound className="w-4 h-4 text-yellow-400" />,
    reset: true,
  },
  {
    title: "Auto Lock Timer",
    icon: <Lock className="w-4 h-4 text-blue-400" />,
    timer: true,
  },
  {
    title: "Show Seed Phrase",
    icon: <Eye className="w-4 h-4 text-fuchsia-400" />,
    show: true,
  },
  {
    title: "Testnet Mode",
    icon: <Code2 className="w-4 h-4 text-green-400" />,
    toggle: true,
  },
];

interface SettingsDialogProps {
  children: React.ReactNode;
  mode: "mainnet" | "testnet";
  setMode: (newMode: "mainnet" | "testnet") => void;
}

const timerOptions = [5, 10, 15, 30];

export default function SettingsDialog({
  children,
  mode,
  setMode,
}: SettingsDialogProps) {
  const toggleMode = async () => {
    if (mode === "mainnet") {
      await saveMode("testnet");
      setMode("testnet");
      toast.success("Switched to Testnet", {
        description: "You are now on the development network.",
      });
    } else {
      await saveMode("mainnet");
      setMode("mainnet");
      toast.success("Switched to Mainnet", {
        description: "You are now on the main network.",
      });
    }
  };

  const changeTimer = () => {
    setTimerIndex((prevIndex) => (prevIndex + 1) % timerOptions.length);
  };

  const [timerIndex, setTimerIndex] = useState<number>(2);
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
          {settingsItems.map((item, index) => {
            if (item.reset) {
              return (
                <ResetPin key={index}>
                  <div
                    onClick={
                      item.toggle
                        ? toggleMode
                        : item.timer
                          ? changeTimer
                          : () => {}
                    }
                    className="flex items-center select-none cursor-pointer justify-between bg-[#14191f] border border-gray-700 rounded-lg px-4 py-3 hover:bg-[#1c212a] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>

                    {item.toggle ? (
                      <p className="text-sm text-gray-400">
                        {mode === "testnet" ? "ON" : "OFF"}
                      </p>
                    ) : item.timer ? (
                      <p onClick={() => {}} className="text-sm text-gray-400">
                        {timerOptions[timerIndex]} minutes
                      </p>
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </ResetPin>
              );
            } else if (item.show) {
              return (
                <SecretPhrase key={index}>
                  <div
                    onClick={
                      item.toggle
                        ? toggleMode
                        : item.timer
                          ? changeTimer
                          : () => {}
                    }
                    className="flex items-center select-none cursor-pointer justify-between bg-[#14191f] border border-gray-700 rounded-lg px-4 py-3 hover:bg-[#1c212a] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>

                    {item.toggle ? (
                      <p className="text-sm text-gray-400">
                        {mode === "testnet" ? "ON" : "OFF"}
                      </p>
                    ) : item.timer ? (
                      <p onClick={() => {}} className="text-sm text-gray-400">
                        {timerOptions[timerIndex]} minutes
                      </p>
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </SecretPhrase>
              );
            } else {
              return (
                <div
                  key={index}
                  onClick={
                    item.toggle
                      ? toggleMode
                      : item.timer
                        ? changeTimer
                        : () => {}
                  }
                  className="flex items-center select-none cursor-pointer justify-between bg-[#14191f] border border-gray-700 rounded-lg px-4 py-3 hover:bg-[#1c212a] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-sm font-medium">{item.title}</span>
                  </div>

                  {item.toggle ? (
                    <p className="text-sm text-gray-400">
                      {mode === "testnet" ? "ON" : "OFF"}
                    </p>
                  ) : item.timer ? (
                    <p onClick={() => {}} className="text-sm text-gray-400">
                      {timerOptions[timerIndex]} minutes
                    </p>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              );
            }
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
