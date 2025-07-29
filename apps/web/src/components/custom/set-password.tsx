"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Key } from "lucide-react";
import { Button } from "../ui/button";
import { ActionTypes } from "app/onboard/page";
import { toast } from "sonner";
import { savePassword } from "utils/storage";

interface SetPasswordProps {
  setAction: (action: ActionTypes) => void;
}

export default function SetPassword({ setAction }: SetPasswordProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Key className="text-[#b8ff4c]" />
          <h2 className="text-2xl font-semibold text-white">
            Create a password
          </h2>
        </div>
        <p className="text-sm md:text-md text-gray-300">
          Please enter a 6 character password, you will use this to unlock your
          wallet.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <Input
          className={`focus-visible:ring-0 py-3 ${password === "" ? "" : "md:text-2xl"} border-[#3c3838] text-center bg-[#2e3339]`}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          className={`focus-visible:ring-0 py-3 ${confirmPassword === "" ? "" : "md:text-2xl"} border-[#3c3838] text-center ${
            !confirmPassword || !password
              ? ""
              : password === confirmPassword
                ? "text-green-500"
                : "text-red-500"
          } bg-[#2e3339]`}
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <Button
        disabled={password.length < 6 || password !== confirmPassword}
        onClick={async() => {
          await savePassword(password);
          setAction("new");
          toast.success("Password has been set successfully", {
            description: "Your password is now active for your wallet.",
          });
        }}
        className="w-full bg-gradient-to-r from-[#c1f94c] to-[#fcd44c] font-medium text-md text-black py-3"
      >
        <p>Continue</p>
      </Button>
    </div>
  );
}
