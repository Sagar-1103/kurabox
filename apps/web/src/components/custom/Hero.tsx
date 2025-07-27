import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Download, Laptop2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="flex justify-items-center items-center align-middle pt-16 flex-col text-center gap-y-7">
      <Badge
        variant={"outline"}
        className="text-[#b8ff4c] rounded-2xl text-sm bg-[#b8ff4c]/10"
      >
        <p className="px-2 py-1">Your keys, your wallet</p>
      </Badge>
      <div>
        <p className="text-5xl sm:text-7xl font-bold">Your Fast,</p>
        <p className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-[#c1f94c] to-[#fcd44c] min-h-24 bg-clip-text text-transparent">
          Secure Crypto Wallet
        </p>
      </div>
      <p className="w-[90%] md:w-[50%] text-md sm:text-lg text-gray-300">
        Store, send and secure your crypto assets effortlessly with Kura.
        Experience strong encryption, fast transactions and easy access to DeFi
        all within a simple and intuitive wallet designed to be your trusted
        digital storehouse.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-y-0 gap-x-6">
        <Button className="bg-[#b8ff4c] p-6 text-lg font text-black cursor-pointer hover:scale-105">
          <Link href={"/onboard"} className="flex gap-x-2">
            <Laptop2 className="my-auto" /> Use Web Wallet
          </Link>
        </Button>
        <Button
          className="hover:bg-[#b8ff4c]/20 p-6 text-lg text-white cursor-pointer hover:scale-105"
          variant={"outline"}
        >
          <p className="flex gap-x-2">
            <Download className="my-auto" />
            Download App
          </p>
        </Button>
      </div>

      <div className="sm:-mt-10 mx-3">
        <Image
          src={"/mac.svg"}
          alt="Laptop Mockup"
          width={300}
          height={300}
          className="max-w-7xl w-full h-auto rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
}
